a
# Devcamer

In here we are focusing on fully implemented Node.js API for Devcamper

## Indices

* [Auth](#auth)

  * [Forgot password](#1-forgot-password)
  * [Get logged in user](#2-get-logged-in-user)
  * [Update user Password](#3-update-user-password)
  * [Update user details](#4-update-user-details)
  * [User login](#5-user-login)
  * [User regitration](#6-user-regitration)

* [Bootcamp](#bootcamp)

  * [Create new Bootcamp](#1-create-new-bootcamp)
  * [Delete bootcamp](#2-delete-bootcamp)
  * [Get all bootcamps](#3-get-all-bootcamps)
  * [Get all bootcamps within a radius](#4-get-all-bootcamps-within-a-radius)
  * [Get single Bootcamp](#5-get-single-bootcamp)
  * [Update bootcamp](#6-update-bootcamp)
  * [Upload Bootcamp image](#7-upload-bootcamp-image)

* [Courses](#courses)

  * [Get all Courses](#1-get-all-courses)
  * [Get all Courses with bootcampId](#2-get-all-courses-with-bootcampid)
  * [Get single Course](#3-get-single-course)

* [Reviews](#reviews)

  * [Add review for a bootcamp](#1-add-review-for-a-bootcamp)
  * [Get all reviews](#2-get-all-reviews)
  * [Get all reviews with bootcamp id](#3-get-all-reviews-with-bootcamp-id)
  * [Get single review](#4-get-single-review)

* [Users](#users)

  * [Get all user By Id](#1-get-all-user-by-id)
  * [Get all users](#2-get-all-users)


--------


## Auth
Authentication process



### 1. Forgot password


When forget password , then send an email to th client


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/auth/forgotpassword
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{
	"email": "en95108@gmail.com"
}
```



### 2. Get logged in user


Get logged in user with the token


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/auth/me
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



### 3. Update user Password



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/auth/updatepassword
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{
    "oldPassword": "1234567" ,
    "newPassword": "123456"
}
```



### 4. Update user details



***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/auth/updatedetails
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{
    "name": "Dev Marlon" ,
    "email": "marlon@gmail.com"
}
```



### 5. User login


User login with email and password and send JWT


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/auth/login
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{
    "email": "user@gmail.com" ,
    "password": "123456"
}
```



### 6. User regitration


User regitration and send JWT


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/auth/register
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{
    "name": "User Account",
		"email": "user@gmail.com",
		"role": "user",
		"password": "123456"
}
```



## Bootcamp
CRUD process of bootcamps



### 1. Create new Bootcamp


Create new Bootcamp


***Endpoint:***

```bash
Method: POST
Type: 
URL: {{URL}}/api/v1/bootcamps
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



### 2. Delete bootcamp


Delete bootcamp with its id


***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{URL}}/api/v1/bootcamps/10
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



### 3. Get all bootcamps


Get all bootcamps


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/bootcamps
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



### 4. Get all bootcamps within a radius


Get bootcamps within a radius by giving the radius and zipcode


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/bootcamps/radius/02118/30
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



### 5. Get single Bootcamp


Get single Bootcamp with its id


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/bootcamps/60290a9c3282a1b0ca437b5a
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



### 6. Update bootcamp


Update bootcamp with its id


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{URL}}/api/v1/bootcamps/5d725a1b7b292f5f8ceff788
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |
| Authorization | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMmMwMzUzMTZmMDc0NzZkOTJlMjg5ZSIsImlhdCI6MTYxMzUwMTE2NywiZXhwIjoxNjE2MDkzMTY3fQ.TlWxE4Scg_AoFPpjs9JxBt91dSRflxA5PoPeIc5FYQA |  |



***Body:***

```js        
{
    "phone": "(444) 444-1234"
}
```



### 7. Upload Bootcamp image



***Endpoint:***

```bash
Method: PUT
Type: FORMDATA
URL: {{URL}}/api/v1/bootcamps/5d725a1b7b292f5f8ceff788/image
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

| Key | Value | Description |
| --- | ------|-------------|
| file |  |  |



## Courses
CRUD operations of Courses



### 1. Get all Courses


Get all courses


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/courses
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



### 2. Get all Courses with bootcampId


Get all courses related to specific bootcamp


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/bootcamps/5d725a1b7b292f5f8ceff788/courses
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



### 3. Get single Course


Get single course with its id


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/courses/5d725cd2c4ded7bcb480eaa2
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



## Reviews
Review operations



### 1. Add review for a bootcamp



***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{URL}}/api/v1/bootcamps/5d725a1b7b292f5f8ceff788/reviews
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



***Body:***

```js        
{
    "title": "Learned a ton what the hell!",
		"text": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec viverra feugiat mauris id viverra. Duis luctus ex sed facilisis ultrices. Curabitur scelerisque bibendum ligula, quis condimentum libero fermentum in. Aenean erat erat, aliquam in purus a, rhoncus hendrerit tellus. Donec accumsan justo in felis consequat sollicitudin. Fusce luctus mattis nunc vitae maximus. Curabitur semper felis eu magna laoreet scelerisque",
		"rating": "8"
}
```



### 2. Get all reviews



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/reviews
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



### 3. Get all reviews with bootcamp id



***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/bootcamps/5d725a1b7b292f5f8ceff788/reviews
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



### 4. Get single review


Get single review by its id


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/reviews/5d7a514b5d2c12c7449be027
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



## Users
CRUD opeartions for users but only authorize for admin



### 1. Get all user By Id


Get user by its id


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/users/5c8a1d5b0190b214360dc040
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



### 2. Get all users


Get all users by admin


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{URL}}/api/v1/users
```


***Headers:***

| Key | Value | Description |
| --- | ------|-------------|
| Content-Type | application/json | JSON Type |



---
[Back to top](#devcamer)
> Made with &#9829; by [thedevsaddam](https://github.com/thedevsaddam) | Generated at: 2021-02-19 00:59:26 by [docgen](https://github.com/thedevsaddam/docgen)
