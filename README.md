# Snip's Blog
Source code of my personal blog. I upload articles here about my experiences, daily life and share my thoughts on random topics. 🍃

### Stack
- React.js
- Next UI
- Express.js
- MongoDB + Mongoose


### Want to test?
I've created test user with `t` as username and password or login into Guest account by clicking on **'Guest Login'** button. You can create, edit and delete posts. 

**NOTE**: Your created posts will be only visible on user profile by clicking the profile picture and not visible on the homepage. 

![img](./client/src/assets/login.png)

###  Wanna deploy yourself?

#### Setup

Environment variables in `server/.env`
```
DB_USER= MongoDB user
DB_PASS= MongoDB password
PORT= Server Port
CLIENT_URL= Client Origin (eg. example.com)
```

Environment variables in `client/.env`
```/
VITE_SERVER= Backend endpoint (eg. api.example.com)
```
