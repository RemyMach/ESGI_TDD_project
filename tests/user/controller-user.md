# BDD Controllers/user file

## verifyNewPasswords function

**Title:** verifyNewPasswords  

**As an** developper user,  
**I want** to compare two password and check the content of the body parameter
**so that** The developper can know if the body and the password are valid

**Scenario 1:** The parameter is valid and the passwords are the same
**Given that** the developper give a body with body.new_password and body.new_password_confirm and they are identic
**when** developper call the function to test the validity of body for passwords
**then** I should see a response true

**Scenario 2:** The parameter is valid and the passwords are the same but we have one more parameter
**Given that** the developper give a body with body.new_password and body.new_password_confirm and they are identic
**and** and give one parameter name in the body object
**when** developper call the function to test the validity of body for passwords
**then** I should see a response true

**Scenario 3:** The parameter body is just a String
**Given that** the developper give just a string for body
**when** developper call the function to test the validity of body for passwords
**then** I should see an Error the new_password and new_password are not defined or are not String

**Scenario 4:** The parameter body is just an integer
**Given that** the developper give just a int for body
**when** developper call the function to test the validity of body for passwords
**then** I should see an Error the new_password and new_password are not defined or are not String

**Scenario 5:** The parameter body is valid but we add an other parameter
**Given that** the developper give a valid body but an other parameter after body
**when** developper call the function to test the validity of body for passwords
**then** I should see a response true

**Scenario 6:** An other parameter is add before body
**Given that** the developper give an other parameter before the body parameter
**when** developper call the function to test the validity of body for passwords
**then** I should see an Error the new_password and new_password are not defined or are not String

**Scenario 7:** the parameter body is valid and new_password and new_password_confirm are empty
**Given that** the developper give empty new_passwords and new_password_confirm
**when** developper call the function to test the validity of body for passwords
**then** I should see a response true

**Scenario 8:** the parameter body is valid but new_password and new_password_confirm are integer
**Given that** the developper give integer for new_password and new_password_confirm
**when** developper call the function to test the validity of body for passwords
**then** I should see an Error new_password and new_password_confirm are not they same

**Scenario 9:** the parameter body is valid but new_password and new_password_confirm are not the same
**Given that** the developper give a new_password and new_password_confirm but they are not the same string
**when** developper call the function to test the validity of body for passwords
**then** I should see an Error new_password and new_password_confirm are not they same