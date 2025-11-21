# Patent Portal

This project is a web application for managing patents, built with React on the client-side and Node.js with Express on the server-side. It connects to a local MongoDB database to store and retrieve patent information.

## Project Structure

```
patent portal
├── client                # React frontend
│   ├── public
│   │   └── index.html    # Main HTML file for the React application
│   ├── src
│   │   ├── App.jsx       # Main component of the React application
│   │   ├── index.jsx     # Entry point for the React application
│   │   └── components
│   │       └── PatentList.jsx # Component to display a list of patents
│   ├── package.json      # Configuration for the client-side application
│   └── README.md         # Documentation for the client-side
├── server                # Node.js backend
│   ├── src
│   │   ├── app.js        # Entry point for the server-side application
│   │   ├── db.js         # MongoDB connection setup
│   │   └── routes
│   │       └── patents.js # API routes for patent-related requests
│   ├── package.json      # Configuration for the server-side application
│   └── README.md         # Documentation for the server-side
└── README.md             # Overall project documentation
```

## Setup Instructions

1. **Create the "patent portal" folder**.
2. **Inside "patent portal", create two subfolders: "client" and "server"**.
3. **In the "client" folder, run** `npx create-react-app .` **to set up the React application**.
4. **Install necessary libraries for React**:
   ```bash
   npm install axios
   ```
5. **In the "server" folder, initialize a new Node.js project with** `npm init -y`.
6. **Install Express and Mongoose (or MongoDB driver) in the "server" folder**:
   ```bash
   npm install express mongoose
   ```
7. **Set up the MongoDB connection in** `server/src/db.js`.
8. **Define API routes in** `server/src/routes/patents.js`.
9. **Start the server by running** `node server/src/app.js`.
10. **Start the React application by running** `npm start` **in the "client" folder**.

## Requirements

- Ensure that MongoDB is running locally before starting the server.
- Follow the instructions carefully to set up both the client and server environments.