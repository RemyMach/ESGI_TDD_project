const User = require('../src/models/user')
const mongoose = require('mongoose');
const request = require('supertest')
const app = require('../src/app')
const { setupDatabase, user_admin, user_editor } = require('./fixtures/db')
const { role_administrator, role_editor, role_invite } = require('./fixtures/role')


beforeEach(setupDatabase);

describe('Test series User routes', () => {

    describe('Test the creation of a User by an admin', () => {
        it('Test the creation of a User with valid parameters', async () => {
            const response = await request(app).post('/users/admin/create')
            .set('Authorization', `Bearer ${user_admin.tokens[0].token}`)
            .send({
                name: 'remy',
                email: 'remy@example.com',
                password: 'azertyuiopqsdfghjklm',
                age: 18,
                id_role: role_invite._id
            }).expect(201)
            

            // On regarde que la db change correctement
            const user = await User.findById(response.body.user._id)
            expect(user).not.toBeNull()

            // on regarde que la réponse contient bien les éléments attendu
            expect(response.body).toMatchObject({
                user: { 
                    name: 'remy',
                    email: 'remy@example.com',
                    age: 18
                }
            })

            // on vérifie que le password est bien hashé
            expect(user.password).not.toBe('azertyuiopqsdfghjklm!')
        })

        it('Test the creation of a User with a non admin user', async () => {
            const response = await request(app).post('/users/admin/create')
            .set('Authorization', `Bearer ${user_editor.tokens[0].token}`)
            .send({
                name: 'remy',
                email: 'remy@example.com',
                password: 'azertyuiopqsdfghjklm',
                age: 18,
                id_role: role_invite._id
            }).expect(401)
        });
    });
});