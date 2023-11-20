import { defineStore } from 'pinia'
import axios from 'axios'
const baseUrl = `http://localhost:3000/cust`
import Swal from 'sweetalert2'

export const useGlobalStore = defineStore('global', {
  state: () => ({
    isLoggedIn: false,
    gadgets: [],
    gadget: {},
    videoUrl: '',
    paidTransaction: [],
    allTransaction: [],
    transactionDetail: {},
    profileContent: 'my-order',
    customer: {},
    stores: [],
    filter: ''
  }),
  getters: {},
  actions: {
    async loginHandler(login) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: `${baseUrl}/login`,
          data: {
            email: login.email,
            password: login.password
          }
        })
        localStorage.setItem('access_token', data.access_token)
        this.isLoggedIn = true
        this.fetchCustomerData()
        this.router.push('/')
        this.showNotification('logged in', 'success')
      } catch (error) {
        console.log(error)
        this.showNotification(error.response.data.message, 'error')
      }
    },
    async registerHandler(data) {
      try {
        await axios({
          method: 'POST',
          url: `${baseUrl}/register`,
          data: data
        })
        this.router.push('/login')
        this.showNotification('Register success', 'success')
      } catch (error) {
        console.log(error.response.data.message)
        this.showNotification(error.response.data.message, 'error')
      }
    },
    async fetchGadgets() {
      try {
        let query = ''
        if (this.filter) {
          query += `name=${this.filter}`
        }
        const { data } = await axios({
          method: 'GET',
          url: `${baseUrl}/gadgets?${query}`
        })
        this.gadgets = data
      } catch (error) {
        console.log(error.response.data.message)
        this.showNotification(error.response.data.message, 'error')
      }
    },
    updateFilter(name) {
      this.filter = name
    },
    async fetchGadgetDetail(id) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `${baseUrl}/gadgets/${id}`
        })
        this.gadget = data
      } catch (error) {
        console.log(error.response.data.message)
        this.showNotification(error.response.data.message, 'error')
      }
    },
    async fetchYoutubeVideos(gadgetName) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${gadgetName}&key=AIzaSyCynUP1mz_c237kgAT_R-G0jyNbbnuxehc`
        })
        console.log(data)
        this.videoUrl = `https://www.youtube.com/embed/${data.items[0].id.videoId}`
      } catch (error) {
        console.log(error)
      }
    },
    async fetchTransaction(status) {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `${baseUrl}/transactions/${status}`,
          headers: {
            access_token: localStorage.access_token
          }
        })
        if (status === 'Paid') {
          return (this.paidTransaction = data)
        }
        this.allTransaction = data
      } catch (error) {
        console.log(error.response.data.message)
        this.showNotification(error.response.data.message, 'error')
      }
    },
    async getTransactionDetail(id) {
      await this.fetchTransaction('Paid')
      this.transactionDetail = this.paidTransaction.find((el) => el.id === id)
    },
    async orderGadget(id) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: `${baseUrl}/transactions/${id}`,
          headers: {
            access_token: localStorage.access_token
          }
        })
        const transactionId = data.id
        return transactionId
      } catch (error) {
        this.showNotification(error.response.data.message, 'error')
      }
    },
    async fetchCustomerData() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `${baseUrl}/customers`,
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.customer = data
      } catch (error) {
        this.showNotification(error.response.data.message, 'error')
      }
    },
    async paymentHandler(id, price, status) {
      try {
        let transactionId = id
        if (status === 'new') {
          transactionId = await this.orderGadget(id)
        }
        if (!transactionId) {
          throw 'unauthorized'
        }
        const fetchTransaction = this.fetchTransaction
        const notification = this.showNotification
        const redirect = this.router.push
        const { data } = await axios({
          method: 'POST',
          url: `${baseUrl}/payments`,
          data: this.customer,
          headers: {
            access_token: localStorage.access_token,
            price
          }
        })
        window.snap.pay(data.snapToken, {
          onSuccess: function (result) {
            axios({
              method: 'PATCH',
              url: `${baseUrl}/transactions/${transactionId}`,
              headers: {
                access_token: localStorage.access_token
              },
              data: {
                status: 'Paid'
              }
            })
              .then((_) => {
                redirect('/profile')
                fetchTransaction('All')
                notification('Transaction success!', 'success')
              })
              .catch((err) => {
                notification(err.response.data.message, 'error')
              })
          },
          onPending: function (result) {
            notification('Wating for your payment', 'question')
          },
          onError: function (result) {
            notification('Payment unsuccessful', 'error')
          },
          onClose: function () {
            notification('Pop-up closed without finishing the payment', 'error')
          }
        })
      } catch (error) {
        if (error === 'unauthorized') {
          this.showNotification('Unauthorized', 'error')
          return this.router.push('/login')
        }
        console.log(error.response.data.message)
        this.showNotification(error.response.data.message, 'error')
      }
    },
    async cancelTransaction(id) {
      Swal.fire({
        title: 'Are you sure to cancel this transaction?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
          axios({
            method: 'PATCH',
            url: `${baseUrl}/transactions/${id}`,
            headers: {
              access_token: localStorage.access_token
            },
            data: {
              status: 'Cancel'
            }
          })
            .then((_) => {
              this.showNotification('Order cancelled', 'success')
              this.fetchTransaction('All')
            })
            .catch((error) => {
              this.showNotification(error.response.data.message, 'error')
            })
        }
      })
    },
    async fetchStores() {
      try {
        const { data } = await axios({
          method: 'GET',
          url: `${baseUrl}/stores`
        })
        this.stores = data
      } catch (error) {
        this.showNotification(error.response.data.message, 'error')
      }
    },
    async sendReview(id, comment) {
      try {
        await axios({
          method: 'POST',
          url: `${baseUrl}/reviews/${id}`,
          data: {
            comment
          },
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.router.push('/profile')
      } catch (error) {
        this.showNotification(error.response.data.message, 'error')
      }
    },
    showNotification(message, type) {
      Swal.fire({
        position: 'top-end',
        toast: true,
        icon: type,
        title: message,
        showConfirmButton: false,
        timer: 1500
      })
    },
    logoutHandler() {
      localStorage.removeItem('access_token')
      this.isLoggedIn = false
      this.showNotification('Log out successful', 'success')
      this.router.push('/login')
    },
    formattedPrice(price) {
      const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      }); 
      return formatter.format(price);
    }
  }
})
