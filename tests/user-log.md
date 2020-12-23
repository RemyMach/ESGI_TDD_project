# BDD User Login routes

## User login

**Title:** User Login.  

**As an** api User,  
**I want** to connect to the api account
**so that** I can use the api as a connected user

**Scenario 1:** The parameters are the good one with the good format and the route to.
**Given that** the user give the good password and email to connect to the api
**when** User use the api with the route /users/login with a Post request
**then** I should see a response 200 and in the mongodb the first user token has to be the same than the token in the response body

**Scenario 2:** The email login is incorrect
**Given that** the user give an invalid email
**when** User use the api with the route /users/login with a Post request
**then** I should see a response 400

**Scenario 3:** The password is incorect for the email
**Given that** the user give an invalid password for the email
**when** User use the api with the route /users/login with a Post request
**then** I should see a response 400

**Scenario 4:** an invalid parameter is passed to the request
**Given that** the user give good password and email but an invalid other argument that is not expecting in the route
**when** User use the api with the route /users/login with a Post request
**then** I should see a response 200 and in the mongodb the first user token has to be the same than the token in the response body

**Scenario 5:** a parameter is missing in the route
**Given that** the user forget the password
**when** User use the api with the route /users/login with a Post request
**then** I should see a response 400


**Title:** User Logout.  

**As an** api User,  
**I want** to disconnect the account to the api
**so that** I can quit the api and delete the token so nobody can use it

**Scenario 1:** The user give the good auth token to disconnect
**Given that** the user give the auth token to logout
**when**  User use the api with the route /users/logout with a Post request
**then** I should see a response 200

**Scenario 1:** The token doesn't exist
**Given that** the user give a wrong auth token to logout
**when**  User use the api with the route /users/logout with a Post request
**then** I should see a response 400