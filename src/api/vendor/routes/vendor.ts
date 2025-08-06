export default {
  routes: [
    // Core CRUD routes
    {
      method: 'GET',
      path: '/vendors',
      handler: 'vendor.find',
      config: {
        auth: false,
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'GET',
      path: '/vendors/:id',
      handler: 'vendor.findOne',
      config: {
        auth: false,
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'POST',
      path: '/vendors',
      handler: 'vendor.create',
      config: {
        auth: false,
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'PUT',
      path: '/vendors/:id',
      handler: 'vendor.update',
      config: {
        auth: false,
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'DELETE',
      path: '/vendors/:id',
      handler: 'vendor.delete',
      config: {
        auth: false,
        policies: [],
        middlewares: []
      }
    },
    // Custom routes for enhanced functionality
    {
      method: 'GET',
      path: '/vendors/active',
      handler: 'vendor.findActive',
      config: {
        auth: false,
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'GET',
      path: '/vendors/search',
      handler: 'vendor.search',
      config: {
        auth: false,
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'GET',
      path: '/vendors/location/:location',
      handler: 'vendor.findByLocation',
      config: {
        auth: false,
        policies: [],
        middlewares: []
      }
    }
  ],
}; 