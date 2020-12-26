const User = require('../../src/models/user')
const mongoose = require('mongoose');
const request = require('supertest')
const app = require('../../src/app')
const { user_invite, setupDatabase } = require('../fixtures/db')
const { role_administrator, role_editor, role_invite } = require('../fixtures/role')
const bcrypt = require('bcryptjs')


beforeEach(setupDatabase);


describe('Test User Update routes', () => {

    describe('Test user update password', () => {

        it('Test with the good parameters', async () => {
            const response = await request(app).patch('/users/password')
            .set('Authorization', `Bearer ${user_invite.tokens[0].token}`)
            .send({
                new_password: 'pommepomme',
                new_password_confirm: 'pommepomme',
                old_password: 'azertyuiop',
            }).expect(200)

            // On regarde que la db a bien changé la password avec le nouveau
            const user = await User.findById(user_invite._id);
            expect(await bcrypt.compare('pommepomme', user.password)).toBe(true);   

            // on vérifie que le password est bien hashé
            expect(user.password).not.toBe('pommepomme')
        });

        it('Test when the old password parameter is not the good one', async () => {
            const response = await request(app).patch('/users/password')
            .set('Authorization', `Bearer ${user_invite.tokens[0].token}`)
            .send({
                new_password: 'pommepomme',
                new_password_confirm: 'pommepomme',
                old_password: 'jean',
            }).expect(400)

            // On regarde que la db n'a pas changé le password
            const user = await User.findById(user_invite._id);
            expect(await bcrypt.compare('azertyuiop', user.password)).toBe(true);   
        });

        it('Test when The user in not authentified with the auth token ', async () => {
            const response = await request(app).patch('/users/password')
            .send({
                new_password: 'pommepomme',
                new_password_confirm: 'pommepomme',
                old_password: 'azertyuiop',
            }).expect(401)
        });

        it('Test when The new password is less than 7 characters ', async () => {
            const response = await request(app).patch('/users/password')
            .set('Authorization', `Bearer ${user_invite.tokens[0].token}`)
            .send({
                new_password: 'jean',
                new_password_confirm: 'jean',
                old_password: 'azertyuiop',
            }).expect(400)

            // On regarde que la db n'a pas changé le password
            const user = await User.findById(user_invite._id);
            expect(await bcrypt.compare('azertyuiop', user.password)).toBe(true); 
        });

        it('Test when The two entry of new password is not the same', async () => {
            const response = await request(app).patch('/users/password')
            .set('Authorization', `Bearer ${user_invite.tokens[0].token}`)
            .send({
                new_password: 'pommepomme',
                new_password_confirm: 'pommepomme!',
                old_password: 'azertyuiop',
            }).expect(400)

            // On regarde que la db n'a pas changé le password
            const user = await User.findById(user_invite._id);
            expect(await bcrypt.compare('azertyuiop', user.password)).toBe(true); 
        });

        it('Test when The parameter new password is missing', async () => {
            const response = await request(app).patch('/users/password')
            .set('Authorization', `Bearer ${user_invite.tokens[0].token}`)
            .send({
                new_password_confirm: 'pommepomme!',
                old_password: 'azertyuiop',
            }).expect(400)

            // On regarde que la db n'a pas changé le password
            const user = await User.findById(user_invite._id);
            expect(await bcrypt.compare('azertyuiop', user.password)).toBe(true); 
        });

        it('Test when The parameter new password confirm is missing', async () => {
            const response = await request(app).patch('/users/password')
            .set('Authorization', `Bearer ${user_invite.tokens[0].token}`)
            .send({
                new_password: 'pommepomme!',
                old_password: 'azertyuiop',
            }).expect(400)

            // On regarde que la db n'a pas changé le password
            const user = await User.findById(user_invite._id);
            expect(await bcrypt.compare('azertyuiop', user.password)).toBe(true); 
        });

        it('Test when The parameter old password is missing', async () => {
            const response = await request(app).patch('/users/password')
            .set('Authorization', `Bearer ${user_invite.tokens[0].token}`)
            .send({
                new_password: 'pommepomme',
                new_password_confirm: 'pommepomme!',
            }).expect(400)

            // On regarde que la db n'a pas changé le password
            const user = await User.findById(user_invite._id);
            expect(await bcrypt.compare('azertyuiop', user.password)).toBe(true); 
        });
    });
});