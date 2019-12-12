import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class TableRow extends Component {

  constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }
    delete() {
        axios.get('http://localhost:4000/produtos/delete/'+this.props.obj._id)
            .then(console.log('Deleted'))
            .catch(err => console.log(err))
    }
  render() {
    return (
       <tr>
        <td className={this.props.obj.produto_estoq ? 'completed' : ''}>{this.props.obj.produto_nome}</td>
        <td className={this.props.obj.produto_estoq ? 'completed' : ''}>{this.props.obj.produto_valor}</td>
        <td className={this.props.obj.produto_estoq ? 'completed' : ''}>{this.props.obj.produto_tam}</td>
        <td>
            <Link className="btn btn-primary" to={"/edit/"+this.props.obj._id}>Editar </Link>
            <button onClick={this.delete} className="btn btn-danger">Apagar</button>
            
           
        </td>
        </tr>

    );
  }
}

export default TableRow;