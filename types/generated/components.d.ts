import type { Schema, Struct } from '@strapi/strapi';

export interface StudioContactInfo extends Struct.ComponentSchema {
  collectionName: 'components_studio_contact_infos';
  info: {
    description: 'Contact information for studios';
    displayName: 'Contact Info';
  };
  attributes: {
    email: Schema.Attribute.Email & Schema.Attribute.Required;
    phone: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 20;
      }>;
  };
}

export interface VendorContactInfo extends Struct.ComponentSchema {
  collectionName: 'components_vendor_contact_infos';
  info: {
    description: 'Contact information for vendors';
    displayName: 'Contact Info';
  };
  attributes: {
    address: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 200;
      }>;
    email: Schema.Attribute.Email & Schema.Attribute.Required;
    phone: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 20;
      }>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'studio.contact-info': StudioContactInfo;
      'vendor.contact-info': VendorContactInfo;
    }
  }
}
