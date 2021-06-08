import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import {
  retrieveClassifieds,
  findClassifiedsByTitle,
} from '../../actions/classifieds';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './styles.css';

class ClassifiedsList extends Component {
  constructor(props) {
    super(props);
    this.refreshData = this.refreshData.bind(this);

    this.state = {
      currentClassified: null,
      currentIndex: -1,
    };
  }

  componentDidMount() {
    this.props.retrieveClassifieds();
  }

  refreshData() {
    this.setState({
      currentClassified: null,
      currentIndex: -1,
    });
  }

  render() {
    const { classifieds } = this.props;

    return (
      <div>
        <div className="main">
          <h1>Classificados</h1>
          <Link to={'/add'}>
            <button className="btn btn-primary">+ Novo classificado</button>
          </Link>
        </div>
        <div className="cards">
          {classifieds &&
            classifieds.map((classified, index) => (
              <Card className="card">
                <CardContent>
                  <Typography
                    className="title"
                    color="textSecondary"
                    gutterBottom
                  >
                    {classified.title}
                  </Typography>
                  <Typography className="date" color="textSecondary">
                    {classified.date}
                  </Typography>
                  <Typography
                    className="description"
                    variant="body2"
                    component="p"
                  >
                    {classified.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
        </div>
        <div className="footer">
          <p>{classifieds.length} classificados</p>
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
})(ClassifiedsList);
