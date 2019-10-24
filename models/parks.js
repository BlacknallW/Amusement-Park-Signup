const db = require("./conn");

class Parks {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.picture = picture;
    }

    static async getAll() {
        try {
            const response = await db.any(`select * from parks;`);
            return response;
        } catch (err) {
            return err.message;
        }
    }

    static async getById(id) {
        try {
            const response = await db.one(
                `SELECT * FROM parks WHERE id = $1;`,
                [id]
            );
            return response;
        } catch (err) {
            return err.message;
        }
    }
}

module.exports = Parks;
