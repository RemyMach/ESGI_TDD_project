# User Routes

## User register

**Title:** User Register.  

**As an** api User,  
**I want** to create an account with my parameters
**so that** I can use the api as a register user

**Scenario 1:** The parameters are the good one with the good format and the route to.
**Given that** the user give the good parameters to the api route
**when** User use the api with the route /users avec une requete Post
**then** I should see a response 200

**Scenario 2:** a parameter required is missing
**Given that** the user forget a parameter to the route.
**when** User use the api with the route /users with a post request
**then** I should see a response 400


**Scenario 3:** an invalid parameter is passed to the request
**Given that** the user give a non valid parameter
**when** User use the api with the route /users with a post request
**then** I should see a response 200 ( the parameter has to be ignored )