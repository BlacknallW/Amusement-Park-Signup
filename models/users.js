const db = require("./conn");
const bcrypt = require("bcryptjs");

class User {
    constructor(first_name, last_name, email_address, password) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.email_address = email_address;
        this.password = password;
    }

    checkPassword(hashedPassword) {
        return bcrypt.compareSync(this.password, hashedPassword);
    }

    async login() {
        try {
            const response = await db.one(`SELECT id, first_name, last_name, password FROM users WHERE email = $1;`,
            [this.email_address]);
            const isValid = this.checkPassword(response.password);
            if (!!isValid) {
                //If response is true, destructures response to get user id, first name, and last name
                const {id, first_name, last_name} = response;
                //Sends that information to server
                return {isValid, id, first_name, last_name};
            } else {
                //Otherwise returns false
                return {isValid};
            }
        } catch(err) {
            return err.message
        }
    }

    async save() {
        try {
        const response = await db.one(`INSERT INTO users(first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id;`, [this.first_name, this.last_name, this. email_address, this.password]);
        return response;
        } catch(err) {
            return err.message
        }
    }
}

module.exports = User;
