# Notes API Project

This is a simple backend API for managing user accounts and notes. The application allows users to register, log in, create, view, update, and delete their notes.

## Features

- User authentication with JWT tokens.
- Secure note management (create, read, update, delete).
- Password hashing with bcryptjs.
- Token-based authentication with access and refresh tokens.
  
## Technologies Used

- **Node.js** for the server.
- **Express.js** for the backend framework.
- **Prisma** ORM to interact with the MySQL database.
- **bcryptjs** for hashing passwords.
- **jsonwebtoken** for creating and verifying JWT tokens.
- **dotenv** for environment variables.
- **cookie-parser** for handling cookies.

## Setup and Installation

### Prerequisites

- Node.js (version 14 or higher)
- MySQL (or any MySQL compatible database)
  
### 1. Clone the repository

```bash
git clone https://github.com/yourusername/notes-api.git
cd notes-api
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create a ```.env``` file
Create a ```.env``` file in the root of the project and add the following environment variables:

```env
PORT=5000
DATABASE_URL="mysql://USERNAME:PASSWORD@localhost:3306/DB_NAME"
ACCESS_TOKEN_SECRET=yourAccessTokenSecret
REFRESH_TOKEN_SECRET=yourRefreshTokenSecret
```
Make sure to replace ```USERNAME```, ```PASSWORD```, and ```DB_NAME``` with your MySQL database credentials.

### 4. Run the server
```bash
npm run dev
```
The server should now be running on ```http://localhost:5000```.

## Endpoints
### Authentication Routes
- **POST** ```/api/auth/register``` <br>
Registers a new user.<br>
**Request body:**

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "emailAddress": "john.doe@example.com",
  "password": "password123"
}
```
**Response:**

```json
{
  "message": "User successfully registered"
}
```
<br>

- **POST** ```/api/auth/login``` <br>
Logs in a user and generates access and refresh tokens. <br>
**Request body:**

```json
{
  "emailAddress": "john.doe@example.com",
  "password": "password123"
}
```
**Response:**

```json
{
  "message": "Login successful"
}
```
<br>

- **POST** ```/api/auth/logout``` <br>
Logs out the user and clears the cookies containing the tokens. <br>
**Response:**

```json
{
  "message": "Logout successful"
}
```

<br>

### User Routes (Protected)
- **GET** ```/api/user/get-user``` <br>
Retrieves the logged-in user's information. <br>

**Response:**
```json
{
  "user": {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "emailAddress": "john.doe@example.com"
  }
}
```
<br>

### Notes Routes (Protected)
- **GET** ```/api/notes/``` <br>
Retrieves all notes of the logged-in user. <br>

**Response:**

```json
{
  "userNotes": [
    {
      "id": 1,
      "title": "My First Note",
      "content": "This is a note",
      "createdAt": "2024-12-21T00:00:00Z",
      "updatedAt": "2024-12-21T00:00:00Z"
    }
  ]
}
```
<br>

- **POST** ```/api/notes/create``` <br>
Creates a new note. <br>

**Request body:**
```json
{
  "title": "New Note",
  "content": "This is a new note"
}
```

**Response:**

```json
{
  "message": "Note created successfully"
}
```
<br>

- **GET** ```/api/notes/note/:id``` <br>
Retrieves a specific note by its ID. <br>
**Response:**

```json
{
  "note": {
    "id": 1,
    "title": "My First Note",
    "content": "This is a note",
    "createdAt": "2024-12-21T00:00:00Z",
    "updatedAt": "2024-12-21T00:00:00Z"
  }
}
```
<br>

- **PUT** ```/api/notes/update/:id``` <br>
Updates a specific note by its ID. <br>
**Request body:**
```json
{
  "title": "Updated Note",
  "content": "This is an updated note"
}
```

**Response:**
```json
{
  "message": "Note updated successfully"
}
```
<br>

- **DELETE** ```/api/notes/delete/:id``` <br>
Deletes a specific note by its ID. <br>
**Response:**

```json
{
  "message": "Note deleted successfully"
}
```
<br>

## Conclusion
This API serves as a basic backend for managing users and their notes, using secure authentication and CRUD operations. The project can be further extended with additional features like password reset, email verification, etc. 