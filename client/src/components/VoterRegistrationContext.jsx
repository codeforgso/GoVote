import React, { useEffect, useState } from 'react';

export const VoterRegistrationContext = React.createContext();

export function VoterRegistrationProvider({ children }) {
  const VOTER_STORAGE_KEY = 'VoterRegLookupSelectedVoter';

  const [voter, setVoter] = useState(null);
  useEffect(() => {
    if (!voter) {
      const storedVoter = JSON.parse(
        window.sessionStorage.getItem(VOTER_STORAGE_KEY),
      );
      if (storedVoter) setVoter(storedVoter);
    }
  });

  // Returns polling place address as `STREET_NUM STREET_NAME, CITY, STATE, ZIP`
  const formatPollingPlaceAddress = ({
    polling_place_house_num,
    polling_place_street_name,
    polling_place_city,
    polling_place_state,
    polling_place_zip,
  }) =>
    `${polling_place_house_num} ${polling_place_street_name}, ${polling_place_city}, ${polling_place_state}, ${polling_place_zip}`;

  return (
    <VoterRegistrationContext.Provider
      value={{
        voter,
        resetVoter: () => {
          setVoter(null);
          window.sessionStorage.removeItem(VOTER_STORAGE_KEY);
        },
        setVoter: (voter) => {
          voter.formattedPollingPlaceAddress = formatPollingPlaceAddress(voter);
          setVoter(voter);
          window.sessionStorage.setItem(
            VOTER_STORAGE_KEY,
            JSON.stringify(voter),
          );
        },
      }}
    >
      {children}
    </VoterRegistrationContext.Provider>
  );
}
