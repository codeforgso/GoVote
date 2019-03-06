import React from 'react';
import { Link } from 'react-router-dom';

const DayOfInfo = () => (
  <div>
    <h1>It{'\''}s Election Day, What Do I Do?</h1>
    <h2>What to Expect</h2>
    <h2>How to Report Issues With Your Polling Place</h2>
    <Link to="/where-and-when"><h2>Look Up Your Polling Place</h2></Link>
  </div>
  );

module.exports = DayOfInfo;
