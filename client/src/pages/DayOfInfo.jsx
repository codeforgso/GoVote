import React from 'react';
import { Link } from 'react-router-dom';

const DayOfInfo = () => (
  <main>

    <h1>It{'\''}s Election Day, What Do I Do?</h1>
      
      <p>That's easy, find your polling place and go vote!</p>

    <h2>What to Expect</h2>
      <p>
        Your polling place, depending on how many people live in your area, is
        likely to have volunteers for candidates - or even the candidates
        themselves - handing out literature at a legally specified distance from
        the entrance. There will also be signs for the candidates on the ballot.
        No one is allowed to advocate for candidates or hand out literature
        inside the polling place.
      </p>

      <p>
        You may have to wait in a short line inside the polling place. At the
        front of the line will be a table with greeters who will take your name
        and verify your registration status. Beginning in 2020 in North
        Carolina, you will be required to show a valid, state-approved ID to
        vote. Please see <a href="https://www.ncsbe.gov/Voter-ID">this page</a>{" "}
        for more details about which IDs are approved for use and the form you
        can use to request a free North Carolina Voter ID (you must submit this
        form in person at your county Board of Elections office).
      </p>

      <p>
        In Guilford County, voters use electronic voting machines unless they
        request a provisional ballot or curbside voting accommodations. These
        machines are touch screen devices that will present the voter’s ballot
        page by page. As you touch candidate names to select them, the machine
        will record your choices on a piece of paper that looks like a receipt
        visible through a small window on the machine. You may change your
        selections at any point during the process until presented with a final
        screen to confirm the selections.
      </p>

      <p>
        If you need assistance at any time, you can and should request help from
        the individuals working at the polling place. If they refuse to assist
        you, please report this using the resources listed below.
      </p>
    
    <h2>How to Report Issues With Your Polling Place</h2>
      <p>
        Intimidation and harassment at polling places is a violation of federal
        law. Make sure that you{" "}
        <a 
          href="https://www.aclu.org/know-your-rights/voting-rights/" 
          target="_blank"
          rel="noopener noreferrer">
          know your rights
        </a>! If you encounter issues on election day, please utilize one of the
        following resources:
      </p>

      <ul>
        <li>
          U.S. Department of Justice Voting Rights Hotline:{" "}
          <a href="tel:+1800-253-3931">800-253-3931</a>; TTY line{" "}
          <a href="tel:+1877-267-8971">877-267-8971</a>
        </li>
        <li>
          <a 
            href="https://www.ncsbe.gov/voting-accessibility"
            target="_blank"
            rel="noopener noreferrer">
            Department of Justice Election Complaint Report Form
          </a>
        </li>
        <li>
          American Civil Liberties Union Voter Protection Hotline:{" "}
          <a href="tel:+1866-687-8683">1-866-OUR-VOTE (1-866-687-8683)</a> or{" "}
          <a href="tel:+1888-839-8682">1-888-VE-Y-VOTA (1-888-839-8682)</a> (en
          Español).
        </li>
      </ul>

      <h2>Accessibility &amp; Accomodations</h2>

      <p>
        The Help America Vote Act of 2002 stipulated legal requirements for
        accommodations at all polling places nationwide to ensure that every
        voter can easily participate. Accommodations include allowing for
        physical assistance inside the voting booth or curbside voting, in which
        polling place volunteers help individuals cast a vote from their car.
        You may request these accommodations on Election Day. Please visit
        <a 
          href="https://www.ncsbe.gov/voting/help-voters-disabilities"
          target="_blank"
          rel="noopener noreferrer">
          {" "}this page{" "}
        </a>
         for more details about North Carolina’s voter accessibility
        considerations.
      </p>

    <h2>Polling Place</h2>
      <h4>
        <Link to="/where-and-when">
          Look Up Your Polling Place
        </Link>
      </h4>

  </main>

  );

export default DayOfInfo;
