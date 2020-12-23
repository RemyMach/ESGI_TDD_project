const User = require('../src/models/user')
const mongoose = require('mongoose');
const request = require('supertest')
const app = require('../src/app')
const { user_admin, user_editor, user_invite, setupDatabase } = require('./fixtures/db')
const { role_administrator, role_editor, role_invite } = require('./fixtures/role')


beforeEach(setupDatabase);

describe('Test series User routes', () => {

    describe('Test the login of a User', () => {
        it('Test the login of an existing user', async () => {
            const response = await request(app).post('/users/login').send({
                email: user_invite.email,
                password: user_invite.password
            }).expect(200)

            const user = await User.findById(user_invite._id)
            expect(response.body.token).toBe(user.tokens[1].token)
        })

        it('Test The email login is incorrect', async () => {
            const response = await request(app).post('/users/login').send({
                email: "patapouf@email.com",
                password: user_invite.password
            }).expect(400)
        })

        it('Test The password is incorect for the email', async () => {
            const response = await request(app).post('/users/login').send({
                email: user_invite.email,
                password: "jesuisunetarte"
            }).expect(400)
        })

        it('Test an invalid parameter is passed to the request', async () => {
            const response = await request(app).post('/users/login').send({
                email: user_invite.email,
                password: user_invite.password,
                otherParameter: "hello"
            }).expect(200)

            const user = await User.findById(user_invite._id)
            expect(response.body.token).toBe(user.tokens[1].token)
        })

        it('Test a parameter is missing in the route', async () => {
            const response = await request(app).post('/users/login').send({
                email: user_invite.email,
            }).expect(400)
        })
    });
});