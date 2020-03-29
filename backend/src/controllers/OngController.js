const connection = require('../database/connection');
const crypto = require('crypto');
const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {
    async list (request, response) {
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },

    async create (request, response) {
        const { name, email, password, whatsapp, city, uf } = request.body;

        const id = generateUniqueId();
        
        await connection('ongs').insert({
            id,
            name,
            email,
            password,
            whatsapp,
            city,
            uf,
        });

        return response.json({ id, name });
    },

    async delete (request, response) {
        const ong_id = request.headers.authorization;

        const ong = await connection('ongs')
            .where('id', ong_id)
            .select('id')
            .first();

            if (ong.id !== ong_id)
                return response.status(401).json({ error: 'Operation not permitted' });

        connection.select().from('incidents').where('ong_id', ong.id).clearWhere();

        await connection('ongs').where('id', ong.id).del();

        return response.status(204).send();
    }
};