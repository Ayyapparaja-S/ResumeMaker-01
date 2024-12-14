const mongoose = require("mongoose");


const accountSchema = mongoose.Schema({
balance: Number,
loanAmount: Number
})

let Account = mongoose.model('Account', accountSchema)

module.exports = Account;