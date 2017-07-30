import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import renderHTML from 'react-render-html';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
import * as contentActions from '../actions/contentActions';

class Main extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.params !== nextProps.params) {
      this.props.actions.loadMainContent(nextProps.params);
    }
  }

  render() {
    const data = this.props.content;

    return (
      <div>
        <Header data={data} />
        <Row>
          <Col md={2}></Col>
          <Col xs={12} md={8}>
            <div className="content-body">
              {data.common.description.map((element, idx) =>
                <div key={idx}>
                  {renderHTML(element)}
                </div>
              )}
            </div>
          </Col>
          <Col md={2}></Col>
        </Row>
        <Footer />
      </div>
    );
  }
}

Main.propTypes = {
  content: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  params: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    content: state.content,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(contentActions, dispatch),
  };
}

// Connect function from react-redux function allows components to interact with redux.
// These components are called 'container components'.
// Connect returns a function that is called immediately with the 'App' parameter.
export default connect(mapStateToProps, mapDispatchToProps)(Main);
