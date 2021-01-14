const Project = require('../../src/models/project.js');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../src/app');
const { setupDatabase, user_admin, user_editor, user_invite } = require('../fixtures/db')


beforeEach(setupDatabase);


describe('Test series to update a project', () => {

    const data = {
        title: 'lala',
        description: 'toto is edited to lala',
        administrator: 'toutou',
        editor: 'tautau',
        invite: 'tiutiu',
    }

    /******************* INVITE ****************** */
    it('The invite asks to update a project.', async () => {
        const response = await request(app).get('/project/' + Project._id)
            .set('Authorization', `Bearer ${user_invite.tokens[0].token}`)
            .send(data)
            .expect(400)
    });

    /******************* EDITOR ****************** */
    it('The editor asks to update a project.', async () => {
        const response = await request(app).get('/project/' + Project._id)
            .set('Authorization', `Bearer ${user_editor.tokens[0].token}`)
            .send(data)
            .expect(400)
    });


   

    /******************* ADMIN ****************** */
    it('The admin asks to update a project.', async () => {
        const response = await request(app).get('/project/' + Project._id)
            .set('Authorization', `Bearer ${user_admin.tokens[0].token}`)
            .send(data)
            .expect(200)

            // on regarde que la réponse contient bien les éléments attendu
            expect(response.body).toMatchObject(data)
            .expect(200)
    });


});