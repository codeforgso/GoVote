import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h1>Home</h1>
    <ul>
      <li>
        <Link to="/voter-lookup">Voter Registration Lookup</Link>
      </li>
      <li>
        <Link to="/">Placeholder</Link>
      </li>
    </ul>
  </div>
);

module.exports = Home;
