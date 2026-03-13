#########################################
React User Directory

A modern React application that fetches user data from a public REST API and displays it in an interactive interface. The project demonstrates API integration, state management, and dynamic UI rendering using React Hooks. Users can search, filter, sort, and paginate through a list of users in a clean and responsive layout.



#####################################
🚀 Features

Fetch user data from a REST API
Search users by name
Debounced search for better performance
Filter users by company
Sort users alphabetically (A–Z / Z–A)
Pagination for navigating large datasets
Reload users from the API
Responsive card-based UI
Component-based architecture


#########################################
🛠 Tech Stack

React
JavaScript (ES6+)
Fetch API
React Hooks (useState, useEffect)
CSS / Inline Styling


###########################################
📡 API Used

User data is fetched from:

https://jsonplaceholder.typicode.com/users

This API provides mock user data commonly used for testing frontend applications.


#############################################
📂 Project Structure

src
├ components
│ └ UserCard.jsx
│
├ App.jsx
└ index.css


#############################################
⚙️ Installation & Setup

Clone the repository

git clone https://github.com/yourusername/react-user-directory.git

Navigate to the project folder
cd react-user-directory
Install dependencies
npm install
Run the development server
npm run dev



##############################################
📖 How It Works

When the application loads, it fetches user data from the API.
The fetched data is stored in React state.

Users can:
Search users by name
Filter users by company
Sort users alphabetically
Pagination allows navigating through users in smaller groups.
React components dynamically update the UI whenever the state changes.


##########################################
🎯 Learning Objectives

This project was built to practice and demonstrate:
Fetching data from API
Managing component state
Handling asynchronous operations
Implementing search and filtering logic
Building reusable React components
Creating interactive frontend interfaces


#######################################
📌 Future Improvements

Add loading spinner
Add error handling UI
Convert pagination into a reusable component
Add infinite scrolling
Improve UI styling with Tailwind or Material UI


#######################################
👨‍💻 Author

Developed by Omkar Dalvi