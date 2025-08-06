import type { Schema, Struct } from '@strapi/strapi';

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
      'vendor.contact-info': VendorContactInfo;
    }
  }
}
