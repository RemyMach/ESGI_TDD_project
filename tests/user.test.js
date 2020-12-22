const User = require('../src/models/user')
const { userOneId, userOne, setupDatabase } = require('./fixtures/db')

//beforeEach test dans le fichier ou afterEach aussi 
// on met done en paramètre où alors on utilise async et await pour bien attendre l'éxécution
// de la fonction
beforeEach(() => {
    setupDatabase();
})


describe('Test series for models/User.js', () => {

    describe('Test the userSchema.js', () => {
        it('Test d\'ajout d\'un utilisateur', () => {
            console.log(process.env.MONGODB_URL)
            const result = 6;
            expect(result).toEqual(6);
        })
    });

});