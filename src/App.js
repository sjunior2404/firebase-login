import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Header from "./components/Header";
import TabelaLivros from "./components/TabelaLivros";
import TabelaHome from "./components/TabelaHome";
import CadastrarLivros from "./components/CadastrarLivros";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import SimpleStorage from "react-simple-storage";
import firebase from "./firebase";

class App extends Component {
  state = {
    livros: [],
    isAuthenticated: false,
  };

  inserirLivro = (livro) => {
    livro.id = this.state.livros.length + 1;
    this.setState({
      livros: [...this.state.livros, livro],
    });
  };

  editarLivro = (livro) => {
    const index = this.state.livros.findIndex((p) => p.id === livro.id);
    const livros = this.state.livros
      .slice(0, index)
      .concat(this.state.livros.slice(index + 1));
    const newLivros = [...livros, livro].sort((a, b) => a.id - b.id);
    this.setState({
      livros: newLivros,
    });
  };

  removerLivro = (livro) => {
    if (window.confirm("Remover esse livro?")) {
      const livros = this.state.livros.filter((p) => p.isbn !== livro.isbn);
      this.setState({ livros });
    }
  };

  onLogin = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.setState({ isAuthenticated: true });
      })
      .catch((error) => console.error(error));
  };
  onLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.setState({ isAuthenticated: false });
      })
      .catch((error) => console.error(error));
  };

  render() {
    return (
      <Router>
        <SimpleStorage parent={this} />
        <Header
          isAuthenticated={this.state.isAuthenticated}
          onLogout={this.onLogout}
        />
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              !this.state.isAuthenticated ? (
                <TabelaHome livros={this.state.livros} />
              ) : (
                <TabelaLivros
                  livros={this.state.livros}
                  removerLivro={this.removerLivro}
                />
              )
            }
          />
          <Route
            exact
            path="/cadastrar"
            render={() => (
              <CadastrarLivros
                inserirLivro={this.inserirLivro}
                livro={{ id: 0, isbn: "", titulo: "", autor: "" }}
              />
            )}
          />
          <Route
            exact
            path="/login"
            render={() =>
              !this.state.isAuthenticated ? (
                <Login onLogin={this.onLogin} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            exact
            path="/editar/:isbnLivro"
            render={(props) => {
              const livro = this.state.livros.find(
                (livro) => livro.isbn === props.match.params.isbnLivro
              );
              if (livro) {
                return (
                  <CadastrarLivros
                    editarLivro={this.editarLivro}
                    livro={livro}
                  />
                );
              } else {
                return <Redirect to="/" />;
              }
            }}
          />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;