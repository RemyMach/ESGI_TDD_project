const User = require('../../src/models/user')
const mongoose = require('mongoose');
const request = require('supertest')
const app = require('../../src/app')
const { setupDatabase, user_admin, user_editor, user_invite } = require('../fixtures/db')
const { role_administrator, role_editor, role_invite } = require('../fixtures/role')

beforeEach(setupDatabase);

describe('Test series User delete account routes', () => {

    it('The parameters are the good one with the good format and the route to.', async () => {
        const response = await request(app).delete('/users/delete')
            .set('Authorization', `Bearer ${user_invite.tokens[0].token}`)
            .send({
                password: user_invite.password
            }).expect(200)
            
            // On regarde que l'utilisateur n'est plus dans la db
            const user = await User.findById(user_invite._id)
            expect(user).toBeNull()
    });

    it('The password of the user is not the valid one', async () => {
        const response = await request(app).delete('/users/delete')
            .set('Authorization', `Bearer ${user_invite.tokens[0].token}`)
            .send({
                password: user_editor.password
            }).expect(400)
            
            // On regarde que l'utilisateur n'est plus dans la db
            const user = await User.findById(user_invite._id)
            expect(user).not.toBeNull()
    });

    it('The Auth token is not valid', async () => {
        const response = await request(app).delete('/users/delete')
            .set('Authorization', `Bearer sfdsff36723fsd`)
            .send({
                password: user_invite.password
            }).expect(401)
            
            // On regarde que l'utilisateur n'est plus dans la db
            const user = await User.findById(user_invite._id)
            expect(user).not.toBeNull()
    });

    it('The Auth token is missing', async () => {
        const response = await request(app).delete('/users/delete')
            .send({
                password: user_invite.password
            }).expect(401)
            
            // On regarde que l'utilisateur n'est plus dans la db
            const user = await User.findById(user_invite._id)
            expect(user).not.toBeNull()
    });

    it('The password of the user is missing', async () => {
        const response = await request(app).delete('/users/delete')
            .set('Authorization', `Bearer ${user_invite.tokens[0].token}`)
            .send({
            }).expect(400)
            
            // On regarde que l'utilisateur n'est plus dans la db
            const user = await User.findById(user_invite._id)
            expect(user).not.toBeNull()
    });
});