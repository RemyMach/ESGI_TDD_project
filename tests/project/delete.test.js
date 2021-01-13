const Project = require('../../src/models/project.js');
const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../src/app');
const { setupDatabase, user_admin, user_editor, user_invite } = require('../fixtures/db')


beforeEach(setupDatabase);


describe('Test series project deletion', () => {

    it('The author ask to delete one of his projects.', async () => {
        const response = await request(app).delete('/project/' + Project._id)
            .set('Authorization', `Bearer ${user_admin.tokens[0].token}`)
            .expect(200)
            
            // On regarde que le projet n'est plus dans la db
            const project = await Project.findById(Project._id)
            expect(project).toBeNull()
    });

    it('An editor asks to delete a project', async () => {
        const response = await request(app).delete('/project/' + Project._id)
            .set('Authorization', `Bearer ${user_editor.tokens[0].token}`)
            .expect(400)
    });

    it('An invite asks to delete a project', async () => {
        const response = await request(app).delete('/project/' + Project._id)
            .set('Authorization', `Bearer ${user_invite.tokens[0].token}`)
            .expect(400)
    });
});