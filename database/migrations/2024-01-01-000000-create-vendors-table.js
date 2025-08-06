'use strict';

module.exports = {
  async up(knex) {
    console.log('🔄 Checking vendors table...');
    
    // Check if vendors table already exists
    const tableExists = await knex.schema.hasTable('vendors');
    
    if (tableExists) {
      console.log('✅ Vendors table already exists, skipping creation');
      return;
    }
    
    console.log('🔄 Creating vendors table...');
    
    // Create vendors table
    await knex.schema.createTable('vendors', (table) => {
      table.increments('id').primary();
      table.string('name', 100).notNullable();
      table.string('company', 100).notNullable();
      table.string('location', 100).notNullable();
      table.enum('status', ['active', 'inactive', 'pending']).defaultTo('pending');
      table.text('description');
      table.json('services');
      table.json('specialties');
      table.string('image', 255);
      table.string('email', 255).notNullable().unique();
      table.string('phone', 20).notNullable();
      table.text('address').notNullable();
      table.decimal('rating', 3, 2).defaultTo(0);
      table.integer('reviews_count').defaultTo(0);
      table.string('website', 255);
      table.json('social_media');
      table.json('business_hours');
      table.json('pricing');
      table.timestamps(true, true);
      table.timestamp('published_at').nullable();
    });

    // Create indexes for better performance
    await knex.schema.raw('CREATE INDEX idx_vendors_status ON vendors(status)');
    await knex.schema.raw('CREATE INDEX idx_vendors_location ON vendors(location)');
    await knex.schema.raw('CREATE INDEX idx_vendors_email ON vendors(email)');
    await knex.schema.raw('CREATE INDEX idx_vendors_rating ON vendors(rating)');
    
    console.log('✅ Vendors table created successfully');
  },

  async down(knex) {
    console.log('🔄 Dropping vendors table...');
    await knex.schema.dropTableIfExists('vendors');
    console.log('✅ Vendors table dropped successfully');
  }
}; 