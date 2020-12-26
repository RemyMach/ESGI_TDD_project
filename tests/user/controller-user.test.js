const { verifyNewPasswords } = require("../../src/controllers/user")

describe('Test controllers user function', () => {

    describe('Test verifyNewPasswords function', () => {

        it('The parameter is valid and the passwords are the same', () => {
            
            const new_password = 'pommepomme';
            const new_password_confirm = 'pommepomme';
            const body = {
                new_password,
                new_password_confirm
            }
            expect(verifyNewPasswords(body)).toEqual(true);
        });

        it('The parameter is valid and the passwords are the same but we have one more parameter', () => {
            
            const new_password = 'pommepomme';
            const new_password_confirm = 'pommepomme';
            const name = 'Franck';
            const body = {
                new_password,
                new_password_confirm,
                name
            }
            expect(verifyNewPasswords(body)).toEqual(true);
        });

        it('The parameter body is just a String', () => {
            
            const new_password = 'pommepomme';
            const result = Error("Error the new_password and new_password are not defined or are not String")
            expect( () => {
                verifyNewPasswords(new_password)
            }).toThrow(result)
        });

        it('The parameter body is just an integer', () => {
            
            const new_password = 84;
            const result = Error("Error the new_password and new_password are not defined or are not String")
            expect( () => {
                verifyNewPasswords(new_password)
            }).toThrow(result)
        });

        it('The parameter body is valid but we add an other parameter', () => {
            
            const new_password = 'pommepomme';
            const new_password_confirm = 'pommepomme';
            const body = {
                new_password,
                new_password_confirm
            }
            expect(verifyNewPasswords(body, new_password)).toEqual(true);
        });

        it('An other parameter is add before body', () => {
            
            const new_password = 'pommepomme';
            const new_password_confirm = 'pommepomme';
            const body = {
                new_password,
                new_password_confirm
            }
            const result = Error("Error the new_password and new_password are not defined or are not String")
            expect( () => {
                verifyNewPasswords(new_password_confirm, body)
            }).toThrow(result)
        });

        it('the parameter body is valid but new_password and new_password_confirm are empty', () => {
            
            const new_password = "";
            const new_password_confirm = "";
            const body = {
                new_password,
                new_password_confirm
            }
            expect(verifyNewPasswords(body)).toEqual(true);
        });

        it('the parameter body is valid but new_password and new_password_confirm are integer', () => {
            
            const new_password = 20;
            const new_password_confirm = 30;
            const body = {
                new_password,
                new_password_confirm
            }
            const result = Error("Error the new_password and new_password are not defined or are not String")
            expect( () => {
                verifyNewPasswords(new_password_confirm, body)
            }).toThrow(result)
        });

        it('the parameter body is valid but new_password and new_password_confirm are not the same', () => {
            
            const new_password = "pomme";
            const new_password_confirm = "pommepomme";
            const body = {
                new_password,
                new_password_confirm
            }

            const result = Error("Error new_password and new_password_confirm are not they same")
            expect( () => {
                verifyNewPasswords(body)
            }).toThrow(result)
        });
    });

});