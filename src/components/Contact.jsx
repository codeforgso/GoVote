import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

class Contact extends Component {
  render() {
    return (
      <div>
        <Header data={this.props} />
        <Row>
          <Col md={2}></Col>
          <Col xs={12} md={8}>
            <p>Contact Us</p>
          </Col>
          <Col md={2}></Col>
        </Row>
        <Footer />
      </div>
    );
  }
}

module.exports = Contact;
