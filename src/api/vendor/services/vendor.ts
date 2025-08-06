/**
 * vendor service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::vendor.vendor', ({ strapi }) => ({
  // Custom service methods for enhanced functionality
  
  async findActiveVendors() {
    try {
      return await strapi.entityService.findMany('api::vendor.vendor', {
        filters: { status: 'active' },
        populate: ['contact'],
        sort: { name: 'asc' }
      });
    } catch (error) {
      throw new Error(`Error finding active vendors: ${error.message}`);
    }
  },

  async findVendorsByLocation(location: string) {
    try {
      return await strapi.entityService.findMany('api::vendor.vendor', {
        filters: { 
          location: { $containsi: location },
          status: 'active'
        },
        populate: ['contact'],
        sort: { name: 'asc' }
      });
    } catch (error) {
      throw new Error(`Error finding vendors by location: ${error.message}`);
    }
  },

  async findVendorsByEmail(email: string) {
    try {
      return await strapi.entityService.findMany('api::vendor.vendor', {
        filters: { 
          email: { $containsi: email },
          status: 'active'
        },
        populate: ['contact']
      });
    } catch (error) {
      throw new Error(`Error finding vendors by email: ${error.message}`);
    }
  },

  async findVendorsByServices(services: string[]) {
    try {
      return await strapi.entityService.findMany('api::vendor.vendor', {
        filters: { 
          services: { $contains: services },
          status: 'active'
        },
        populate: ['contact'],
        sort: { name: 'asc' }
      });
    } catch (error) {
      throw new Error(`Error finding vendors by services: ${error.message}`);
    }
  },

  async searchVendors(query: string) {
    try {
      return await strapi.entityService.findMany('api::vendor.vendor', {
        filters: {
          $or: [
            { name: { $containsi: query } },
            { company: { $containsi: query } },
            { description: { $containsi: query } },
            { location: { $containsi: query } }
          ],
          status: 'active'
        },
        populate: ['contact'],
        sort: { name: 'asc' }
      });
    } catch (error) {
      throw new Error(`Error searching vendors: ${error.message}`);
    }
  },

  async updateVendorStatus(id: number, status: 'active' | 'inactive' | 'pending') {
    try {
      return await strapi.entityService.update('api::vendor.vendor', id, {
        data: { status },
        populate: ['contact']
      });
    } catch (error) {
      throw new Error(`Error updating vendor status: ${error.message}`);
    }
  },

  async updateVendorRating(id: number, rating: number, reviewsCount: number) {
    try {
      return await strapi.entityService.update('api::vendor.vendor', id, {
        data: { 
          rating,
          reviews_count: reviewsCount
        },
        populate: ['contact']
      });
    } catch (error) {
      throw new Error(`Error updating vendor rating: ${error.message}`);
    }
  },

  async getVendorStats() {
    try {
      const [total, active, inactive, pending] = await Promise.all([
        strapi.entityService.count('api::vendor.vendor'),
        strapi.entityService.count('api::vendor.vendor', { filters: { status: 'active' } }),
        strapi.entityService.count('api::vendor.vendor', { filters: { status: 'inactive' } }),
        strapi.entityService.count('api::vendor.vendor', { filters: { status: 'pending' } })
      ]);

      return {
        total,
        active,
        inactive,
        pending
      };
    } catch (error) {
      throw new Error(`Error getting vendor stats: ${error.message}`);
    }
  },

  async validateVendorData(data: any) {
    const errors = [];

    // Required fields validation
    if (!data.name || data.name.trim().length < 2) {
      errors.push('Name is required and must be at least 2 characters long');
    }

    if (!data.company || data.company.trim().length === 0) {
      errors.push('Company is required');
    }

    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.push('Valid email is required');
    }

    if (!data.phone || data.phone.trim().length === 0) {
      errors.push('Phone is required');
    }

    if (!data.address || data.address.trim().length === 0) {
      errors.push('Address is required');
    }

    if (!data.location || data.location.trim().length === 0) {
      errors.push('Location is required');
    }

    // Status validation
    if (data.status && !['active', 'inactive', 'pending'].includes(data.status)) {
      errors.push('Status must be one of: active, inactive, pending');
    }

    // Rating validation
    if (data.rating !== undefined) {
      const rating = parseFloat(data.rating);
      if (isNaN(rating) || rating < 0 || rating > 5) {
        errors.push('Rating must be a number between 0 and 5');
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
})); 