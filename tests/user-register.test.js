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

            // On regarde que la db change correctement
            const user = await User.findById(response.body.user._id)
            expect(user).not.toBeNull()

            // on regarde que la réponse contient bien les éléments attendu
            expect(response.body).toMatchObject({
                user: { 
                    name: 'andrew',
                    email: 'andrew@example.com',
                    age: 0
                }
            })

            // on vérifie que le password est bien hashé
            expect(user.password).not.toBe('MyPass777!')
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

            // On regarde que la db change correctement
            const user = await User.findById(response.body.user._id)
            expect(user).not.toBeNull()

            // on regarde que la réponse contient bien les éléments attendu
            expect(response.body).toMatchObject({
                user: { 
                    name: 'andrew',
                    email: 'andrew@example.com',
                    age: 12
                }
            })

            // on vérifie que le password est bien hashé
            expect(user.password).not.toBe('MyPass777!')
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

        it('Test the creation of a User with a negative age ', async () => {
            const response = await request(app).post('/users').send({
                name: 'Andrew',
                email: 'andrew@example.com',
                password: 'MyPass777!',
                age: -1,
            }).expect(400)
        })

        it('Test the creation of a User with a password is less than 7 characters ', async () => {
            const response = await request(app).post('/users').send({
                name: 'Andrew',
                email: 'andrew@example.com',
                password: 'pomme',
                age: 10,
            }).expect(400)
        })
    });
});