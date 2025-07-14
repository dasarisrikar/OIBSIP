# Auth Demo Web App

This is a simple authentication demo web application built with Node.js, Express, MongoDB, and JWT as part of the Oasis Infobyte Web Development Internship (Task 4).

## Features
- User registration with hashed passwords
- User login with JWT authentication
- Secured route accessible only with a valid token
- CORS enabled for frontend-backend communication

## Files
- `server.js`: Main Express server handling authentication routes
- `models/User.js`: Mongoose model for user data
- `frontend/`: Contains frontend files (HTML, CSS, JS)
  - `dashboard.html`, `index.html`, `script.js`, `style.css`
- `package.json`: Project dependencies and scripts

## How to Run
1. Make sure MongoDB is running locally on your machine.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   node server.js
   ```
4. Open the frontend files in your browser (located in the `frontend/` folder).

## API Endpoints
- `POST /register`: Register a new user
- `POST /login`: Login and receive JWT token
- `GET /secure`: Access a protected route (requires Authorization header)

## Folder Structure
```
OIBSIP_webDev_Task4/
  package.json
  server.js
  models/
    User.js
  frontend/
    dashboard.html
    index.html
    script.js
    style.css
```

## Author
Your Name

## License
This project is for educational purposes as part of the Oasis Infobyte Internship.
