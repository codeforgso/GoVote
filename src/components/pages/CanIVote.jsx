import React from 'react';
import { Button, Row, Col, Well } from 'react-bootstrap';
import { Link, Route } from 'react-router-dom';
import VoterRequirements from './VoterRequirements';
import CanIVoteCheckStatus from './CanIVoteCheckStatus';
import CanIVoteRegistered from './CanIVoteRegistered.jsx';

const CanIVote = () => (
  <div>
    { /* <h1>Can I Vote?</h1> */ }
    <Well>
      <h1>Are you registered to vote?</h1>
      <Row>
        <Col md={4} sm={4} xs={4}>
          <Link to="/can-i-vote/registered"><Button>Yes, I am registered</Button></Link>
        </Col>
        <Col md={4} sm={4} xs={4}>
          { /* Show links to candidates and where vote */}
          <Link to="/can-i-vote/voter-requirements"><Button>No, I am not registered</Button></Link>
        </Col>
        <Col md={4} sm={4} xs={4}>
          <Link to="/can-i-vote/voter-status"><Button>I am not sure </Button></Link>
        </Col>
      </Row>
    </Well>
    <Route path="/can-i-vote/registered" component={CanIVoteRegistered} />
    <Route path="/can-i-vote/voter-requirements" component={VoterRequirements} />
    <Route path="/can-i-vote/voter-status" component={CanIVoteCheckStatus} />
  </div>
);

export default CanIVote;
