const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const User = require('../models/user');
const { setupDatabase } = require('../../tests/fixtures/db')


mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

/*const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
})
*/
/*onst userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Mike',
    email: 'mike@example.com',
    password: '56 what!!',
    tokens: [{
        token: jwt.sign({ _id: userOneId}, process.env.JWT_SECRET)
    }]
};
const me = new User(userOne);*/
/*const me = new User({
    name: 'Andrew',
    age: 0
})*/

/*User.deleteMany().then(() => {
    me.save().then(() => {
        console.log(me)
    }).catch((error) => {
        console.log('Error!', error)
    })
})*/
