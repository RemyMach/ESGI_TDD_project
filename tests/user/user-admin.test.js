const User = require('../../src/models/user')
const mongoose = require('mongoose');
const request = require('supertest')
const app = require('../../src/app')
const { setupDatabase, user_admin, user_editor, user_invite } = require('../fixtures/db')
const { role_administrator, role_editor, role_invite } = require('../fixtures/role')


beforeEach(setupDatabase);

describe('Test series User Admin routes', () => {

    describe('Test the creation of a User by an admin', () => {
        it('Test The parameters are the good one with the good format and the route to', async () => {
            const response = await request(app).post('/users/admin/create')
            .set('Authorization', `Bearer ${user_admin.tokens[0].token}`)
            .send({
                name: 'remy',
                email: 'remy@example.com',
                password: 'azertyuiopqsdfghjklm',
                age: 18,
                id_role: role_invite._id
            }).expect(201)
            

            // On regarde que la db change correctement
            const user = await User.findById(response.body.user._id)
            expect(user).not.toBeNull()

            // on regarde que la réponse contient bien les éléments attendu
            expect(response.body).toMatchObject({
                user: { 
                    name: 'remy',
                    email: 'remy@example.com',
                    age: 18
                }
            })

            // on vérifie que le password est bien hashé
            expect(user.password).not.toBe('azertyuiopqsdfghjklm!')
        })

        it('Test the creation of a User with a non admin user', async () => {
            const response = await request(app).post('/users/admin/create')
            .set('Authorization', `Bearer ${user_editor.tokens[0].token}`)
            .send({
                name: 'remy',
                email: 'remy@example.com',
                password: 'azertyuiopqsdfghjklm',
                age: 18,
                id_role: role_invite._id
            }).expect(401)
        });

        it('Test the creation of a User , a parameter required is missing', async () => {
            const response = await request(app).post('/users/admin/create')
            .set('Authorization', `Bearer ${user_admin.tokens[0].token}`)
            .send({
                name: 'remy',
                email: 'remy@example.com',
                age: 18,
                id_role: role_invite._id
            }).expect(400)
        });

        it('Test the creation of a User an invalid parameter is passed to the request', async () => {
            const response = await request(app).post('/users/admin/create')
            .set('Authorization', `Bearer ${user_admin.tokens[0].token}`)
            .send({
                name: 'remy',
                email: 'remy@example.com',
                password: 'azertyuiopqsdfghjklm',
                pomme: 'jeandelapest',
                age: 18,
                id_role: role_invite._id
            }).expect(201)

            // On regarde que la db change correctement
            const user = await User.findById(response.body.user._id)
            expect(user).not.toBeNull()

            // on regarde que la réponse contient bien les éléments attendu
            expect(response.body).toMatchObject({
                user: { 
                    name: 'remy',
                    email: 'remy@example.com',
                    age: 18
                }
            })

            // on vérifie que le password est bien hashé
            expect(user.password).not.toBe('azertyuiopqsdfghjklm!')
        });

        it('Test the creation of a User , an invalid email', async () => {
            const response = await request(app).post('/users/admin/create')
            .set('Authorization', `Bearer ${user_admin.tokens[0].token}`)
            .send({
                name: 'remy',
                email: 'jeandmmpo.com',
                password: 'azertyuiopqsdfghjklm',
                age: 18,
                id_role: role_invite._id
            }).expect(400)
        });

        it('Test the creation of a User , an invalid role', async () => {
            const response = await request(app).post('/users/admin/create')
            .set('Authorization', `Bearer ${user_admin.tokens[0].token}`)
            .send({
                name: 'remy',
                email: 'remy@example.com',
                password: 'azertyuiopqsdfghjklm',
                age: 18,
                id_role: role_administrator._id
            }).expect(400)
        });

        it('Test the creation of a User, an existing user ', async () => {
            const response = await request(app).post('/users/admin/create')
            .set('Authorization', `Bearer ${user_admin.tokens[0].token}`)
            .send({
                name: 'remy',
                email: user_editor.email,
                password: 'azertyuiopqsdfghjklm',
                age: 18,
                id_role: role_administrator._id
            }).expect(400)
        });

        it('Test the creation of a User with a negative age ', async () => {
            const response = await request(app).post('/users/admin/create')
            .set('Authorization', `Bearer ${user_admin.tokens[0].token}`)
            .send({
                name: 'remy',
                email: 'remy@example.com',
                password: 'azertyuiopqsdfghjklm',
                age: -1,
                id_role: role_administrator._id
            }).expect(400)
        });

        it('Test The parameters are the good one with the good format and the route to and with editor role', async () => {
            const response = await request(app).post('/users/admin/create')
            .set('Authorization', `Bearer ${user_admin.tokens[0].token}`)
            .send({
                name: 'remy',
                email: 'remy@example.com',
                password: 'azertyuiopqsdfghjklm',
                age: 18,
                id_role: role_editor._id
            }).expect(201)
            

            // On regarde que la db change correctement
            const user = await User.findById(response.body.user._id)
            expect(user).not.toBeNull()

            expect(user.id_role.toString()).toBe(role_editor._id.toString())

            // on regarde que la réponse contient bien les éléments attendu
            expect(response.body).toMatchObject({
                user: { 
                    name: 'remy',
                    email: 'remy@example.com',
                    age: 18
                }
            })

            // on vérifie que le password est bien hashé
            expect(user.password).not.toBe('azertyuiopqsdfghjklm!')
        });
    });

    describe('Test the delete of a User by an admin', () => {
    
        it('The parameters are the good one with the good format and the route to', async () => {
            const response = await request(app).delete('/users/admin/delete')
            .set('Authorization', `Bearer ${user_admin.tokens[0].token}`)
            .send({
                id_user: user_invite._id,
                password: user_admin.password
            }).expect(200)
            
            // On regarde que l'utilisateur n'est plus dans la db
            const user = await User.findById(user_invite._id)
            expect(user).toBeNull()
        });

        it('The admin password is not valid', async () => {
            const response = await request(app).delete('/users/admin/delete')
            .set('Authorization', `Bearer ${user_admin.tokens[0].token}`)
            .send({
                id_user: user_invite._id,
                password: "dsfsfs"
            }).expect(400)

            // On regarde que la db n'a pas changé
            const user = await User.findById(user_invite._id)
            expect(user).not.toBeNull()
        });

        it('the deleted user is not an editor or an invite', async () => {
            const response = await request(app).delete('/users/admin/delete')
            .set('Authorization', `Bearer ${user_admin.tokens[0].token}`)
            .send({
                id_user: user_admin._id,
                password: user_admin.password
            }).expect(400)

            // On regarde que la db n'a pas changé
            const user = await User.findById(user_invite._id)
            expect(user).not.toBeNull()

        });

        it('The User that try to delete an other user is not an admin', async () => {
            const response = await request(app).delete('/users/admin/delete')
            .set('Authorization', `Bearer ${user_editor.tokens[0].token}`)
            .send({
                id_user: user_invite._id,
                password: user_admin.password
            }).expect(401)

            // On regarde que la db n'a pas changé
            const user = await User.findById(user_invite._id)
            expect(user).not.toBeNull()
        });

        it('The user to be deleted does not exist', async () => {
            const response = await request(app).delete('/users/admin/delete')
            .set('Authorization', `Bearer ${user_admin.tokens[0].token}`)
            .send({
                id_user: "dfdsfdsffdsf87278",
                password: user_admin.password
            }).expect(400)

            // On regarde que la db n'a pas changé
            const user = await User.findById(user_invite._id)
            expect(user).not.toBeNull()
        });

        it('The admin password is missing', async () => {
            const response = await request(app).delete('/users/admin/delete')
            .set('Authorization', `Bearer ${user_admin.tokens[0].token}`)
            .send({
                id_user: user_invite._id,
            }).expect(400)

            // On regarde que la db n'a pas changé
            const user = await User.findById(user_invite._id)
            expect(user).not.toBeNull()
        });

        it('The id user to be deleted is missing', async () => {
            const response = await request(app).delete('/users/admin/delete')
            .set('Authorization', `Bearer ${user_admin.tokens[0].token}`)
            .send({
                password: user_admin.password
            }).expect(400)

            // On regarde que la db n'a pas changé
            const user = await User.findById(user_invite._id)
            expect(user).not.toBeNull()
        });

        it('The id user to be deleted is an editor', async () => {
            const response = await request(app).delete('/users/admin/delete')
            .set('Authorization', `Bearer ${user_admin.tokens[0].token}`)
            .send({
                id_user: user_editor._id,
                password: user_admin.password
            }).expect(200)

            // On regarde que la db n'a pas changé
            const user = await User.findById(user_editor._id)
            expect(user).toBeNull()
        });
    });

    describe('test to update a role of editor or invite user by an admin', () => {
        it('The parameters are the good one with the good format and the route to for an invite user to editor role', async () => {
            
            const response = await request(app).patch('/users/admin/update/role')
            .set('Authorization', `Bearer ${user_admin.tokens[0].token}`)
            .send({
                id_user: user_invite._id,
                id_new_role: role_editor._id,
                password: user_admin.password
            }).expect(200)

            // On regarde que le role dans la db a bien changé
            const user = await User.findById(user_invite._id)
            expect(user.id_role.toString()).toBe(role_editor._id.toString())
        });

        it('The parameters are the good one with the good format and the route to for an editor user to admin role', async () => {
            
            const response = await request(app).patch('/users/admin/update/role')
            .set('Authorization', `Bearer ${user_admin.tokens[0].token}`)
            .send({
                id_user: user_editor._id,
                id_new_role: role_administrator._id,
                password: user_admin.password
            }).expect(200)

            // On regarde que le role dans la db a bien changé
            const user = await User.findById(user_editor._id)
            expect(user.id_role.toString()).toBe(role_administrator._id.toString())
        });

        it('The admin password is not valid', async () => {
            
            const response = await request(app).patch('/users/admin/update/role')
            .set('Authorization', `Bearer ${user_admin.tokens[0].token}`)
            .send({
                id_user: user_editor._id,
                id_new_role: role_administrator._id,
                password: user_editor.password
            }).expect(400)

            // On regarde que le role dans la db n'a pas changé
            const user = await User.findById(user_editor._id)
            expect(user.id_role.toString()).toBe(role_editor._id.toString())
        });

        it('the user to update role is not an editor or an invite', async () => {
            
            const response = await request(app).patch('/users/admin/update/role')
            .set('Authorization', `Bearer ${user_admin.tokens[0].token}`)
            .send({
                id_user: user_admin._id,
                id_new_role: role_invite._id,
                password: user_admin.password
            }).expect(400)

            // On regarde que le role dans la db a bien changé
            const user = await User.findById(user_admin._id)
            expect(user.id_role.toString()).toBe(role_administrator._id.toString())
        });

        it('The User that try to update role of an other user is not an admin', async () => {
            
            const response = await request(app).patch('/users/admin/update/role')
            .set('Authorization', `Bearer ${user_editor.tokens[0].token}`)
            .send({
                id_user: user_invite._id,
                id_new_role: role_invite._id,
                password: user_admin.password
            }).expect(401)

            // On regarde que le role dans la db n'a pas changé
            const user = await User.findById(user_invite._id)
            expect(user.id_role.toString()).toBe(role_invite._id.toString())
        });

        it('The user to be update does not exist', async () => {
            
            const response = await request(app).patch('/users/admin/update/role')
            .set('Authorization', `Bearer ${user_admin.tokens[0].token}`)
            .send({
                id_user: "fsdfdsfkndfkqlsf986576456879",
                id_new_role: role_editor._id,
                password: user_admin.password
            }).expect(400)
        });

        it('The id of the new Role is missing in the parameters of the request', async () => {
            
            const response = await request(app).patch('/users/admin/update/role')
            .set('Authorization', `Bearer ${user_admin.tokens[0].token}`)
            .send({
                id_user: user_invite._id,
                password: user_admin.password
            }).expect(400)

             // On regarde que le role dans la db n'a pas changé
             const user = await User.findById(user_invite._id)
             expect(user.id_role.toString()).toBe(role_invite._id.toString())
        });

        it('The id user to be update is missing in the parameters of the request', async () => {
            
            const response = await request(app).patch('/users/admin/update/role')
            .set('Authorization', `Bearer ${user_admin.tokens[0].token}`)
            .send({
                id_new_role: role_administrator._id,
                password: user_admin.password
            }).expect(400)

             // On regarde que le role dans la db n'a pas changé
             const user = await User.findById(user_invite._id)
             expect(user.id_role.toString()).toBe(role_invite._id.toString())
        });

        it('The password of the admin is missing', async () => {
            
            const response = await request(app).patch('/users/admin/update/role')
            .set('Authorization', `Bearer ${user_admin.tokens[0].token}`)
            .send({
                id_user: user_invite._id,
                id_new_role: role_administrator._id,
            }).expect(400)

             // On regarde que le role dans la db n'a pas changé
             const user = await User.findById(user_invite._id)
             expect(user.id_role.toString()).toBe(role_invite._id.toString())
        });

        it('The password of the admin is not valid', async () => {
            
            const response = await request(app).patch('/users/admin/update/role')
            .set('Authorization', `Bearer ${user_admin.tokens[0].token}`)
            .send({
                id_user: user_invite._id,
                id_new_role: role_editor._id,
                password: "jesuisunchocolat"
            }).expect(400)

            // On regarde que le role dans la db a bien changé
            const user = await User.findById(user_invite._id)
            expect(user.id_role.toString()).toBe(role_invite._id.toString())
        });

        it('The id of the new role is not valid', async () => {
            
            const response = await request(app).patch('/users/admin/update/role')
            .set('Authorization', `Bearer ${user_admin.tokens[0].token}`)
            .send({
                id_user: user_invite._id,
                id_new_role: "sfdsvsdjkcqsnckè!zçe",
                password: user_admin.password
            }).expect(400)

            // On regarde que le role dans la db a bien changé
            const user = await User.findById(user_invite._id)
            expect(user.id_role.toString()).toBe(role_invite._id.toString())
        });
    });
});