/**
 * studio service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::studio.studio', ({ strapi }) => ({
  // Custom service methods can be added here
  async validateStudioData(data: any) {
    const errors: string[] = [];

    // Validate required fields
    if (!data.name || data.name.trim().length < 2) {
      errors.push('Studio name must be at least 2 characters long');
    }

    if (!data.address || data.address.trim().length === 0) {
      errors.push('Studio address is required');
    }

    if (!data.description || data.description.trim().length === 0) {
      errors.push('Studio description is required');
    }

    // Validate contact information
    if (!data.contact) {
      errors.push('Contact information is required');
    } else {
      if (!data.contact.email || !data.contact.phone) {
        errors.push('Contact email and phone are required');
      } else {
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.contact.email)) {
          errors.push('Invalid email format');
        }

        // Validate phone format
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(data.contact.phone.replace(/[\s\-\(\)]/g, ''))) {
          errors.push('Invalid phone number format');
        }
      }
    }

    // Validate status
    const validStatuses = ['active', 'maintenance', 'inactive'];
    if (data.status && !validStatuses.includes(data.status)) {
      errors.push('Invalid status value');
    }

    // Validate equipment array
    if (data.equipment && !Array.isArray(data.equipment)) {
      errors.push('Equipment must be an array');
    }

    // Validate operating hours
    if (data.operatingHours && typeof data.operatingHours !== 'object') {
      errors.push('Operating hours must be an object');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  },

  async checkStudioNameAvailability(name: string, excludeId?: number) {
    const filters: any = { name };
    
    if (excludeId) {
      filters.id = { $ne: excludeId };
    }

    const existingStudios = await strapi.entityService.findMany('api::studio.studio', {
      filters
    });

    return existingStudios.length === 0;
  },

  async getStudiosByStatus(status: 'active' | 'maintenance' | 'inactive') {
    return await strapi.entityService.findMany('api::studio.studio', {
      filters: { status },
      populate: ['contact'],
      sort: { name: 'asc' }
    });
  },

  async searchStudios(query: string) {
    return await strapi.entityService.findMany('api::studio.studio', {
      filters: {
        $or: [
          { name: { $containsi: query } },
          { description: { $containsi: query } },
          { address: { $containsi: query } }
        ],
        status: 'active'
      },
      populate: ['contact'],
      sort: { name: 'asc' }
    });
  }
}));
