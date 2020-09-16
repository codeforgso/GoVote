import React from 'react';
import Iframe from 'react-iframe';

const EarlyVotingIFrame = () => (
  <Iframe url="https://www.google.com/maps/d/embed?mid=1gqVAS4N-hUOhVB-WqTBEiovUv9wPavlS&hl=en"
          width="100%"
          height="640px"
          id="early-voting-iframe"
          className="early-voting-iframe"
          display="initial"
          position="relative"/>
);
export default EarlyVotingIFrame;
