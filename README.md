# AI Traffic Citation System - Backend

## Routes Available

### Creation

- Create a new User: `POST /auth/signup`

- Create a new Officer (only other officers and admins can access this route): `POST /users`

- Generate a new challan (available only for officers): `POST /challans`

- Register a new vehicle for self: `POST /vehicles`

### Reading

- Get currently logged in user: `GET /users/me`

- Get all users(available only for officers and admins): `GET /users`

- Get a user with user id(available only for officers and admins): `GET /users/:userId`

- Get all the officers
