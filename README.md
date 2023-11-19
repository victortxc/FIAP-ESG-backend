# Endpoints

## User

## List Users
Endpoint: /users
Method: GET
Description: Returns a list of all users.

## Create User
Endpoint: /users
Method: POST
Description: Creates a new user. Requires a JSON body with the fields name, password, and email.

## Example Body for Creating an User

{
  "name": "John Doe",
  "password": "password123",
  "email": "john.doe@example.com",
  "isAdmin": false
}


## User Login
Endpoint: /login
Method: POST
Description: Authenticates a user and returns an authentication token. Requires a JSON body with the fields email and password.

## Example Body for login

{
  "email": "john.doe@example.com",
  "password": "password123"
}

## Get Current User
Endpoint: /me
Method: GET
Description: Returns information about the currently authenticated user.

## Exercise

## List User Exercises
Endpoint: /users/exercises
Method: GET
Description: Returns a list of exercises for the currently authenticated user.

## Create Exercise
Endpoint: /exercise
Method: POST
Description: Creates a new exercise for the currently authenticated user. Requires a JSON body with the fields category, km, and date.

## Example Body for Creating an Exercise

{
  "category": "caminhar",
  "km": 5,
  "date": "2023-11-19"
}
