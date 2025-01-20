# Asset Insights Developer Test

## Brief:

We would like you to create a web application that produces some kind of user management functionality. The application should be able to:

- Display the users in a list/table.
- Have the ability to create users.
- Have the ability to update users.
- Have the ability to delete users. The task gives you free rain on how the front end of the application will look, but it is important to note that it should mainly focus on producing a good working solution.

## My Plan

- set up hono backend server to host RESTful API
  - install packages
  - small test route to ensure it's working
- use JSON file to store user data
  - use node fs to create, read and write
  - when posting a new user, check if the json file exists
    - if it doesn't, create it
    - otherwise write new user to the file
- write POST route to add a new user
  - test
- write GET routes to:
  - Fetch all users
  - Fetch a user
  - test
- write PUT route to update a user
  - test
- write DELETE route to delete a user

  - test

- build frontend using React and Vite
- Simple interface to:
  - Display all users in a list
  - Form to add a new user
  - Buttons to:
    - Update User
    - Delete User
