# React + Vite

## CityHopper is a web application that allows users to create and join travel plans, making city hopping easy and convenient.

# 🚀 Features

User authentication (Sign up, Login, Logout)

Create travel plans with details such as destination, date, and price

Browse a list of available travels

Search for travels based on starting city, destination, and date

Request a seat on a travel

Responsive design with a modern UI

User dashboard to manage travel plans and requests

Mobile-friendly design for seamless experience

# 🛠 Tech Stack

Frontend: React.js, React Router, Axios

Backend: Node.js, Express.js, MongoDB (Assumed for API)

Authentication: JSON Web Tokens (JWT)

Styling: CSS with Light Blue & Blue Theme

Deployment: Netlify (Frontend), Render/Heroku (Backend)

# 📂 Project Structure

client/
│── src/
│   ├── components/   -Reusable components (Navbar, Forms, etc.)
│   ├── pages/        -Application pages (Home, Signin, Signup, etc.)
│   ├── context/      -AuthContext for user authentication
│   ├── assets/       -Images and static files
│   ├── App.js        -Main App component
│   ├── main.jsx      -Entry point
│── public/           -Static assets
│── .env              -Environment variables
│── package.json      -Dependencies & scripts

# 🔧 Setup & Installation

Clone the repository:

git clone https://github.com/CityHopp/client.git
cd client

Install dependencies:

npm install

Create a .env file and add:

VITE_API_URL=http://your-api-url

Start the development server:

npm run dev

# 🚀 Deployment

The project is deployed on Netlify. If you encounter issues with images not loading, ensure:

Image paths are correct

Assets are inside the public/ folder if using static images

Use absolute paths for imports in React

Check Netlify build settings for asset optimization

# 🤝 Contributing

Feel free to create your own travel! Follow these steps:

Fork the repository

Create a feature branch: git checkout -b feature-name

Commit your changes: git commit -m "Add feature"

Push to the branch: git push origin feature-name

Create a pull request
