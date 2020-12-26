const User = require('../../src/models/user')
const mongoose = require('mongoose');
const request = require('supertest')
const app = require('../../src/app')
const { user_admin, user_editor, user_invite, setupDatabase } = require('../fixtures/db')
const { role_administrator, role_editor, role_invite } = require('../fixtures/role')


beforeEach(setupDatabase);

describe('Test series User routes', () => {

    describe('Test the login of a User', () => {
        it('Test the login of an existing user', async () => {
            const response = await request(app).post('/users/login').send({
                email: user_invite.email,
                password: user_invite.password
            }).expect(200)

            const user = await User.findById(user_invite._id)
            const index_last_token = user.tokens.length - 1;

            expect(response.body.token).toBe(user.tokens[index_last_token].token)
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
            const index_last_token = user.tokens.length - 1;
            expect(response.body.token).toBe(user.tokens[index_last_token].token)
        })

        it('Test the parameter password is missing', async () => {
            const response = await request(app).post('/users/login').send({
                email: user_invite.email,
            }).expect(400)
        })

        it('Test the parameter email is missing', async () => {
            const response = await request(app).post('/users/login').send({
                password: user_invite.password,
            }).expect(400)
        })
    });


    describe('Test the logout of a User', () => {

        it('Test The user give the good auth token to disconnect', async () => {
            const response = await request(app)
                .get('/users/logout')
                .set('Authorization', `Bearer ${user_invite.tokens[0].token}`)
                .send()
                .expect(200)

                const user = await User.findById(user_invite._id)
                user.tokens.forEach(ElementToken => {
                    expect(ElementToken.token).not.toBe(user.tokens[0].token)
                });
        })

        it('The token doesn\'t exist', async () => {
            const response = await request(app)
                .get('/users/logout')
                .set('Authorization', `Bearer 73899EU839E9`)
                .send()
                .expect(401)
        })

        it('No token is provide', async () => {
            const response = await request(app)
                .get('/users/logout')
                .send()
                .expect(401)
        })

    });
});