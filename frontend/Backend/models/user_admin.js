const mongoose = require('mongoose');

const user_AdminSchema = new mongoose.Schema({
    email: String,
    password: String
})

const user_AdminModel = mongoose.model("user_admins", user_AdminSchema);

module.exports = user_AdminModel;