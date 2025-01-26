# Mysterious Express Api

A mysterious project written by mysterious candidate for mysterious company with headquarters in Silesian Voivodeship

## Installation

### Easiest way:

1. Install Docker:

https://docs.docker.com/engine/install/

2. In directory of cloned project folder run:

```
  docker-compose up
```

And wait for installation to finish.

You can check by visiting

`localhost:8080/`

## Usage

To be able to access user endpoints, you first need to generate a user token.

You do that by sending a POST request to the following endpoint:

```
localhost:8080/api/auth/register
```

And a required payload like the one below:

```
{
    "email": "test@example.com",
    "password": "123456789"
}
```

You'll receive an answer object like this:

```
{
    "message": "User registered successfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR..."
}
```

![App Screenshot](https://raw.githubusercontent.com/David0z/mysterious-express-api/refs/heads/main/screenshots/1.png)

Copy the token value as it will be required in requests to user endpoints.

Now you can try to create a new user with POST request to the route:

```
localhost:8080/api/user
```

With this payload:

```
{
    "firstName": "Dawid",
    "lastName": "Czesak",
    "role": "admin",
    "email": "test@test.com"
}
```

![App Screenshot](https://raw.githubusercontent.com/David0z/mysterious-express-api/refs/heads/main/screenshots/3.png)

And with Bearer token in the "Authorization" header:

```
Bearer eyJhbGciOiJIUzI1N...
```

![App Screenshot](https://raw.githubusercontent.com/David0z/mysterious-express-api/refs/heads/main/screenshots/2.png)

### Tests

To run tests I run:

- docker-compose -f docker-compose.test.yml up
  (to set up seperate database)
- npm install
- [optional] npm start
- npm run test (in seperate terminal)

## API Reference

### Auth API

#### - Register User

```http
  POST /api/auth/register
```

JSON payload:

```
{
    "email": string,  **required**
    "password": string **required, at least 6 letters**
}
```

Example JSON Response:

```
{
    "message": "User registered successfully",
    "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

Success response code: **201**

#### - Login User

```http
  POST /api/auth/login
```

JSON payload:

```
{
    "email": string,  **required**
    "password": string **required**
}
```

Example JSON Response:

```
{
    "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

Success response code: **200**

### User API

Each of the following endpoints require a Bearer Token from **Auth** endpoint.

#### - Create User

```http
  POST /api/user
```

JSON payload:

```
{
    "firstName": string,
    "lastName": string,
    "role": string: "admin" | "user", **required**
    "email": string  **required**
}
```

Success response code: **201**

#### - Get users

```http
  GET /api/users
```

Example JSON Response:

```
[
  {
    "id": 1,
    "firstName": "John",
    "lastName": "Smith",
    "email": "jsmith@gmail.com",
    "role": "user"
  },
  {
    "id": 2,
    "firstName": "Jan",
    "lastName": "Kowalski",
    "email": "jkowalski@gmail.com",
    "role": "admin"
  }
]
```

Success response code: **200**

#### - Get user

```http
  GET /api/user/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of user to fetch |

Example JSON Response:

```
{
    "id": 3,
    "firstName": "",
    "lastName": "",
    "email": "example@gmail.com",
    "role": "user"
  }
```

Success response code: **200**

#### - Update User

```http
  PATCH /api/user/${id}
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. Id of user to update |

JSON payload:

```
{
    "firstName": string,
    "lastName": string,
    "role": string: "admin" | "user"
}
```

Success response code: **200**

#### - Delete User

```http
  DELETE /api/user/${id}
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. Id of user to delete |

Success response code: **200**
