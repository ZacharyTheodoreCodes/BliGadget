## Endpoints

List of Admin Endpoints:

- `POST /admin/gadgets`
- `POST /admin/stores`

List of Customer Endpoints:

- `POST /cust/register`
- `POST /cust/login`
- `GET /cust/gadgets`
- `GET /cust/stores`
- `GET /cust/gadgets/:gadgetId`
- `GET /cust/customers`
- `POST /cust/transactions/:gadgetId`
- `POST /cust/payments`
- `PATCH /cust/transactions/:transactionsId`
- `GET /cust/transactions/:status`
- `POST /cust/reviews/:transactionId`

## Admin Endpoints

### POST /admin/gadgets

#### Description

- Add new gadget

#### Request

- Body
  ```json
  {
    "name": string,
    "imgUrl": string,
    "price": integer,
    "description": string,
    "specification": text,
    "type": string
  }
  ```

#### Response

_201 - Created_

- Body
  ```json
  {
    "name": string,
    "imgUrl": string,
    "price": integer,
    "description": string,
    "specification": text,
    "type": string,
    "updatedAt": date,
    "createdAt": date
  }
  ```
  _400 - Bad Request_
- Body

  ```json
  {
    "message": string

  }
  ```

### POST /employees/dealers

#### Description

- Add a new dealer

#### Request

- Body
  ```json
  {
    "id": integer,
    "name": string,
    "address": string,
    "city": string,
    "phoneNumber": integer,
    "latitude": double,
    "longitude": double
  }
  ```

#### Response

_201 - Created_

- Body
  ```json
  {
    "id": integer,
    "name": string,
    "address": string,
    "city": string,
    "phoneNumber": integer,
    "latitude": double,
    "longitude": double,
    "updatedAt": date,
    "createdAt": date
  }
  ```
  _400 - Bad Request_
- Body

  ```json
  {
    "message": string

  }
  ```

## Customer Endpoints

### POST /cust/register

#### Description

- Create new account for customer

#### Request

- Body
  ```json
  {
    "name": string,
    "email": string,
    "password": string,
    "phoneNumber": string
  }
  ```

#### Response

_201 - Created_

- Body
  ```json
  {
    "id": integer,
    "email": string
  }
  ```

_400 - Bad Request_

- Body

  ```json
  {
    "message": string
  }

  ```

### POST /cust/login

#### Description

- Login for customer

#### Request

- Body
  ```json
  {
    "email": String,
    "password": String
  }
  ```

#### Response

_200 - OK_

- Body
  `json
{
  "access_token": String
}
`
  _400 - Bad Request_
- Body

  ```json
  {
    "message": string
  }

  ```

### GET /cust/gadgets

#### Description

- Get all gadgets data

#### Request

- Query

  ```json
  {
    "name": String
  }

  ```

#### Response

_200 - OK_

- Body
  ```json
  [
    {
        "id": integer,
        "name": string,
        "imgUrl": string,
        "price": integer,
        "description": string,
        "specification": text,
        "type": string,
        "updatedAt": date,
        "createdAt": date
    },
    ...
  ]
  ```

### GET /cust/stores

#### Description

- Get all stores data

#### Response

_200 - OK_

- Body
  ```json
  [
    {
      "id": integer,
      "name": string,
      "address": string,
      "city": string,
      "phoneNumber": integer,
      "latitude": double,
      "longitude": double,
      "createdAt": date,
      "updatedAt": date
    },
    ...
  ]
  ```

### GET /cust/gadgets/:gadgetId

#### Description

- Get gadget data and review by id

#### Response

_200 - OK_

- Body
  ```json
  {
      "id": integer,
      "name": string,
      "imgUrl": string,
      "price": integer,
      "description": string,
      "specification": text,
      "type": string,
      "updatedAt": date,
      "createdAt": date,
      "Reviews": [
          {
          "id": integer,
          "CustomerId": integer,
          "GadgetId": integer,
          "comment": string,
          "updatedAt": date,
          "createdAt": date,
          "TransactionId": integer,
          "Customer": {
              "id": integer,
              "name": string,
          }
          },
      ...
    ]
  }
  ```

_404 - Not Found_

- Body
  ```json
  {
    "message": "Error not found"
  }
  ```

### GET /cust/customers

#### Description

- Get customers data

#### Request

- Headers
  ```json
  {
    "access_token": String
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    "id": integer,
    "name": string,
    "email": string,
    "password": string,
    "phoneNumber": string
  }
  ```

### GET /cust/transactions/:status

#### Description

- Get transaction data for authenticated user based on status

#### Request

- Headers
  ```json
  {
    "access_token": String
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  [
    {
        "id": integer,
        "CustomerId": integer,
        "GadgetId": integer,
        "status": "Pending",
        "updatedAt": date,
        "createdAt": date,
        "Car": {
            "id": integer,
            "name": string,
            "imgUrl": string,
            "price": integer,
            "description": string,
            "specification": text,
            "type": string,
            "updatedAt": date,
            "createdAt": date,
        },
        "Review": null,
        "User": {
            "name": string,
        }
    },
    ...
  ]
  ```

### POST /cust/transactions/:gadgetId

#### Description

- Add new transaction for authenticated user

#### Request

- Headers
  ```json
  {
    "access_token": String
  }
  ```

#### Response

_201 - Created_

- Body
  ```json
  {
    "id": integer,
    "CustomerId": integer,
    "GadgetId": integer,
    "status": "Pending",
    "updatedAt": date,
    "createdAt": date
  }
  ```

_404 - Not Found_

- Body
  ```json
  {
    "message": "Error not found"
  }
  ```

### POST /cust/reviews/:transactionId

#### Description

- Add new review for purchased gadget by authenticated user

#### Request

- Headers
  ```json
  {
    "access_token": String
  }
  ```
- Body
  ```json
  {
    "comment": string
  }
  ```

#### Response

_201 - Created_

- Body
  ```json
  {
    "id": integer,
    "CustomerId": integer,
    "GadgetId": integer,
    "comment": string,
    "TransactionId": integer,
    "updatedAt": date,
    "createdAt": date,
    }
  ```

_400 - Bad Request_

- Body

  ```json
  {
    "message": string
  }
  ```

  _403 - Forbidden_

- Body
  ```json
  {
    "message": "Forbidden"
  }
  ```

_404 - Not Found_

- Body
  ```json
  {
    "message": `Error not found`
  }
  ```

### PATCH /cust/transactions/:transactionId

#### Description

- Update transaction status

#### Request

- Headers
  ```json
  {
    "access_token": String
  }
  ```
- Body
  ```json
  {
    "status": string
  }
  ```

#### Response

_201 - Created_

- Body
  ```json
  {
    "message": string
  }
  ```

_400 - Bad Request_

- Body
  ```json
  {
    "message": string
  }
  ```

_403 - Forbidden_

- Body
  ```json
  {
    "message": "Forbidden"
  }
  ```

### POST /customers/payments

#### Description

- Get snapToken for payment requirement

#### Request

- Headers
  ```json
  {
    "access_token": String
  }
  ```
- Body
  ```json
  {
    "name": String,
    "email": String,
    "phoneNumber": String
  }
  ```

#### Response

_200 - OK_

- Body
  ```json
  {
    "snapToken": String
  }
  ```

### Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
