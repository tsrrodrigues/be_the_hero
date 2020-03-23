const express = require('express');

const app = express();

app.get('/', (requst, response) => {
    return response.json({
        evento: "Semana Omnistack 11.0",
        aluno: "Tiago Samuel"
    });
});

app.listen(3333);