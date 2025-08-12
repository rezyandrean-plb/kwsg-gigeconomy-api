export default {
  routes: [
    // Core CRUD routes
    {
      method: 'GET',
      path: '/studios',
      handler: 'studio.find',
      config: {
        auth: false,
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'GET',
      path: '/studios/:id',
      handler: 'studio.findOne',
      config: {
        auth: false,
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'POST',
      path: '/studios',
      handler: 'studio.create',
      config: {
        auth: false,
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'PUT',
      path: '/studios/:id',
      handler: 'studio.update',
      config: {
        auth: false,
        policies: [],
        middlewares: []
      }
    },
    {
      method: 'DELETE',
      path: '/studios/:id',
      handler: 'studio.delete',
      config: {
        auth: false,
        policies: [],
        middlewares: []
      }
    },


  ],
};
