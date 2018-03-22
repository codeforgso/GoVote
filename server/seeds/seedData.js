
exports.seed = knex =>
  // Deletes ALL existing entries
   knex('guilfordvoters').del()
    .then(() =>
      // Inserts seed entries
       knex('guilfordvoters').insert([
        { voter_reg_num: '1', county_desc: 'GUILFORD', county_id: '41', status_cd: 'A', voter_status_desc: 'ACTIVE', reason_cd: 'AV', voter_status_reason_desc: 'VERIFIED', first_name: 'Leslie', last_name: 'Knope' },
        { voter_reg_num: '2', county_desc: 'GUILFORD', county_id: '41', status_cd: 'R', voter_status_desc: 'REMOVED', reason_cd: 'RL', voter_status_reason_desc: 'DECEASED', first_name: 'Anne', last_name: 'Perkins' },
        { voter_reg_num: '3', county_desc: 'GUILFORD', county_id: '41', status_cd: 'I', voter_status_desc: 'INACTIVE', reason_cd: 'IN', voter_status_reason_desc: 'CONFIRMATION NOT RETURNED', first_name: 'Ron', last_name: 'Swanson' },
       ]));
