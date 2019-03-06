import React from 'react';
import { Link } from 'react-router-dom';

const DayOfInfo = () => (
  <div>
    <h1>It{'\''}s Election Day, What Do I Do?</h1>
    <h2>What to Expect</h2>
    <h2>How to Report Issues With Your Polling Place</h2>
    <h2>Polling Place</h2>
    <Link to="/where-and-when"><p>Look Up Your Polling</p></Link>
  </div>
  );

module.exports = DayOfInfo;
