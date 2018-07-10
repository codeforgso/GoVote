import React from 'react';
import { Link } from 'react-router-dom';
import routes from './routes';

const Home = () => (
  <div>
    <h1>Home</h1>
    <ul>
      {
        routes.map((route, index) => (
          <li key={index}>
            <Link to={route.to}>{route.labelLong ? route.labelLong : route.label}</Link>
          </li>
        )
      )}
      <li>
        <Link to="/voter-lookup">Find Your Voter Registration Status</Link>
      </li>
    </ul>
  </div>
);

module.exports = Home;
