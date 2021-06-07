import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  retrieveClassifieds,
  findClassifiedsByTitle,
  deleteAllClassifieds,
} from '../actions/classifieds';
import { Link } from 'react-router-dom';

class ClassifiedsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveClassified = this.setActiveClassified.bind(this);
    this.findByTitle = this.findByTitle.bind(this);
    this.removeAllClassifieds = this.removeAllClassifieds.bind(this);

    this.state = {
      currentClassified: null,
      currentIndex: -1,
      searchTitle: '',
    };
  }

  componentDidMount() {
    this.props.retrieveClassifieds();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle,
    });
  }

  refreshData() {
    this.setState({
      currentClassified: null,
      currentIndex: -1,
    });
  }

  setActiveClassified(classified, index) {
    this.setState({
      currentClassified: classified,
      currentIndex: index,
    });
  }

  removeAllClassifieds() {
    this.props
      .deleteAllClassifieds()
      .then((response) => {
        console.log(response);
        this.refreshData();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  findByTitle() {
    this.refreshData();

    this.props.findClassifiedsByTitle(this.state.searchTitle);
  }

  render() {
    const { searchTitle, currentClassified, currentIndex } = this.state;
    const { classifieds } = this.props;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.findByTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Classifieds List</h4>

          <ul className="list-group">
            {classifieds &&
              classifieds.map((classified, index) => (
                <li
                  className={
                    'list-group-item ' +
                    (index === currentIndex ? 'active' : '')
                  }
                  onClick={() => this.setActiveClassified(classified, index)}
                  key={index}
                >
                  {classified.title}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentClassified ? (
            <div>
              <h4>Classified</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{' '}
                {currentClassified.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{' '}
                {currentClassified.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{' '}
                {currentClassified.published ? 'Published' : 'Pending'}
              </div>

              <Link
                to={'/classifieds/' + currentClassified.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Classified...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    classifieds: state.classifieds,
  };
};

export default connect(mapStateToProps, {
  retrieveClassifieds,
  findClassifiedsByTitle,
  deleteAllClassifieds,
})(ClassifiedsList);
