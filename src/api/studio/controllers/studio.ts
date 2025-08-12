/**
 * studio controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::studio.studio', ({ strapi }) => ({
  // Override the default find method to include custom filtering
  async find(ctx) {
    try {
      const { query } = ctx;
      
      // Add custom filters
      const filters: any = {
        ...(query.filters as Record<string, any> || {}),
        ...(query.status && { status: query.status as 'active' | 'maintenance' | 'inactive' }),
        ...(query.address && { address: { $containsi: query.address as string } })
      };

      // Handle search query
      if (query.search) {
        filters.$or = [
          { name: { $containsi: query.search as string } },
          { description: { $containsi: query.search as string } },
          { address: { $containsi: query.search as string } }
        ];
      }

      const studios = await strapi.entityService.findMany('api::studio.studio', {
        filters,
        populate: ['contact'],
        sort: query.sort || { createdAt: 'desc' },
        pagination: {
          page: (query.pagination as any)?.page || 1,
          pageSize: (query.pagination as any)?.pageSize || 25
        }
      });

      return { data: studios, meta: { filters, pagination: query.pagination } };
    } catch (error) {
      ctx.throw(500, 'Error fetching studios', { error: error.message });
    }
  },

  // Override the default findOne method
  async findOne(ctx) {
    try {
      const { id } = ctx.params;
      
      const studio = await strapi.entityService.findOne('api::studio.studio', id, {
        populate: ['contact']
      });

      if (!studio) {
        return ctx.notFound('Studio not found');
      }

      return { data: studio };
    } catch (error) {
      ctx.throw(500, 'Error fetching studio', { error: error.message });
    }
  },

  // Override the default create method with validation
  async create(ctx) {
    try {
      const { data } = ctx.request.body;
      
      // Validate required fields
      const requiredFields = ['name', 'address', 'description'];
      const missingFields = requiredFields.filter(field => !data[field]);
      
      if (missingFields.length > 0) {
        return ctx.badRequest(`Missing required fields: ${missingFields.join(', ')}`);
      }

      // Validate contact information
      if (!data.contact || !data.contact.email || !data.contact.phone) {
        return ctx.badRequest('Missing required contact information: email and phone');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.contact.email)) {
        return ctx.badRequest('Invalid email format');
      }

      // Validate phone format (basic validation)
      const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
      if (!phoneRegex.test(data.contact.phone.replace(/[\s\-\(\)]/g, ''))) {
        return ctx.badRequest('Invalid phone number format');
      }

      // Check if studio with same name already exists
      const existingStudio = await strapi.entityService.findMany('api::studio.studio', {
        filters: { name: data.name }
      });

      if (existingStudio.length > 0) {
        return ctx.badRequest('Studio with this name already exists');
      }

      // Validate status enum
      const validStatuses = ['active', 'maintenance', 'inactive'];
      if (data.status && !validStatuses.includes(data.status)) {
        return ctx.badRequest('Invalid status value');
      }

      // Validate equipment array if provided
      if (data.equipment && !Array.isArray(data.equipment)) {
        return ctx.badRequest('Equipment must be an array');
      }

      // Validate operating hours if provided
      if (data.operatingHours && typeof data.operatingHours !== 'object') {
        return ctx.badRequest('Operating hours must be an object');
      }

      const studio = await strapi.entityService.create('api::studio.studio', {
        data: {
          ...data,
          status: data.status || 'active',
          equipment: data.equipment || [],
          operatingHours: data.operatingHours || {}
        },
        populate: ['contact']
      });

      ctx.status = 201;
      return { data: studio };
    } catch (error) {
      ctx.throw(500, 'Error creating studio', { error: error.message });
    }
  },

  // Override the default update method
  async update(ctx) {
    try {
      const { id } = ctx.params;
      const { data } = ctx.request.body;

      // Check if studio exists
      const existingStudio = await strapi.entityService.findOne('api::studio.studio', id);
      if (!existingStudio) {
        return ctx.notFound('Studio not found');
      }

      // Validate required fields if they're being updated
      if (data.name !== undefined && !data.name) {
        return ctx.badRequest('Studio name is required');
      }

      if (data.address !== undefined && !data.address) {
        return ctx.badRequest('Studio address is required');
      }

      if (data.description !== undefined && !data.description) {
        return ctx.badRequest('Studio description is required');
      }

      // Validate contact information if it's being updated
      if (data.contact) {
        if (!data.contact.email || !data.contact.phone) {
          return ctx.badRequest('Contact email and phone are required');
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.contact.email)) {
          return ctx.badRequest('Invalid email format');
        }

        // Validate phone format
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(data.contact.phone.replace(/[\s\-\(\)]/g, ''))) {
          return ctx.badRequest('Invalid phone number format');
        }
      }

      // Check if name is already taken by another studio
      if (data.name) {
        const nameExists = await strapi.entityService.findMany('api::studio.studio', {
          filters: { 
            name: data.name,
            id: { $ne: id }
          }
        });

        if (nameExists.length > 0) {
          return ctx.badRequest('Studio name is already taken by another studio');
        }
      }

      // Validate status enum
      const validStatuses = ['active', 'maintenance', 'inactive'];
      if (data.status && !validStatuses.includes(data.status)) {
        return ctx.badRequest('Invalid status value');
      }

      // Validate equipment array if provided
      if (data.equipment && !Array.isArray(data.equipment)) {
        return ctx.badRequest('Equipment must be an array');
      }

      // Validate operating hours if provided
      if (data.operatingHours && typeof data.operatingHours !== 'object') {
        return ctx.badRequest('Operating hours must be an object');
      }

      const studio = await strapi.entityService.update('api::studio.studio', id, {
        data,
        populate: ['contact']
      });

      return { data: studio };
    } catch (error) {
      ctx.throw(500, 'Error updating studio', { error: error.message });
    }
  },

  // Override the default delete method
  async delete(ctx) {
    try {
      const { id } = ctx.params;

      // Check if studio exists
      const existingStudio = await strapi.entityService.findOne('api::studio.studio', id);
      if (!existingStudio) {
        return ctx.notFound('Studio not found');
      }

      const deletedStudio = await strapi.entityService.delete('api::studio.studio', id);

      return { data: deletedStudio };
    } catch (error) {
      ctx.throw(500, 'Error deleting studio', { error: error.message });
    }
  },




}));
