const User = require('../../src/models/user')
const mongoose = require('mongoose');
const request = require('supertest')
const app = require('../../src/app')
const { user_admin, user_editor, user_invite, setupDatabase } = require('../fixtures/db')
const { role_administrator, role_editor, role_invite } = require('../fixtures/role')


beforeEach(setupDatabase);

describe('Test series User list routes', () => {

    describe('Test the listing of the information of a user', () => {
        test('Should get profile for user', async () => {

            const response = await request(app)
                .get('/users/me')
                .set('Authorization', `Bearer ${user_invite.tokens[0].token}`)
                .send()
                .expect(200)
            
            expect(response.body).toMatchObject({
                
                name: 'jane',
                email: 'jane@gmail.com',
                age: 0
            })
        })

        test('The token is not a valid token', async () => {

            const response = await request(app)
                .get('/users/me')
                .set('Authorization', `Bearer 73899EU839E9`)
                .send()
                .expect(401)
        })

        test('No token is not provide', async () => {

            const response = await request(app)
                .get('/users/me')
                .send()
                .expect(401)
        })
    });
});