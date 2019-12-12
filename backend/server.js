const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const produtoRoutes = express.Router();
const PORT = 4000;

let Produto = require('./produto.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/produtos', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("CONECTOU CONGRATS");
})

produtoRoutes.route('/').get(function(req, res) {
    Produto.find(function(err, produtos) {
        if (err) {
            console.log(err);
        } else {
            res.json(produtos);
        }
    });
});

produtoRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Produto.findById(id, function(err, produto) {
        res.json(produto);
    });
});

produtoRoutes.route('/add').post(function(req, res) {
    let produto = new Produto(req.body);
    produto.save()
        .then(produto => {
            res.status(200).json({'produto': 'produto add'});
        })
        .catch(err => {
            res.status(400).send('falha ao add');
        });
});


produtoRoutes.route('/update/:id').post(function(req, res) {
    Produto.findById(req.params.id, function(err, produto) {
        if (!produto)
            res.status(404).send('nao achei o produto');
        else
            produto.produto_nome = req.body.produto_nome;
            produto.produto_valor = req.body.produto_valor;
            produto.produto_tam = req.body.produto_tam;
            produto.produto_estoq = req.body.produto_estoq;

            produto.save().then(produto => {
                res.json('Atualizou');
            })
            .catch(err => {
                res.status(400).send("Não fopi possivel atualizar");
            });
    });
});
produtoRoutes.route('/delete/:id').get(function (req, res) {
    Produto.findByIdAndRemove({_id: req.params.id}, function(err, produto){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});


app.use('/produtos', produtoRoutes);

app.listen(PORT, function() {
    console.log("Server rodando em: " + PORT);
});