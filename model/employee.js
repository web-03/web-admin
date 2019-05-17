const employee = function (id, name, account, phoneNumber, place, status) {
    this.id = id;
    this.name = name;
    this.account = account;
    this.phoneNumber = phoneNumber;
    this.place = place;
    this.status = status;
}

module.exports = employee;