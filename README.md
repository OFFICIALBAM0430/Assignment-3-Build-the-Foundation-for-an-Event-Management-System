EventHorizon — Event Management System API

EventHorizon is a backend API for an event management system. The project provides user registration, email verification, login authentication, and a protected user profile endpoint.

[View Live API] (https://assignment-3-build-the-foundation-for-an.onrender.com)

EventHorizon is deployed on Render and available for live API testing.

Base URL:
https://assignment-3-build-the-foundation-for-an.onrender.com

Features

- User registration
- Joi validation for registration and login data
- Password hashing with bcryptjs
- MongoDB database integration using Mongoose
- Email verification using Nodemailer
- Time-sensitive email verification tokens
- JWT-based login authentication
- Email verification required before login
- Protected user profile endpoint
- Authentication middleware
- Request logging with Morgan
- Environment variable configuration

Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- Joi
- bcryptjs
- jsonwebtoken
- Nodemailer
- Morgan
- dotenv
- Nodemon

Project Structure

Assignment 3 EventHorizon/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authControllers.js
│   │   └── userController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   └── userModel.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── userRoutes.js
│   │
│   ├── utils/
│   │   └── email.js
│   │
│   └── validators/
│       └── authValidator.js
│
├── .env
├── .env.example
├── .gitignore
├── app.js
├── package.json
├── package-lock.json
└── README.md

Requirements

Before running the project, make sure you have:

- Node.js installed
- A MongoDB database
- A Gmail account configured with an App Password for sending verification emails

Installation

Clone the repository:

git clone https://github.com/OFFICIALBAM0430/Assignment-3-Build-the-Foundation-for-an-Event-Management-System.git "Assignment 3 EventHorizon"

Move into the project directory:

cd "Assignment 3 EventHorizon"

Install the dependencies:

npm install

Environment Variables

Create a ".env" file in the project root.

The application uses the following environment variables:

PORT=4500
EVENTHORIZONDB_URL=your_mongodb+serv_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_gmail_address
EMAIL_APP_PASSWORD=your_gmail_app_password

Variable| Purpose
"PORT"| Port used by the Express application
"EVENTHORIZONDB_URL"| MongoDB+serv connection string
"JWT_SECRET"| Secret used to sign and verify JWTs
"EMAIL_USER"| Gmail account used to send verification emails
"EMAIL_APP_PASSWORD"| Gmail App Password used by Nodemailer

The ".env" file should not be committed to GitHub because it contains sensitive credentials.

Running the Application

Start the development server with:

npm run dev or npm start

The application uses port "4500" by default if "PORT" is not provided.

The root endpoint is:

GET /

Response:

Welcome to EventHorizon

API Endpoints

Register User

POST /api/auth/register

Request body:

{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "Password123"
}

The registration validator requires:

- "firstName"
- "lastName"
- A valid email address
- A password of at least 8 characters
- At least one letter in the password
- At least one number in the password

The password is hashed with bcryptjs before the user is stored in MongoDB.

After registration, an email verification token is generated and a verification email is sent using Nodemailer.

Verify Email

GET /api/auth/verify-email?token=YOUR_VERIFICATION_TOKEN

The verification token is included in the email sent to the user.

The application:

1. Receives the token.
2. Hashes the received token.
3. Searches for the hashed token in the database.
4. Checks whether the token has expired.
5. Marks the user's email as verified.
6. Removes the verification token and its expiry time.

The verification token expires after 10 minutes.

Successful response:

{
    "message": "Email verified successfully"
}

Login

POST /api/auth/login

Request body:

{
    "email": "john@example.com",
    "password": "Password123"
}

The login request is validated with Joi.

The application checks:

- Whether the user exists
- Whether the user's email has been verified
- Whether the supplied password matches the stored password

Users who have not verified their email cannot log in.

A successful login returns a JWT.

Example response:

{
    "message": "Login Successful",
    "token": "YOUR_JWT_TOKEN"
}

The JWT expires after 1 hour.

Get User Profile

GET /api/user/profile

This is a protected endpoint.

The JWT must be provided using the "Authorization" header:

Authorization: Bearer YOUR_JWT_TOKEN

The authentication middleware verifies the JWT before allowing the request to continue.

The profile controller retrieves the authenticated user's information from MongoDB and excludes the password from the returned user data.

Authentication Flow

User Registration
       ↓
Joi Validation
       ↓
Password Hashed with bcryptjs
       ↓
Verification Token Generated
       ↓
Hashed Token Stored in MongoDB
       ↓
Verification Email Sent
       ↓
Email Verification
       ↓
User Login
       ↓
JWT Returned
       ↓
JWT Used for Protected Routes

Email Verification

Email verification uses Nodemailer and Gmail.

The verification token:

- Is generated using Node.js "crypto"
- Is separate from the JWT used for login
- Is hashed before being stored in MongoDB
- Has a 10-minute expiration time
- Is removed after successful verification

No OTP is used for the email verification process.

Users must verify their email before they can log in.

Password Validation

Registration passwords must:

- Contain at least 8 characters
- Contain at least one letter
- Contain at least one number

Passwords are hashed with bcryptjs before being stored.

Protected Routes

The user profile endpoint requires a valid JWT.

The implemented profile endpoint is:

GET /api/user/profile

The authentication middleware handles missing, invalid, and expired JWTs.

Error Handling

The application handles errors including:

- Invalid registration data
- Invalid login data
- Existing user email
- Invalid login credentials
- Login attempts by unverified users
- Missing authorization token
- Invalid authorization format
- Invalid or expired JWT
- Missing verification token
- Invalid verification token
- Expired verification token
- Internal server errors

Testing

The API was tested using Postman.

The implemented flow was tested for:

- User registration
- Email verification
- User login
- Unverified user login
- Protected profile access
- Profile access without a token
- Profile access with an invalid token
- Invalid and expired authentication tokens
- Invalid and expired email verification tokens

Author

OFFICIALBAM0430
