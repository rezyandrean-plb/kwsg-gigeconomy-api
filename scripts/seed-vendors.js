const axios = require('axios');

const mockVendors = [
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
    rating: 4.8,
    reviews_count: 15,
    website: 'https://tubear.sg',
    social_media: {
      facebook: 'https://facebook.com/tubear',
      instagram: 'https://instagram.com/tubear',
      linkedin: 'https://linkedin.com/company/tubear'
    },
    business_hours: {
      monday: '9:00 AM - 6:00 PM',
      tuesday: '9:00 AM - 6:00 PM',
      wednesday: '9:00 AM - 6:00 PM',
      thursday: '9:00 AM - 6:00 PM',
      friday: '9:00 AM - 6:00 PM',
      saturday: '10:00 AM - 4:00 PM',
      sunday: 'Closed'
    },
    pricing: {
      virtual_staging: '$200-500',
      photography: '$150-300',
      virtual_tours: '$300-800',
      '3d_rendering': '$500-1500'
    }
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
    rating: 4.9,
    reviews_count: 8,
    website: 'https://chiefmedia.sg',
    social_media: {
      instagram: 'https://instagram.com/chiefmedia',
      linkedin: 'https://linkedin.com/company/chiefmedia'
    },
    business_hours: {
      monday: '9:00 AM - 5:00 PM',
      tuesday: '9:00 AM - 5:00 PM',
      wednesday: '9:00 AM - 5:00 PM',
      thursday: '9:00 AM - 5:00 PM',
      friday: '9:00 AM - 5:00 PM',
      saturday: 'By appointment',
      sunday: 'Closed'
    },
    pricing: {
      brand_consulting: '$500-2000'
    }
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
    rating: 4.7,
    reviews_count: 12,
    website: 'https://lfgcontent.sg',
    social_media: {
      youtube: 'https://youtube.com/lfgcontent',
      instagram: 'https://instagram.com/lfgcontent',
      tiktok: 'https://tiktok.com/@lfgcontent'
    },
    business_hours: {
      monday: '10:00 AM - 7:00 PM',
      tuesday: '10:00 AM - 7:00 PM',
      wednesday: '10:00 AM - 7:00 PM',
      thursday: '10:00 AM - 7:00 PM',
      friday: '10:00 AM - 7:00 PM',
      saturday: '11:00 AM - 5:00 PM',
      sunday: 'Closed'
    },
    pricing: {
      videography: '$300-800',
      podcast_production: '$200-500',
      live_streaming: '$400-1000'
    }
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
    rating: 4.5,
    reviews_count: 6,
    website: 'https://cccreative.sg',
    social_media: {
      instagram: 'https://instagram.com/cccreative',
      behance: 'https://behance.net/cccreative'
    },
    business_hours: {
      monday: '9:00 AM - 6:00 PM',
      tuesday: '9:00 AM - 6:00 PM',
      wednesday: '9:00 AM - 6:00 PM',
      thursday: '9:00 AM - 6:00 PM',
      friday: '9:00 AM - 6:00 PM',
      saturday: '10:00 AM - 3:00 PM',
      sunday: 'Closed'
    },
    pricing: {
      graphic_design: '$100-300',
      web_design: '$500-2000',
      content_writing: '$50-200'
    }
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
    rating: 4.3,
    reviews_count: 4,
    website: 'https://winmedia.sg',
    social_media: {
      instagram: 'https://instagram.com/winmedia',
      linkedin: 'https://linkedin.com/company/winmedia'
    },
    business_hours: {
      monday: '9:00 AM - 5:00 PM',
      tuesday: '9:00 AM - 5:00 PM',
      wednesday: '9:00 AM - 5:00 PM',
      thursday: '9:00 AM - 5:00 PM',
      friday: '9:00 AM - 5:00 PM',
      saturday: 'By appointment',
      sunday: 'Closed'
    },
    pricing: {
      personal_branding: '$800-2500',
      content_creation: '$200-600',
      web_design: '$600-2500'
    }
  }
];

async function seedVendors() {
  console.log('🌱 Starting vendor data seeding...');
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const vendor of mockVendors) {
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
      console.error(`❌ Error creating vendor ${vendor.name}:`, error.response?.data || error.message);
      errorCount++;
    }
  }
  
  console.log(`🎉 Vendor seeding completed!`);
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

// Check if server is running before seeding
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

// Run the seeding directly
async function main() {
  console.log('🚀 Attempting to seed vendor data...');
  await seedVendors();
}

main().catch(console.error); 