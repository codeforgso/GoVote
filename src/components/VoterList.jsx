import React from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const VoterList = ({ voterList = [], returnSelectedVoter }) => (
  <div>
    { voterList.length > 0 && <h3>Verify Your Address:</h3> }
    <ButtonGroup vertical>
      {
        voterList.map(el => (
          <Button name="voterAddressGroup" key={el.voter_reg_num} onClick={() => returnSelectedVoter(el)} >
            {el.resident_address}
          </Button>
        ))
      }
      { voterList.length > 0 && <Link to="/voter-requirements"><Button name="notMyAddress">{'I DON\'T SEE MY ADDRESS'}</Button></Link> }
    </ButtonGroup>
  </div>
);

VoterList.propTypes = {
  voterList: PropTypes.array.isRequired,
  returnSelectedVoter: PropTypes.func.isRequired,
};

export default VoterList;
