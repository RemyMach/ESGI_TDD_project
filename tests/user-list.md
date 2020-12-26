# BDD User Login routes

## User login

**Title:** User Login.  

**As an** api User,  
**I want** to list data about User
**so that** I can see some informations about User

**Scenario 1:** The parameters are the good one and I want to list my User profile
**Given that** the user has the good Authorization token
**when** User use the api with the route /users/me with a get request
**then** I should see a response 200 and response body that contain User information

**Scenario 2:** The token is not a valid token
**Given that** the user has not a valid Authorization token
**when** User use the api with the route /users/me with a get request
**then** I should see a response 401

**Scenario 3:** No token is provide
**Given that** the user has not provide a token in the header of the request
**when** User use the api with the route /users/me with a get request
**then** I should see a response 401