const axios = require('axios');

const STRAPI_URL = 'https://strong-bell-c2236129a3.strapiapp.com';

async function checkCloudDatabase() {
  console.log('🔍 Checking cloud database structure...');
  console.log(`📍 Target URL: ${STRAPI_URL}`);
  
  try {
    // Test basic API accessibility
    console.log('\n1. Testing basic API accessibility...');
    const vendorsResponse = await axios.get(`${STRAPI_URL}/api/vendors`);
    console.log('✅ Vendors endpoint is accessible');
    console.log(`   Response: ${JSON.stringify(vendorsResponse.data, null, 2)}`);
    
    // Test if we can get content types
    console.log('\n2. Testing content types...');
    try {
      const contentTypesResponse = await axios.get(`${STRAPI_URL}/api/content-type-builder/content-types`);
      console.log('✅ Content types endpoint is accessible');
      console.log(`   Available content types: ${JSON.stringify(contentTypesResponse.data, null, 2)}`);
    } catch (error) {
      console.log('❌ Content types endpoint not accessible (this is normal for public API)');
    }
    
    // Test if we can get components
    console.log('\n3. Testing components...');
    try {
      const componentsResponse = await axios.get(`${STRAPI_URL}/api/content-type-builder/components`);
      console.log('✅ Components endpoint is accessible');
      console.log(`   Available components: ${JSON.stringify(componentsResponse.data, null, 2)}`);
    } catch (error) {
      console.log('❌ Components endpoint not accessible (this is normal for public API)');
    }
    
    // Test a minimal vendor creation
    console.log('\n4. Testing minimal vendor creation...');
    const minimalVendor = {
      data: {
        name: "Test Vendor",
        company: "Test Company", 
        location: "Singapore",
        email: "test@example.com",
        phone: "+65 1234 5678",
        address: "Test Address",
        contact: {
          email: "test@example.com",
          phone: "+65 1234 5678", 
          address: "Test Address"
        }
      }
    };
    
    try {
      const createResponse = await axios.post(`${STRAPI_URL}/api/vendors`, minimalVendor, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 15000
      });
      console.log('✅ Vendor creation successful!');
      console.log(`   Created vendor ID: ${createResponse.data.data.id}`);
      
      // Clean up - delete the test vendor
      console.log('\n5. Cleaning up test vendor...');
      await axios.delete(`${STRAPI_URL}/api/vendors/${createResponse.data.data.id}`);
      console.log('✅ Test vendor cleaned up');
      
    } catch (error) {
      console.log('❌ Vendor creation failed');
      console.log(`   Status: ${error.response?.status}`);
      console.log(`   Error: ${JSON.stringify(error.response?.data, null, 2)}`);
      
      if (error.response?.status === 500) {
        console.log('\n💡 500 Error suggests:');
        console.log('   - Database migration not run');
        console.log('   - Contact component not created');
        console.log('   - Database connection issues');
        console.log('   - Content type not properly registered');
      }
    }
    
  } catch (error) {
    console.error('❌ Error checking cloud database:', error.message);
  }
}

// Run the check
checkCloudDatabase().catch(console.error);
