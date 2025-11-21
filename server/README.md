# README for Patent Portal Server

# Patent Portal Server

This is the server-side of the Patent Portal project. It is built using Node.js and Express, and it connects to a local MongoDB database to handle patent-related data.

## Project Structure

- **src/**: Contains the source code for the server.
  - **app.js**: The entry point for the server application. Sets up the Express server and middleware.
  - **db.js**: Establishes a connection to the local MongoDB database.
  - **routes/**: Contains route definitions for handling API requests.
    - **patents.js**: Defines routes for patent-related API requests.

## Setup Instructions

1. **Install Dependencies**: Navigate to the `server` directory and run:
   ```
   npm install
   ```

2. **MongoDB Connection**: Ensure that MongoDB is running locally. The connection details can be configured in `db.js`.

3. **Start the Server**: Run the following command to start the server:
   ```
   node src/app.js
   ```

## API Endpoints

- **GET /api/patents**: Fetches a list of patents from the database.
- **POST /api/patents**: Adds a new patent to the database.

## Notes

Make sure to have MongoDB installed and running on your local machine before starting the server.