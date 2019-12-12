const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Produto = new Schema({
    produto_nome: {
        type: String
    },
    produto_valor: {
        type: String
    },
    produto_tam: {
        type: String
    },
    produto_estoq: {
        type: Boolean
    }
});

module.exports = mongoose.model('Produto', Produto);