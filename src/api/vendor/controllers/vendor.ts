/**
 * vendor controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::vendor.vendor', ({ strapi }) => ({
  // Override the default find method to include custom filtering
  async find(ctx) {
    try {
      const { query } = ctx;
      
      // Add custom filters
      const filters = {
        ...(query.filters as Record<string, any> || {}),
        ...(query.status && { status: query.status as 'active' | 'inactive' | 'pending' }),
        ...(query.location && { location: { $containsi: query.location as string } }),
        ...(query.services && { services: { $contains: query.services as string } })
      };

      const vendors = await strapi.entityService.findMany('api::vendor.vendor', {
        filters,
        populate: ['contact'],
        sort: query.sort || { createdAt: 'desc' },
        pagination: {
          page: (query.pagination as any)?.page || 1,
          pageSize: (query.pagination as any)?.pageSize || 25
        }
      });

      return { data: vendors, meta: { filters, pagination: query.pagination } };
    } catch (error) {
      ctx.throw(500, 'Error fetching vendors', { error: error.message });
    }
  },

  // Override the default findOne method
  async findOne(ctx) {
    try {
      const { id } = ctx.params;
      
      const vendor = await strapi.entityService.findOne('api::vendor.vendor', id, {
        populate: ['contact']
      });

      if (!vendor) {
        return ctx.notFound('Vendor not found');
      }

      return { data: vendor };
    } catch (error) {
      ctx.throw(500, 'Error fetching vendor', { error: error.message });
    }
  },

  // Override the default create method with validation
  async create(ctx) {
    try {
      const { data } = ctx.request.body;
      
      // Validate required fields
      if (!data.name || !data.company || !data.email || !data.phone || !data.address) {
        return ctx.badRequest('Missing required fields: name, company, email, phone, address');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        return ctx.badRequest('Invalid email format');
      }

      // Check if vendor with same email already exists
      const existingVendor = await strapi.entityService.findMany('api::vendor.vendor', {
        filters: { email: data.email }
      });

      if (existingVendor.length > 0) {
        return ctx.badRequest('Vendor with this email already exists');
      }

      const vendor = await strapi.entityService.create('api::vendor.vendor', {
        data: {
          ...data,
          status: data.status || 'pending'
        },
        populate: ['contact']
      });

      return { data: vendor };
    } catch (error) {
      ctx.throw(500, 'Error creating vendor', { error: error.message });
    }
  },

  // Override the default update method
  async update(ctx) {
    try {
      const { id } = ctx.params;
      const { data } = ctx.request.body;

      // Check if vendor exists
      const existingVendor = await strapi.entityService.findOne('api::vendor.vendor', id);
      if (!existingVendor) {
        return ctx.notFound('Vendor not found');
      }

      // Validate email if it's being updated
      if (data.email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
          return ctx.badRequest('Invalid email format');
        }

        // Check if email is already taken by another vendor
        const emailExists = await strapi.entityService.findMany('api::vendor.vendor', {
          filters: { 
            email: data.email,
            id: { $ne: id }
          }
        });

        if (emailExists.length > 0) {
          return ctx.badRequest('Email is already taken by another vendor');
        }
      }

      const vendor = await strapi.entityService.update('api::vendor.vendor', id, {
        data,
        populate: ['contact']
      });

      return { data: vendor };
    } catch (error) {
      ctx.throw(500, 'Error updating vendor', { error: error.message });
    }
  },

  // Custom method to get active vendors
  async findActive(ctx) {
    try {
      const vendors = await strapi.entityService.findMany('api::vendor.vendor', {
        filters: { status: 'active' },
        populate: ['contact'],
        sort: { name: 'asc' }
      });

      return { data: vendors };
    } catch (error) {
      ctx.throw(500, 'Error fetching active vendors', { error: error.message });
    }
  },

  // Custom method to search vendors
  async search(ctx) {
    try {
      const { query } = ctx.query;
      
      if (!query) {
        return ctx.badRequest('Search query is required');
      }

      const vendors = await strapi.entityService.findMany('api::vendor.vendor', {
        filters: {
          $or: [
            { name: { $containsi: query as string } },
            { company: { $containsi: query as string } },
            { description: { $containsi: query as string } },
            { location: { $containsi: query as string } }
          ],
          status: 'active'
        },
        populate: ['contact'],
        sort: { name: 'asc' }
      });

      return { data: vendors };
    } catch (error) {
      ctx.throw(500, 'Error searching vendors', { error: error.message });
    }
  },

  // Custom method to get vendors by location
  async findByLocation(ctx) {
    try {
      const { location } = ctx.params;
      
      const vendors = await strapi.entityService.findMany('api::vendor.vendor', {
        filters: {
          location: { $containsi: location },
          status: 'active'
        },
        populate: ['contact'],
        sort: { name: 'asc' }
      });

      return { data: vendors };
    } catch (error) {
      ctx.throw(500, 'Error fetching vendors by location', { error: error.message });
    }
  }
})); 