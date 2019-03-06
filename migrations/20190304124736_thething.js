exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', function(tabble) {
        tabble.increments();
  
        tabble.string('name').notNullable().unique();
  
        tabble.string('password').notNullable();
        
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
  };
  