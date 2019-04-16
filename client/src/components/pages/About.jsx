import React from 'react';
import { Thumbnail } from 'react-bootstrap';
import cfgLogo from '../../static/CfGLogoWhite.png';

const About = () => (
  <div>
    <h1>About Code for Greensboro</h1>
    <div>
      <h4>Code for Greensboro works to improve the way our community uses its data and the web.  And we need <strong>you</strong>—no coding required.</h4>
      <br />
      <p>We are a local 501(c)(3) organization affiliated with the Code for America Brigade program.
          Code for America brigades are volunteer civic tech communities that collaborate with local government and community partners to build open source technology websites, and tools.
          These projects provide greater access to, or augment existing government services, and otherwise help with local civic issues.
          Code for America supports Brigade chapters with resources, tools, and access to the wider civic technology movement.</p>
      <p>We are developers, designers, data nerds, civically - minded people, and residents — in other words, we are this community.
          We want to use this network and these talents to help local government, and the community create positive impact through technology.</p>
    </div>
    <footer>
      <Thumbnail href="http://codeforgreensboro.org" target="_blank" src={cfgLogo} className="logo about-footer-logo" />
    </footer>
  </div>
  );

export default About;

