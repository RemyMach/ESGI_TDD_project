const User = require('../src/models/user')
const mongoose = require('mongoose');
const request = require('supertest')
const app = require('../src/app')
const { setupDatabase } = require('./fixtures/db')
const { role_administrator, role_editor, role_invite } = require('./fixtures/role')


beforeEach(setupDatabase);

describe('Test series User routes', () => {

    describe('Test the login of a User', () => {
        it('Test the creation of a User with valid parameters', async () => {
            const response = await request(app).post('/users').send({
                name: 'Andrew',
                email: 'andrew@example.com',
                password: 'MyPass777!',
            }).expect(201)
        })

    });
});