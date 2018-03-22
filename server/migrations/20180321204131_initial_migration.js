/* eslint-disable */
exports.up = (knex) => {
  return knex.schema.createTable('guilfordvoters', (table) => {
    table.string('county_id');
    table.string('county_desc');
    table.string('voter_reg_num').notNullable().primary();
    table.string('status_cd');
    table.string('voter_status_desc');
    table.string('reason_cd');
    table.string('voter_status_reason_desc');
    table.string('absent_ind');
    table.string('name_prefix_cd');
    table.string('last_name');
    table.string('first_name');
    table.string('middle_name');
    table.string('name_suffix_lbl');
    table.string('res_street_address');
    table.string('res_city_desc');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('guilfordvoters');
};
