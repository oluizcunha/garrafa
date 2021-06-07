import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  retrieveClassifieds,
  findClassifiedsByTitle,
  deleteAllClassifieds,
} from '../actions/classifieds';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './classifieds-list.component.css';

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
      <div className="cards">
        {classifieds &&
          classifieds.map((classified, index) => (
            <Card className="card">
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {classified.title}
                </Typography>
                <Typography color="textSecondary">{classified.date}</Typography>
                <Typography variant="body2" component="p">
                  {classified.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
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
