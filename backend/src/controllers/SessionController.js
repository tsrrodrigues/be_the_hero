const connection = require('../database/connection');

module.exports = {
    async create (request, response) {
        const { email, password } = request.body;

        const ong = await connection('ongs')
        .where({
            email: email,
            password: password
        })
        .select('id', 'name')
        .first();
        console.log(ong);

        if (!ong)
            return response.status(400).json({ error: 'No ONG found with this id'});
    
        return response.json(ong);
    }
};