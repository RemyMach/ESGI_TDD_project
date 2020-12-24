const User = require('../src/models/user')
const mongoose = require('mongoose');
const request = require('supertest')
const app = require('../src/app')
const { setupDatabase } = require('./fixtures/db')
const { role_administrator, role_editor, role_invite } = require('./fixtures/role')

beforeEach(setupDatabase);


describe('Test User Update routes', () => {

    describe('Test user update password', () => {


    });

});