const axios = require('axios');

const newVendors = [
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

async function insertNewVendors() {
  console.log('🌱 Starting new vendor data insertion...');
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const vendor of newVendors) {
    try {
      console.log(`📝 Creating vendor: ${vendor.name}...`);
      
      const response = await axios.post('http://localhost:1337/api/vendors', {
        data: vendor
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 10000 // 10 second timeout
      });
      
      console.log(`✅ Created vendor: ${vendor.name} (ID: ${response.data.data.id})`);
      successCount++;
      
      // Add a small delay between requests to avoid overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error) {
      console.error(`❌ Error creating vendor ${vendor.name}:`, error.message);
      if (error.response) {
        console.error(`   Status: ${error.response.status}`);
        console.error(`   Data:`, error.response.data);
      }
      errorCount++;
    }
  }
  
  console.log(`🎉 Vendor insertion completed!`);
  console.log(`✅ Successfully created: ${successCount} vendors`);
  console.log(`❌ Errors: ${errorCount} vendors`);
  
  if (errorCount > 0) {
    console.log(`\n💡 Some vendors failed to create. This might be due to:`);
    console.log(`   - Server not running on http://localhost:1337`);
    console.log(`   - Database connection issues`);
    console.log(`   - Duplicate email addresses`);
    console.log(`   - Invalid data format`);
  }
}

// Check if server is running before insertion
async function checkServerHealth() {
  try {
    await axios.get('http://localhost:1337/api/health', { timeout: 5000 });
    console.log('✅ Server is running and healthy');
    return true;
  } catch (error) {
    console.error('❌ Server is not running or not accessible');
    console.log('💡 Please start the Strapi server with: npm run develop');
    return false;
  }
}

// Run the insertion directly
async function main() {
  console.log('🚀 Attempting to insert vendor data...');
  await insertNewVendors();
}

main().catch(console.error); 