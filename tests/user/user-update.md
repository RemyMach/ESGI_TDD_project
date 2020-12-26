# BDD User Update routes

## User Update

**Title:** User Update Password  

**As an** api User,  
**I want** to modify my Password
**so that** I can use my new Password for my new connection

**Scenario 1:** The parameters are the good one
**Given that** the user give the good old password and new password two times
**when** User use the api with the route /users/password avec une requete Patch
**then** I should see a response 201, the password of the user is hash and the new one is register

**Scenario 2:** The old password parameters is not the good one
**Given that** the user give the wrong old password
**when** User use the api with the route /users/password avec une requete Patch
**then** I should see a response 400, and the db doesn't change the password

**Scenario 3:** The user in not authentified with the auth token 
**Given that** the user doesn't have a valid auth token
**when** User use the api with the route /users/password avec une requete Patch
**then** I should see a response 401

**Scenario 4:** The new password is less than 7 characters
**Given that** the user give a good old password but a new password with invalid number of charracters, less than 7
**when** User use the api with the route /users/password avec une requete Patch
**then** I should see a response 400 and the db doesn't change the password

**Scenario 5:** The two entry of new password is not the same
**Given that** the user give a good old password but the two new password are not the same
**when** User use the api with the route /users/password avec une requete Patch
**then** I should see a response 400 and the db doesn't change the password

**Scenario 6:** The parameter new password is missing
**Given that** the user forget the parameter new_password
**when** User use the api with the route /users/password avec une requete Patch
**then** I should see a response 400 and the db doesn't change the password

**Scenario 7:** The parameter new password confirm is missing
**Given that** the user forget the parameter new_password_confirm
**when** User use the api with the route /users/password avec une requete Patch
**then** I should see a response 400 and the db doesn't change the password

**Scenario 8:** The parameter old password is missing
**Given that** the user forget the parameter old_password
**when** User use the api with the route /users/password avec une requete Patch
**then** I should see a response 400 and the db doesn't change the password