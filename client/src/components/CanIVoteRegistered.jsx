import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CanIVoteRegistered = ({ showHeader = false }) => (
  <div>
    { showHeader && <h2>You are registered!</h2>}
    <ListGroup>
      <ListGroupItem><Link to="/where-and-when">See Where &amp; When to Vote</Link></ListGroupItem>
    </ListGroup>
  </div>
);

CanIVoteRegistered.propTypes = {
  showHeader: PropTypes.bool,
};

export default CanIVoteRegistered;
