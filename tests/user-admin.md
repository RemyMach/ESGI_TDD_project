# BDD User admin routes

## User admin

**Title:** User create.  

**As an** admin api User,  
**I want** to create an account for an other user
**so that** The user is going to have an account

**Scenario 1:** The parameters are the good one with the good format and the route to.
**Given that** the user use auth token with admin role and good parameters to create an other user with invite or editor role
**when** User use the api with the route /users/admin/create with a Post request
**then** I should see a response 201 the user is correctly register in the database, the response match the format expected ans the password is hash in the database

**Scenario 2:** The User that try to create an other user is not an admin
**Given that** the user use auth token but his role is not admin
**when** User use the api with the route /users/admin/create with a Post request
**then** I should see a response 401

**Scenario 3:** a parameter required is missing
**Given that** the user forget a parameter to the route.
**when** User use the api with the route /users with a post request
**then** I should see a response 400

**Scenario 4:** an invalid parameter is passed to the request
**Given that** the user give a non valid parameter
**when** User use the api with the route /users with a post request
**then** I should see a response 201 ( the parameter has to be ignored ), the user is correctly register in the database, the response match the format expected ans the password is hash in the database

**Scenario 5:** an invalid email
**Given that** the user give a non valid email
**when** User use the api with the route /users with a post request
**then** I should see a response 400

**Scenario 6:** an invalid role
**Given that** the user give a non valid object_id of a role that is not invite role
**when** User use the api with the route /users with a post request
**then** I should see a response 400

**Scenario 7:** an existing user 
**Given that** the user give an email that is already existing in the database
**when** User use the api with the route /users with a post request
**then** I should see a response 400

**Scenario 8:** a user with a negative age 
**Given that** the user give an age that is negative
**when** User use the api with the route /users with a post request
**then** I should see a response 400


**Title:** User delete.  

**As an** admin api User,  
**I want** to create an account for an other user
**so that** The admin user is going to delete an invite account

**Scenario 1:** The parameters are the good one with the good format and the route to.
**Given that** the user use auth token with admin role and good parameters to create an other user with invite or editor role
**when** User use the api with the route /users/admin/delete/:id with a get request
**then** I should see a response 200 the user is delete