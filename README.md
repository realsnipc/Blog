## Shaurya's Blog

This is the source code for my personal blog. I upload articles here about my experiences, daily life, and share my thoughts on various topics.

### Tech Stack

React.js
Next UI
Express.js
MongoDB + Mongoose
### Want to Test the Blog?

Click the 'Guest Login' button to get temporary user credentials. This guest account allows you to create, edit, and delete posts. However, your created posts will only be visible on your user profile and not on the homepage. To view your posts, go to the 'Your Posts' section from the navbar.

![].(/client/src/assets/login.png)

### Running the Blog Locally

Install all dependencies for both the /server and /client directories separately.
Set up the environment variables as described below.
Environment Variables

server/.env
```
DB_USER: Your MongoDB username (e.g., cooluser)
DB_PASS: Your MongoDB password (e.g., coolpassword)
PORT: The port on which the server will run (e.g., 5000)
CLIENT_URL: The origin URL of your client application (e.g., example.com)
```

client/.env
```
VITE_SERVER: The backend API endpoint URL (e.g., api.example.com)
```
