/***
Migration file for ratings table for the postgres database
***/
exports.up = function(knex) {
  return knex.schema.createTable('ratings', function (table) {
    table.increments();
    table.string('rating_id').index().defaultTo(null);
    table.integer('rating').defaultTo(null);
    table.timestamp('createdAt').defaultTo(knex.fn.now());
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('ratings');
};
