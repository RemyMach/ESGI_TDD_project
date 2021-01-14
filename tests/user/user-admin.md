# BDD User admin routes

## User admin create

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
**Given that** an admin user forget a parameter to the route to create the user
**when** User use the api with the route /users/admin/create with a Post request
**then** I should see a response 400

**Scenario 4:** an invalid parameter is passed to the request
**Given that** an admin user give a non valid parameter
**when** User use the api with the route /users/admin/create with a Post request
**then** I should see a response 201 ( the parameter has to be ignored ), the user is correctly register in the database, the response match the format expected ans the password is hash in the database

**Scenario 5:** an invalid email
**Given that** an admin user give a non valid email
**when** User use the api with the route /users/admin/create with a Post request
**then** I should see a response 400

**Scenario 6:** an invalid role
**Given that** and admin user give a non valid object_id of a role that is not invite role or editor role
**when** User use the api with the route /users/admin/create with a Post request
**then** I should see a response 400

**Scenario 7:** an existing user 
**Given that** an admin user give an email that is already existing in the database
**when** User use the api with the route /users/admin/create with a Post request
**then** I should see a response 400

**Scenario 8:** a user with a negative age 
**Given that** an admin user give an age that is negative for the new user
**when** User use the api with the route /users/admin/create with a Post request
**then** I should see a response 400

**Scenario 9:** The parameters are the good one with the good format and the route to and the role is editor
**Given that** the user use auth token with admin role and good parameters to create an other user with invite or editor role
**when** User use the api with the route /users/admin/create with a Post request
**then** I should see a response 201 the user is correctly register in the database, the response match the format expected ans the password is hash in the database

## User admin delete

**Title:** User delete.  

**As an** admin api User,  
**I want** to delete an account of an existing editor or invite user
**so that** The admin user is going to delete an invite or editor account

**Scenario 1:** The parameters are the good one with the good format and the route to.
**Given that** the admin user give the id of invite user or editor user to delete and his correct admin password
**when** User use the api with the route /users/admin/delete/ with a delete request
**then** I should see a response 200 the user is delete, and the user is not anymore present in the database

**Scenario 2:** The admin password is not valid
**Given that** the admin user give the id of invite user or editor user to delete but his admin password is invalid
**when** User use the api with the route /users/admin/delete/ with a delete request
**then** I should see a response 400

**Scenario 3:** the deleted user is not an editor or an invite
**Given that** the admin user give the id of a user that is not an invite or an editor
**when** User use the api with the route /users/admin/delete/ with a delete request
**then** I should see a response 400

**Scenario 4:** The User that try to delete an other user is not an admin
**Given that** the user use auth token but his role is not admin
**when** User use the api with the route /users/admin/delete/ with a delete request
**then** I should see a response 401

**Scenario 5:** The user to be deleted does not exist
**Given that** the admin user give the id of a user that is not an existing user
**when** User use the api with the route /users/admin/delete/ with a delete request
**then** I should see a response 400

**Scenario 6:** The admin password is missing
**Given that** the admin user forget his password in the parameters of the request
**when** User use the api with the route /users/admin/delete/ with a delete request
**then** I should see a response 400

**Scenario 7:** The id user to be deleted is missing
**Given that** the admin user forget the id User that has to be deleted
**when** User use the api with the route /users/admin/delete/ with a delete request
**then** I should see a response 400

**Scenario 8:** The id user to be deleted is an editor
**Given that** the admin user give the id of editor user to delete and his valid admin password
**when** User use the api with the route /users/admin/delete/ with a delete request
**then** I should see a response 200, the user is delete, and the user is not anymore present in the database

## User admin update Role

**Title:** User update Role  

**As an** admin api User,  
**I want** to update the role of an existing user
**so that** The admin user is going to update the roleof an existing user

**Scenario 1:** The parameters are the good one with the good format and the route to for an invite user to editor role
**Given that** the admin user give the id of invite user or editor user and the id of the new role
**when** User use the api with the route /users/admin/update/role with a patch request
**then** I should see a response 200 the user is modify, the User in the database has a new role

**Scenario 2:** The parameters are the good one with the good format and the route to for an editor user to admin role
**Given that** the admin user give the id of invite user or editor user and the id of the new role
**when** User use the api with the route /users/admin/update/role with a patch request
**then** I should see a response 200 the user is modify, the User in the database has a new role

**Scenario 3:** The admin password is not valid
**Given that** the admin user give the id of invite user or editor user to delete but his admin password is invalid
**when**  User use the api with the route /users/admin/update/role with a patch request
**then** I should see a response 400, the role must not have changed in the database

**Scenario 4:** the user to update role is not an editor or an invite
**Given that** the admin user give the id of a user that is not an invite or an editor
**when** User use the api with the route /users/admin/update/role with a patch request
**then** I should see a response 400, the role must not have changed in the database

**Scenario 5:** The User that try to update role of an other user is not an admin
**Given that** the user use auth token but his role is not admin
**when** User use the api with the route /users/admin/update/role with a patch request
**then** I should see a response 401

**Scenario 6:** The user to be update does not exist
**Given that** the admin user give the id of a user that is not an existing user
**when** User use the api with the route /users/admin/update/role with a patch request
**then** I should see a response 400

**Scenario 7:** The id of the new Role is missing in the parameters of the request
**Given that** the admin user forget the id of the new Role
**when** User use the api with the route /users/admin/update/role with a patch request
**then** I should see a response 400, the role must not have changed in the database

**Scenario 8:** The id user to be update is missing in the parameters of the request
**Given that** the admin user forget the id User that has to be deleted
**when** User use the api with the route /users/admin/update/role with a patch request
**then** I should see a response 400, the role must not have changed in the database

**Scenario 9:** The password of the admin is missing
**Given that** the admin user forget the id User that has to be deleted
**when** User use the api with the route /users/admin/update/role with a patch request
**then** I should see a response 400, the role must not have changed in the database

**Scenario 10:** The password of the admin is not valid
**Given that** the admin user give a wrong password in the parameters
**when** User use the api with the route /users/admin/update/role with a patch request
**then** I should see a response 400, the role must not have changed in the database

**Scenario 11:** The id of the new role is not valid
**Given that** the admin user give a wrong id role in the parameters
**when** User use the api with the route /users/admin/update/role with a patch request
**then** I should see a response 400, the role must not have changed in the database