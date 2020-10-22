## Task Manager API
Just a simple Javascript back-end service that let you build a 'task manager' CRUD applications run on MongoDB easier with Read and Write API. It maintains your task with authentication so every single user has privacy on their tasks.

### Base URL
```
https://resqiar-task-manager-api.herokuapp.com/
```
### Local Installation
##### 1. Clone this repository anywhere on your machine `git clone https://github.com/resqiar/Task-Manager-API.git`
##### 2. Build the modules first `npm build`
##### 3. Setup config files
rename 'sample-dev.env' to 'dev.env' and simply enter the value of your MongoDB connection URL, and provide JWT token.
##### 4. Run `npm run dev`

# API Routes
Routes has two relationship collections that provide **User** routes and **Task** routes. 
**Remember to include user's token in request header, otherwise it would be unauthorized request. required authorization route marked as (*)**

#### Create User
```
 POST /user
 ```
 
 #### Read User Profile *
 
```
 GET /user/my
 ```
 
 #### Update User Data *
```
 PATCH /user/my
 ```
 
 #### Delete User *
```
 DELETE /user/my
 ```
 
 #### Login with email and password
```
 POST /user/login
 ```
 
 #### Logout *
```
 POST /user/logout
 ```
 
 #### Logout from all devices *
```
 POST /user/logoutAll
 ```
 
 #### Upload user avatar *
```
 POST /user/my/avatar
 ```
 
 #### Inspect User Avatar by their ID 
```
 GET /user/{ID}/avatar
 ```
 
 #### Delete Avatar *
```
 Delete /user/my/avatar
 ```
