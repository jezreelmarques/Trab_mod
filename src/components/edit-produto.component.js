import React, {Component} from 'react';
import axios from 'axios';

export default class EditProduto extends Component {

    constructor(props) {
        super(props);

        this.onChangeProdutoDescription = this.onChangeProdutoDescription.bind(this);
        this.onChangeProdutoResponsible = this.onChangeProdutoResponsible.bind(this);
        this.onChangeProdutoPriority = this.onChangeProdutoPriority.bind(this);
        this.onChangeProdutoCompleted = this.onChangeProdutoCompleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            produto_nome: '',
            produto_valor: '',
            produto_tam: '',
            produto_estoq: false
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/produtos/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    produto_nome: response.data.produto_nome,
                    produto_valor: response.data.produto_valor,
                    produto_tam: response.data.produto_tam,
                    produto_estoq: response.data.produto_estoq
                })
            })
            .catch(function(error) {
                console.log(error)
            })
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

    onChangeProdutoCompleted(e) {
        this.setState({
            produto_estoq: !this.state.produto_estoq
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            produto_nome: this.state.produto_nome,
            produto_valor: this.state.produto_valor,
            produto_tam: this.state.produto_tam,
            produto_estoq: this.state.produto_estoq
        };
        axios.post('http://localhost:4000/produtos/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));

        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <h3>Atualizar Produto</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.produto_nome}
                                onChange={this.onChangeProdutoDescription}
                                />
                    </div>
                    <div className="form-group">
                        <label>Responsible: </label>
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
                        <div className="form-check">
                            <input  type="checkbox"
                                    className="form-check-input"
                                    id="completedCheckbox"
                                    name="completedCheckbox"
                                    onChange={this.onChangeProdutoCompleted}
                                    checked={this.state.produto_estoq}
                                    value={this.state.produto_estoq}
                                    />
                            <label className="form-check-label" htmlFor="completedCheckbox">
                                Estoque Vazio?
                            </label>
                        </div>
                        <br/>
                        <div className="form-group">
                            <input type="submit" value="Atualizar Produto" className="btn btn-primary" />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}