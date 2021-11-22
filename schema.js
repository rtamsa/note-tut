const mongoose = require('mongoose');
const { Schema } = mongoose;

const personSchema = new Schema({
    name: {type: String, required: true, default: 'John Doe'},
    age: {type: Number, required: true, default: 18},
    favoriteFoods: {
        type: [String],
        default: ['Ice Cream']
    }
})

let Person = mongoose.model('Person', personSchema);

module.exports = Person;