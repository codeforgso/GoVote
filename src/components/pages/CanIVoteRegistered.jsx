import React from 'react';
import { Link } from 'react-router-dom';

const CanIVoteRegistered = () => (
  <div>
    <h2>You are registered!</h2>
    <ul>
      <li><Link to="/where-and-when">See Where &amp; When to Vote</Link></li>
      <li><Link to="/candidates">See who the candidates are</Link></li>
    </ul>
  </div>
);

export default CanIVoteRegistered;
