const User = require('../src/models/user')
const mongoose = require('mongoose');
const request = require('supertest')
const app = require('../src/app')
const { user_admin, user_editor, user_invite, setupDatabase } = require('./fixtures/db')
const { role_administrator, role_editor, role_invite } = require('./fixtures/role')


beforeEach(setupDatabase);

describe('Test series User routes', () => {

    describe('Test the login of a User', () => {
        test('Should get profile for user', async () => {

            await request(app)
                .get('/users/me')
                .set('Authorization', `Bearer ${user_invite.tokens[0].token}`)
                .send()
                .expect(200)
        })
    });
});