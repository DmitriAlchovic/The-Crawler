# Grocery Store API #

This API allows you to order grocery.

## Endpoints ##

### Get categories ###

GET `/api/categories`

Returns the list of categories.

###  Get list of new products ###

GET `/api/products/new`

Returns a list of new products.


### Get products form category ###

GET `/api/categories/:categoryName`

Returns a list of products in category.

### Get products with discount ###

GET `/api/products/discount`

Returns a list of products with discount.

### Get products with hot deal ###

GET `/api/products/discount/hot_deal`

Returns a list of products that is hot deal.

### Get a single product ###

GET `/api/products/:productId`

Retrieve detailed information about a product.

The request body needs to be in JSON format and include the following properties:

 - `productId` - String - Required

Example
```

{
  "productId": "1"
}
```

### Get a user ###

GET `/api/auth/userInfo`

Retrieve information about a user. Requires authentication.

### Submit an order ###

POST `/api/cart/order`

Allows you to submit a new order. Requires authentication.

The request body needs to be in JSON format and include the following properties:

 - `productId` - String - Required
 - `userEmail` - String - Required

Example
```
POST /api/cart/order
Authorization: Bearer <YOUR TOKEN>

{
  "productId": 1,
  "userName": "JohnDoe@example.com"
}
```

The response body will contain the order Id.

### Get cart ###

GET `/api/cart/`

Allows you to view all orders. Requires authentication.

### Add to cart ###

PATCH `/api/cart/add/:productId`

Update an existing order. Requires authentication.

The request body needs to be in JSON format and allows you to update the following properties:

 - `userEmail` - String

 Example
```
PATCH api/cart/PF6MflPDcuhWobZcgmJy5
Authorization: Bearer <YOUR TOKEN>

{
  "userEmail": "JohnDoe@example.com"
}
```
### Change product capacity  in cart ###

PATCH `/api/cart/capacity/:productId`

Update an existing order. Requires authentication.

The request body needs to be in JSON format and allows you to update the following properties:

 - `userEmail` - String
 - `capacity` - Number

 Example
```
PATCH /api/cart/PF6MflPDcuhWobZcgmJy5
Authorization: Bearer <YOUR TOKEN>

{
  "userEmail": "JohnDoe@example.com"
  "product":{
	  "chapacity":42
  }
}
```

### Delete from cart ###

DELETE `/api/cart/remove/:productId`

Delete an existing product from cart. Requires authentication.

The request body needs to be empty.

 Example
```
DELETE /api/cart/PF6MflPDcuhWobZcgmJy5
Authorization: Bearer <YOUR TOKEN>
```


## API Registration ##

To add to cart or view an order, you need to register your API client.

POST `/api/auth/register/`

The request body needs to be in JSON format and include the following properties:

 - `email` - String - Required
 - `password` - String - Required
 - `fullName` - String - Required
 - `phone` - String - Required

 Example

 ```
 {
    "email": "JohnDoe@example.com",
    "password": "42",
    "fullName": "John Doe",
    "phone": "4242-4242"
}
 ```

The response body will contain the access token.

**Possible errors**

Status code 409 - "API client already registered." Try changing the values for `email` and `phone` to something else.

## API Authentication ##

To submit or view an order, you need to authenticate in API client.

POST `/api/auth/login`

The request body needs to be in JSON format and include the following properties:

 - `email` - String
 - `password` - String

 Example

 ```
 {
    "email": "JohnDoe@example.com",
    "password": "42"
}
 ```

The response body will contain the access token.

**Possible errors**

Status code 400 - "Wrong email or password" Try again.
