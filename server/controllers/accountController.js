const Account = require("../modals/accountModal");
const { getAll, createOne } = require("./handlerFactory");

exports.getAccounts = getAll(Account)
exports.createNewAccount = createOne(Account)