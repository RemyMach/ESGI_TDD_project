const User = require('../src/models/user')
const mongoose = require('mongoose');
const request = require('supertest')
const app = require('../src/app')
const { setupDatabase } = require('./fixtures/db')
const { role_administrator, role_editor, role_invite } = require('./fixtures/role')

//beforeEach test dans le fichier ou afterEach aussi 
// on met done en paramètre où alors on utilise async et await pour bien attendre l'éxécution
// de la fonction
beforeEach(setupDatabase);


describe('Test series User routes', () => {

    describe('Test the creation of a User', () => {

        it('Test the creation of a User with valid parameters', async () => {
            const response = await request(app).post('/users').send({
                name: 'Andrew',
                email: 'andrew@example.com',
                password: 'MyPass777!',
            }).expect(201)
        })

        it('Test the creation of a User with a missing required parameter', async () => {
            const response = await request(app).post('/users').send({
                name: 'Andrew',
                password: 'MyPass777!',
            }).expect(400)
        })

        it('Test the creation of a User with a parameter that doesn\'t exist in the Schema', async () => {
            const response = await request(app).post('/users').send({
                name: 'Andrew',
                email: 'andrew@example.com',
                password: 'MyPass777!',
                adresse: 'a street',
                age: 12,
            }).expect(201)
        })

        it('Test the creation of a User with a non valid email', async () => {
            const response = await request(app).post('/users').send({
                name: 'Andrew',
                email: 'andrewPomme.com',
                password: 'MyPass777!',
                age: 12,
            }).expect(400)
        })

        it('Test the creation of a User with a role that you can\'t past in the parameters', async () => {
            const response = await request(app).post('/users').send({
                name: 'Andrew',
                email: 'andrew@example.com',
                password: 'MyPass777!',
                age: 12,
                id_role: role_editor._id
            }).expect(400)
        })

        it('Test the creation of a User with a User already exiting in the mongodb databse', async () => {
            const response = await request(app).post('/users').send({
                name: 'Andrew',
                email: 'pomme@example.com',
                password: 'MyPass777!',
                age: 12,
            }).expect(400)
        })
    });
});