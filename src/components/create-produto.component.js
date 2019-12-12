import React, {Component} from 'react';
import axios from 'axios';

export default class CreateProduto extends Component {

    constructor(props) {
        super(props);

        this.onChangeProdutoDescription = this.onChangeProdutoDescription.bind(this);
        this.onChangeProdutoResponsible = this.onChangeProdutoResponsible.bind(this);
        this.onChangeProdutoPriority = this.onChangeProdutoPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            produto_nome: '',
            produto_valor: '',
            produto_tam: '',
            produto_estoq: false
        }
    }

    onChangeProdutoDescription(e) {
        this.setState({
            produto_nome: e.target.value
        });
    }

    onChangeProdutoResponsible(e) {
        this.setState({
            produto_valor: e.target.value
        });
    }

    onChangeProdutoPriority(e) {
        this.setState({
            produto_tam: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(`Formulário do Produto:`);
        console.log(`Nome: ${this.state.produto_nome}`);
        console.log(`Valor: ${this.state.produto_valor}`);
        console.log(`Tamanho: ${this.state.produto_tam}`);
        console.log(`Estoque Vazio?: ${this.state.produto_estoq}`);

        const newProduto = {
            produto_nome: this.state.produto_nome,
            produto_valor: this.state.produto_valor,
            produto_tam: this.state.produto_tam,
            produto_estoq: this.state.produto_estoq
        }

        axios.post('http://localhost:4000/produtos/add', newProduto)
            .then(res => console.log(res.data));

        this.setState({
            produto_nome: '',
            produto_valor: '',
            produto_tam: '',
            produto_estoq: false
        })
    }

    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3>Adicionar Produto</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Nome: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.produto_nome}
                                onChange={this.onChangeProdutoDescription}
                                />
                    </div>
                    <div className="form-group">
                        <label>Valor: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.produto_valor}
                                onChange={this.onChangeProdutoResponsible}
                                />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityLow"
                                    value="Low"
                                    checked={this.state.produto_tam==='Low'}
                                    onChange={this.onChangeProdutoPriority}
                                    />
                            <label className="form-check-label">Pequeno</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityMedium"
                                    value="Medium"
                                    checked={this.state.produto_tam==='Medium'}
                                    onChange={this.onChangeProdutoPriority}
                                    />
                            <label className="form-check-label">Médio</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityHigh"
                                    value="High"
                                    checked={this.state.produto_tam==='High'}
                                    onChange={this.onChangeProdutoPriority}
                                    />
                            <label className="form-check-label">Grande</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Adicionar Produto" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}