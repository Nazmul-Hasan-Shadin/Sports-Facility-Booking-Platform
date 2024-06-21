# Sports Facility Booking Platform

## Introduction

Welcome to the Sports Facility Booking Platform project! This platform aims to provide a simple and efficient way for users to book sports facilities hassle-free. Developed using TypeScript, Express.js, and MongoDB with Mongoose, this project offers CRUD operations for users, facilities, and bookings, along with robust authentication and error handling functionalities.

## Technology Stack

- **Programming Language**: TypeScript
- **Web Framework**: Express.js
- **Database**: MongoDB with Mongoose for ODM
- **Authentication**: JWT (JSON Web Tokens)
# Prerequisites:
Node.js and npm (or yarn) installed on your system. Verify with node -v and npm -v (or yarn -v) in your terminal. Download them from the official Node.js website if needed: https://nodejs.org/en/download/package-manager.



## Setup Instructions

To set up and run this project locally, follow these steps:

1. **Clone the repository**
   ```bash
   git clone https://github.com/Nazmul-Hasan-Shadin/Sports-Facility-Booking-Platform.git
   cd <project_directory>
## Install dependencies

bash
Copy code
### npm install
### Set environment variables :
Create a .env file in the root directory with the following variables:

dotenv
 code
#### PORT=3000  ( Example port, change as needed)
#### MONGODB_URI=<your_mongodb_uri>
#### JWT_SECRET=<your_jwt_secret>
### Start the server


### npm start
The server will start at http://localhost:3000 (or your specified port).

## API Documentation
### User Routes
Sign Up

POST /api/auth/signup
Create a new user with the specified details.
### Login

POST /api/auth/login
Authenticate a user and receive a JWT token for authorization.
Facility Routes
### Create a Facility (Admin Only)

POST /api/facility
### Add a new sports facility to the system.
Update a Facility (Admin Only)

### PUT /api/facility/:id
Update details of an existing facility.
Delete a Facility - Soft Delete (Admin Only)

### DELETE /api/facility/:id
Mark a facility as deleted (soft delete).
### Get All Facilities

GET /api/facility
Retrieve all active facilities.
###  Booking Routes
Check Availability

GET /api/check-availability
Check available time slots for booking on a specific date.
Create a Booking (User Only)

### POST /api/bookings
Book a facility for a specified date and time range.
### View All Bookings (Admin Only)

 GET /api/bookings
Retrieve all bookings made in the system.
### View Bookings by User (User Only)

GET /api/bookings/user
Retrieve bookings made by the authenticated user.
Cancel a Booking (User Only)

DELETE /api/bookings/:id
Cancel a booking identified by its ID.

## Live Link : [Facility Booking Platform](https://facility-booking-platform.vercel.app/)
