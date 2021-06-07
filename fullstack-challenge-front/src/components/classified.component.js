import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateClassified, deleteClassified } from '../actions/classifieds';
import ClassifiedDataService from '../services/classified.service';

class Classified extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getClassified = this.getClassified.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removeClassified = this.removeClassified.bind(this);

    this.state = {
      currentClassified: {
        id: null,
        title: '',
        description: '',
        published: false,
      },
      message: '',
    };
  }

  componentDidMount() {
    this.getClassified(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentClassified: {
          ...prevState.currentClassified,
          title: title,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentClassified: {
        ...prevState.currentClassified,
        description: description,
      },
    }));
  }

  getClassified(id) {
    ClassifiedDataService.get(id)
      .then((response) => {
        this.setState({
          currentClassified: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateStatus(status) {
    var data = {
      id: this.state.currentClassified.id,
      title: this.state.currentClassified.title,
      description: this.state.currentClassified.description,
      published: status,
    };

    this.props
      .updateClassified(this.state.currentClassified.id, data)
      .then((reponse) => {
        console.log(reponse);

        this.setState((prevState) => ({
          currentClassified: {
            ...prevState.currentClassified,
            published: status,
          },
        }));

        this.setState({ message: 'The status was updated successfully!' });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateContent() {
    this.props
      .updateClassified(
        this.state.currentClassified.id,
        this.state.currentClassified,
      )
      .then((reponse) => {
        console.log(reponse);

        this.setState({ message: 'The classified was updated successfully!' });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removeClassified() {
    this.props
      .deleteClassified(this.state.currentClassified.id)
      .then(() => {
        this.props.history.push('/classifieds');
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentClassified } = this.state;

    return (
      <div>
        {currentClassified ? (
          <div className="edit-form">
            <h4>Classified</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentClassified.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentClassified.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentClassified.published ? 'Published' : 'Pending'}
              </div>
            </form>

            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Classified...</p>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { updateClassified, deleteClassified })(
  Classified,
);
