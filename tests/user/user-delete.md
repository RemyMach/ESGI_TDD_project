## User delete routes

**Title:** User delete.  

**As an** api User,  
**I want** to delete my account
**so that** The api user delete his account

**Scenario 1:** The parameters are the good one with the good format and the route to.
**Given that** the user give his auth token in headers and his password in parameters
**when** User use the api with the route /users/delete with a delete request
**then** I should see a response 200 the user is delete, and the user is not anymore present in the database

**Scenario 2:** The password of the user is not the valid one
**Given that** the user give a non valid password
**when** User use the api with the route /users/delete with a delete request
**then** I should see a response 400

**Scenario 3:** The Auth token is not valid
**Given that** the user use a non valid auth token
**when** User use the api with the route /users/delete with a delete request
**then** I should see a response 401

**Scenario 4:** The Auth token is missing
**Given that** the user use no token
**when** User use the api with the route /users/delete with a delete request
**then** I should see a response 401

**Scenario 5:** The password of the user is missing
**Given that** the user forget his password in the parameters of the request
**when** User use the api with the route /users/delete with a delete request
**then** I should see a response 400