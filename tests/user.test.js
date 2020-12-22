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


describe('Test series for models/User.js', () => {
   
    describe('Test the userSchema.js', () => {
        test('Test d\'ajout d\'un utilisateur', () => {
            const result = 6;
            expect(result).toEqual(6);
        })
    });

});