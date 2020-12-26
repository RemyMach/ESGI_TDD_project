# BDD User Register routes

## User register

**Title:** User Register.  

**As an** api User,  
**I want** to create an account with my parameters
**so that** I can use the api as a register user

**Scenario 1:** The parameters are the good one with the good format and the route to.
**Given that** the user give the good parameters to the api route
**when** User use the api with the route /users avec une requete Post
**then** I should see a response 201, the user is correctly register in the database, the response match the format expected ans the password is hash in the database

**Scenario 2:** a parameter required is missing
**Given that** the user forget a parameter to the route.
**when** User use the api with the route /users with a post request
**then** I should see a response 400

**Scenario 3:** an invalid parameter is passed to the request
**Given that** the user give a non valid parameter
**when** User use the api with the route /users with a post request
**then** I should see a response 201 ( the parameter has to be ignored ), the user is correctly register in the database, the response match the format expected ans the password is hash in the database

**Scenario 4:** an invalid email
**Given that** the user give a non valid email
**when** User use the api with the route /users with a post request
**then** I should see a response 400

**Scenario 5:** an invalid role
**Given that** the user give a non valid object_id of a role that is not invite role
**when** User use the api with the route /users with a post request
**then** I should see a response 400

**Scenario 6:** an existing user 
**Given that** the user give an email that is already existing in the database
**when** User use the api with the route /users with a post request
**then** I should see a response 400

**Scenario 7:** a user with a negative age 
**Given that** the user give an age that is negative
**when** User use the api with the route /users with a post request
**then** I should see a response 400

**Scenario 8** The password is less than 7 characters
**Given that** the user give a non valid size of password, less thant 7 characters
**when** User use the api with the route /users/password avec une requete Patch
**then** I should see a response 400