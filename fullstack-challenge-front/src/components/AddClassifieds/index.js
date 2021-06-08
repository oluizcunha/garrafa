import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createClassified } from '../../actions/classifieds';
import './styles.css';

class AddClassified extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveClassified = this.saveClassified.bind(this);
    this.newClassified = this.newClassified.bind(this);

    this.state = {
      id: null,
      title: '',
      description: '',
      published: false,

      submitted: false,
    };
  }

  onChangeTitle(e) {
    e.preventDefault();
    this.setState({
      title: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  saveClassified(e) {
    e.preventDefault();

    const { title, description } = this.state;

    this.props
      .createClassified(title, description)
      .then((data) => {
        this.setState({
          id: data.id,
          title: data.title,
          description: data.description,
          published: data.published,

          submitted: true,
        });
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newClassified() {
    this.setState({
      id: null,
      title: '',
      description: '',
      published: false,

      submitted: false,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div className="sucess-text">
            <h4>O classificado foi salvo com sucesso!</h4>
            <Link to={'/'}>
              <button className="btn btn-success">Voltar Para Home</button>
            </Link>
            <button className="btn btn-success" onClick={this.newClassified}>
              Adicionar outro
            </button>
          </div>
        ) : (
          <form onSubmit={this.saveClassified}>
            <div className="form-group">
              <label htmlFor="title">Título:</label>
              <br />
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Descrição:</label>
              <br />
              <textarea
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <Link to={'/'}>
              <button className="btn btn-primary">Voltar Para Home</button>
            </Link>
            <button
              disabled={!this.state.description || !this.state.title}
              className="btn btn-success"
            >
              Salvar
            </button>
          </form>
        )}
      </div>
    );
  }
}

export default connect(null, { createClassified })(AddClassified);
