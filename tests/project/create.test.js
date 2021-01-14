const Project = require('../../src/models/project.js');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../src/app');
const { setupDatabase, user_admin, user_editor, user_invite } = require('../fixtures/db')


beforeEach(setupDatabase);

describe('test series of project creation', () => {

    describe('Test the creation of a project', () => {
        const data = {
            title: 'toto',
            description: 'toto is toto but is tata',
            administrator: 'toto',
            editor: 'tata',
            invite: 'titi',
        }


        /******************* INVITE ****************** */
        it('Test the creation of a Project with valid parameters as an invite', async () => {
            const response = await request(app).post('/project')
            .set('Authorization', `Bearer ${user_invite.tokens[0].token}`)
            .send(data)
            .expect(201)

                
            // on regarde que la réponse contient bien les éléments attendu
            expect(response.body).toMatchObject(data)
        })

        it('Test the creation of a project with a missing required parameter as an invite', async () => {
            const response = await request(app).post('/project')
            .set('Authorization', `Bearer ${user_invite.tokens[0].token}`)
            .send({
                title: 'toto',
                administrator: 'toto',
                editor: 'tata',
                invite: 'titi',
            }).expect(400)
        })

        it('Test the creation of a project with a parameter that doesn\'t exist in the Schema as an invite', async () => {
            const response = await request(app).post('/project')
            .set('Authorization', `Bearer ${user_invite.tokens[0].token}`)
            .send({
                title: 'toto',
                description: 'toto is toto but is tata',
                administrator: 'toto',
                editor: 'tata',
                invite: 'titi',
                link: 'isFake',
            }).expect(400)
        })

        /******************* EDITOR ****************** */
        it('Test the creation of a Project with valid parameters as an editor', async () => {
            const response = await request(app).post('/project')
            .set('Authorization', `Bearer ${user_editor.tokens[0].token}`)
            .send(data)
            .expect(201)

                
            // on regarde que la réponse contient bien les éléments attendu
            expect(response.body).toMatchObject(data)
        })

        it('Test the creation of a project with a missing required parameter as an editor', async () => {
            const response = await request(app).post('/project')
            .set('Authorization', `Bearer ${user_editor.tokens[0].token}`)
            .send({
                title: 'toto',
                administrator: 'toto',
                editor: 'tata',
                invite: 'titi',
            }).expect(400)
        })

        it('Test the creation of a project with a parameter that doesn\'t exist in the Schema as an editor', async () => {
            const response = await request(app).post('/project')
            .set('Authorization', `Bearer ${user_editor.tokens[0].token}`)
            .send({
                title: 'toto',
                description: 'toto is toto but is tata',
                administrator: 'toto',
                editor: 'tata',
                invite: 'titi',
                link: 'isFake',
            }).expect(400)
        })


        /******************* ADMIN ****************** */
        it('Test the creation of a Project with valid parameters as an admin', async () => {
            const response = await request(app).post('/project')
            .set('Authorization', `Bearer ${user_admin.tokens[0].token}`)
            .send(data)
            .expect(201)

                
            // on regarde que la réponse contient bien les éléments attendu
            expect(response.body).toMatchObject(data)
        })

        it('Test the creation of a project with a missing required parameter as an admin', async () => {
            const response = await request(app).post('/project')
            .set('Authorization', `Bearer ${user_admin.tokens[0].token}`)
            .send({
                title: 'toto',
                administrator: 'toto',
                editor: 'tata',
                invite: 'titi',
            }).expect(400)
        })

        it('Test the creation of a project with a parameter that doesn\'t exist in the Schema as an admin', async () => {
            const response = await request(app).post('/project')
            .set('Authorization', `Bearer ${user_admin.tokens[0].token}`)
            .send({
                title: 'toto',
                description: 'toto is toto but is tata',
                administrator: 'toto',
                editor: 'tata',
                invite: 'titi',
                link: 'isFake',
            }).expect(400)
        })
    });
});