import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TableRow from './table-row';



export default class ProdutosList extends Component {

    constructor(props) {
        super(props);
        this.state = {produtos: []};
    }
 
    componentDidMount() {
        axios.get('http://localhost:4000/produtos/')
            .then(response => {
                this.setState({produtos: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidUpdate() {
        axios.get('http://localhost:4000/produtos/')
        .then(response => {
            this.setState({produtos: response.data});
        })
        .catch(function (error) {
            console.log(error);
        })   
    }

    produtoList() {
        return this.state.produtos.map(function(currentProduto, i) {
            return <TableRow obj={currentProduto} key={i} />;
        });
    }

    render() {
        return (
            <div>
                <h3>Lista de Produtos</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Valor</th>
                            <th>Tamanho</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.produtoList() }
                    </tbody>
                </table>
            </div>
        )
    }
}