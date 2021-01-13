const Project = require('../../src/models/project.js');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../src/app');
const { setupDatabase, user_admin, user_editor, user_invite } = require('../fixtures/db')


beforeEach(setupDatabase);


describe('Test series to read projects', () => {

    /******************* INVITE ****************** */
    it('The invite asks to read all the projects.', async () => {
        const response = await request(app).get('/project')
            .set('Authorization', `Bearer ${user_invite.tokens[0].token}`)
            .expect(200)
    });

    it('The invite asks to read one specific project.', async () => {
        const response = await request(app).get('/project' + Project._id)
            .set('Authorization', `Bearer ${user_invite.tokens[0].token}`)
            .expect(200)
    });

    /******************* EDITOR ****************** */
    it('The editor asks to read all the projects.', async () => {
        const response = await request(app).get('/project')
            .set('Authorization', `Bearer ${user_editor.tokens[0].token}`)
            .expect(200)
    });

    it('The editor asks to read one specific project.', async () => {
        const response = await request(app).get('/project/' + Project._id)
            .set('Authorization', `Bearer ${user_editor.tokens[0].token}`)
            .expect(200)
    });

    /******************* ADMIN ****************** */
    it('The admin asks to read all the projects.', async () => {
        const response = await request(app).get('/project')
            .set('Authorization', `Bearer ${user_admin.tokens[0].token}`)
            .expect(200)
    });

    it('The admin asks to read one specific project.', async () => {
        const response = await request(app).get('/project/' + Project._id)
            .set('Authorization', `Bearer ${user_admin.tokens[0].token}`)
            .expect(200)
    });

});