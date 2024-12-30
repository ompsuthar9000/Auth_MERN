# MERN Registration API

This is a MERN stack application that allows users to register with their personal information and profile picture. The application provides API endpoints for user registration, viewing user data, updating user data, and deleting users. It also includes a front-end built with React.js for interacting with these APIs.

## Features

- **User Registration:** Allows users to register with personal details and profile picture.
- **View Registered Users:** Displays a list of registered users with options to view individual user details.
- **Update User Data:** Enables users to update their information.
- **Delete User:** Provides functionality to delete a user from the database.
- **Profile Picture Upload:** Supports profile picture uploads using Multer for handling file uploads.
- **Cloudinary Integration:** Handles image uploads to the cloud using Cloudinary for better scalability and management.

## Requirements

Before running the application, ensure you have the following installed:

- **Node.js** (v16 or above)
- **MongoDB** (either locally or a cloud service like MongoDB Atlas)
- **npm** or **yarn** (for managing dependencies)
- **React.js** (for the front-end)

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies using npm:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory and add the following values:
   ```env
   PORT=3000
   DBURL="mongodb+srv://<your_mongodb_username>:<db_password>@cluster0.mongodb.net/prectical_task"
   DBPASSWORD="<your_mongodb_password>"
   SERVER_BASE_URL="http://127.0.0.1:3000"
   FRONTEND_URL="http://127.0.0.1:5173"

   # Cloudinary configurations
   CLOUDNAME="<your_cloudinary_cloudname>"
   APIKEY="<your_cloudinary_apikey>"
   APISECRET="<your_cloudinary_apisecret>"
   APIENVVAR="CLOUDINARY_URL=cloudinary://<your_cloudinary_apikey>:<your_cloudinary_apisecret>@<your_cloudinary_cloudname>"
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies using npm:
   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory and add the following values:
   ```env
   VITE_API_URL="http://127.0.0.1:3000"
   ```

4. Start the frontend server:
   ```bash
   npm run dev
   ```

### Important Note

The backend blocks requests from `localhost` due to CORS policy. Always use the format `http://127.0.0.1:<port>` instead of `http://localhost:<port>` for both the API URL and frontend base URL in your environment files. This ensures seamless communication between the frontend and backend.

## Cloudinary Configuration

This application uses Cloudinary for handling image uploads. Ensure you have a Cloudinary account and have created a cloud name. Add your Cloudinary credentials to the `.env` file in the backend directory as shown in the example above.

## Screenshots

### User Registration
![Screenshot 1](./Screenshot/create.png)

### User List
![Screenshot 2](./Screenshot/List.png)

### User Update
![Screenshot 3](./Screenshot/editUser.png)
