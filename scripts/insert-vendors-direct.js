const { createStrapi } = require('@strapi/strapi');

async function insertVendorsDirect() {
  console.log('🚀 Starting direct vendor insertion...');
  
  // Initialize Strapi
  const strapi = await createStrapi().load();
  
  const vendors = [
    {
      name: 'TUBEAR',
      company: 'TUBEAR',
      services: ['virtual-staging', 'photography', 'virtual-tours', '3d-rendering'],
      location: 'Singapore',
      description: 'Specializing in virtual staging, digital decluttering, and 3D rendering services. Expert in creating immersive 360° virtual tours and virtual renovation simulations.',
      specialties: ['Virtual Staging', 'Digital Decluttering', '3D Rendering', '360° Virtual Tours', 'Virtual Renovation', 'Professional Photography'],
      status: 'active',
      email: 'hello@tubear.sg',
      phone: '+65 9123 4567',
      address: 'Singapore',
      contact: {
        email: 'hello@tubear.sg',
        phone: '+65 9123 4567',
        address: 'Singapore'
      },
      image: '/images/vendors/tubear.svg',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20'
    },
    {
      name: 'Chief Media',
      company: 'Chief Media',
      services: ['brand-consulting'],
      location: 'Singapore',
      description: 'Realtor brand consulting firm specializing in strategic brand development and marketing solutions for real estate professionals.',
      specialties: ['Brand Strategy', 'Realtor Consulting', 'Marketing Solutions', 'Brand Development'],
      status: 'active',
      email: 'isabelle@chiefmedia.sg',
      phone: '+65 9876 5432',
      address: 'Singapore',
      contact: {
        email: 'isabelle@chiefmedia.sg',
        phone: '+65 9876 5432',
        address: 'Singapore'
      },
      image: '/images/vendors/chief-media.svg',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-18'
    },
    {
      name: 'LFG Content Co.',
      company: 'LFG Content Co.',
      services: ['videography', 'podcast-production', 'live-streaming'],
      location: 'Singapore',
      description: 'Full-service content production company offering podcast production, video content creation, and live streaming services with professional multi-camera setups.',
      specialties: ['Podcast Production', 'Multi-camera Setup', 'Live Editing', 'Cinematic Videos', 'Live Streaming', 'Webinars'],
      status: 'active',
      email: 'hello@lfgcontent.sg',
      phone: '+65 8765 4321',
      address: 'Singapore',
      contact: {
        email: 'hello@lfgcontent.sg',
        phone: '+65 8765 4321',
        address: 'Singapore'
      },
      image: '/images/vendors/lfg-content.svg',
      createdAt: '2024-01-12',
      updatedAt: '2024-01-19'
    },
    {
      name: 'CC Creative',
      company: 'CC Creative',
      services: ['graphic-design', 'web-design', 'content-writing'],
      location: 'Singapore',
      description: 'Comprehensive creative services including digital assets, logo design, website development, and content creation for real estate professionals.',
      specialties: ['Digital Assets', 'Logo Design', 'Graphic Design', 'Website Design', 'Content Writing', 'Book Creation'],
      status: 'pending',
      email: 'hello@cccreative.sg',
      phone: '+65 7654 3210',
      address: 'Singapore',
      contact: {
        email: 'hello@cccreative.sg',
        phone: '+65 7654 3210',
        address: 'Singapore'
      },
      image: '/images/vendors/cc-creative.svg',
      createdAt: '2024-01-25',
      updatedAt: '2024-01-25'
    },
    {
      name: 'WIN Media Studios',
      company: 'WIN Media Studios',
      services: ['personal-branding', 'content-creation', 'web-design'],
      location: 'Singapore',
      description: 'Personal branding content system specialists offering full content creation, distribution, and landing page development with funnel automation.',
      specialties: ['Personal Branding', 'Content Strategy', 'Batch Creation', 'Landing Pages', 'Funnel Automation'],
      status: 'inactive',
      email: 'hello@winmedia.sg',
      phone: '+65 6543 2109',
      address: 'Singapore',
      contact: {
        email: 'hello@winmedia.sg',
        phone: '+65 6543 2109',
        address: 'Singapore'
      },
      image: '/images/vendors/win-media.svg',
      createdAt: '2024-01-08',
      updatedAt: '2024-01-22'
    }
  ];

  let successCount = 0;
  let errorCount = 0;

  for (const vendor of vendors) {
    try {
      console.log(`📝 Creating vendor: ${vendor.name}...`);
      
      const createdVendor = await strapi.entityService.create('api::vendor.vendor', {
        data: vendor
      });
      
      console.log(`✅ Created vendor: ${vendor.name} (ID: ${createdVendor.id})`);
      successCount++;
      
    } catch (error) {
      console.error(`❌ Error creating vendor ${vendor.name}:`, error.message);
      errorCount++;
    }
  }

  console.log(`🎉 Vendor insertion completed!`);
  console.log(`✅ Successfully created: ${successCount} vendors`);
  console.log(`❌ Errors: ${errorCount} vendors`);

  // Destroy Strapi instance
  await strapi.destroy();
}

insertVendorsDirect().catch(console.error); 