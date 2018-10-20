import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';

const Candidates = () => (
  <div>
    <h1>Who Are The Candidates?</h1>
    <Jumbotron>
      <p>
        You can find your sample ballot by following the link below and filling out the form
      </p>
      <p>
        <Button bsStyle="primary" href="https://vt.ncsbe.gov/RegLkup/" target="blank">
          Find Your Sample Ballot
        </Button>
      </p>
    </Jumbotron>
  </div>
  );

module.exports = Candidates;
