import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import CreateProduto from "./components/create-produto.component";
import EditProduto from "./components/edit-produto.component";
import ProdutosList from "./components/produtos-list.component";

import logo from "./logo.png";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <img src={logo} width="30" height="30"/>
            <Link to="/" className="navbar-brand">CRUD MongoDB</Link>
            <div className="collpase nav-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/" className="nav-link">Produtos</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link">Adicionar Produto</Link>
                </li>
              </ul>
            </div>
          </nav>

          <Route path="/" exact component={ProdutosList} />
          <Route path="/edit/:id" component={EditProduto} />
          <Route path="/create" component={CreateProduto} />
        </div>
      </Router>
    );
  }
}

export default App;
