const axios = require('axios');

const BASE_URL = 'http://localhost:1337/api';

// Test data
const testStudio = {
  name: `Test Recording Studio ${Date.now()}`,
  status: 'active',
  operatingHours: {
    monday: { open: '09:00', close: '18:00', closed: false },
    tuesday: { open: '09:00', close: '18:00', closed: false },
    wednesday: { open: '09:00', close: '18:00', closed: false },
    thursday: { open: '09:00', close: '18:00', closed: false },
    friday: { open: '09:00', close: '18:00', closed: false },
    saturday: { open: '10:00', close: '16:00', closed: false },
    sunday: { open: '', close: '', closed: true }
  },
  address: '123 Test Street, Test City, TC 12345',
  image: 'https://example.com/test-studio.jpg',
  description: 'A test recording studio for API testing purposes.',
  equipment: ['Test Microphone', 'Test Mixer', 'Test Speakers'],
  contact: {
    email: `test${Date.now()}@teststudio.com`,
    phone: '+1234567890'
  }
};

let createdStudioId;

async function testStudioAPI() {
  console.log('🧪 Testing Studio API Endpoints\n');

  try {
    // Test 1: Create Studio (POST)
    console.log('1. Testing POST /studios (Create Studio)');
    const createResponse = await axios.post(`${BASE_URL}/studios`, {
      data: testStudio
    });
    
    if (createResponse.status === 201) {
      console.log('✅ Studio created successfully');
      createdStudioId = createResponse.data.data.id;
      console.log(`   Studio ID: ${createdStudioId}`);
      console.log(`   Studio Name: ${createResponse.data.data.name}`);
    } else {
      console.log('❌ Failed to create studio');
      console.log('   Response:', createResponse.data);
    }

    // Test 2: Get All Studios (GET)
    console.log('\n2. Testing GET /studios (Get All Studios)');
    const getAllResponse = await axios.get(`${BASE_URL}/studios`);
    
    if (getAllResponse.status === 200) {
      console.log('✅ Studios retrieved successfully');
      console.log(`   Total studios: ${getAllResponse.data.data.length}`);
    } else {
      console.log('❌ Failed to retrieve studios');
      console.log('   Response:', getAllResponse.data);
    }

    // Test 3: Get Studio by ID (GET)
    if (createdStudioId) {
      console.log('\n3. Testing GET /studios/:id (Get Studio by ID)');
      const getOneResponse = await axios.get(`${BASE_URL}/studios/${createdStudioId}`);
      
      if (getOneResponse.status === 200) {
        console.log('✅ Studio retrieved by ID successfully');
        console.log(`   Studio Name: ${getOneResponse.data.data.name}`);
      } else {
        console.log('❌ Failed to retrieve studio by ID');
        console.log('   Response:', getOneResponse.data);
      }
    }

    // Test 4: Update Studio (PUT)
    if (createdStudioId) {
      console.log('\n4. Testing PUT /studios/:id (Update Studio)');
      const updateData = {
        data: {
          status: 'maintenance',
          description: 'Updated description for testing purposes.'
        }
      };
      
      const updateResponse = await axios.put(`${BASE_URL}/studios/${createdStudioId}`, updateData);
      
      if (updateResponse.status === 200) {
        console.log('✅ Studio updated successfully');
        console.log(`   New Status: ${updateResponse.data.data.status}`);
        console.log(`   Updated Description: ${updateResponse.data.data.description}`);
      } else {
        console.log('❌ Failed to update studio');
        console.log('   Response:', updateResponse.data);
      }
    }

    // Test 5: Get Active Studios (GET)
    console.log('\n5. Testing GET /studios?status=active (Get Active Studios)');
    const getActiveResponse = await axios.get(`${BASE_URL}/studios?status=active`);
    
    if (getActiveResponse.status === 200) {
      console.log('✅ Active studios retrieved successfully');
      console.log(`   Active studios count: ${getActiveResponse.data.data.length}`);
    } else {
      console.log('❌ Failed to retrieve active studios');
      console.log('   Response:', getActiveResponse.data);
    }

    // Test 6: Search Studios (GET)
    console.log('\n6. Testing GET /studios?search=Test (Search Studios)');
    const searchResponse = await axios.get(`${BASE_URL}/studios?search=Test`);
    
    if (searchResponse.status === 200) {
      console.log('✅ Studio search completed successfully');
      console.log(`   Search results count: ${searchResponse.data.data.length}`);
    } else {
      console.log('❌ Failed to search studios');
      console.log('   Response:', searchResponse.data);
    }

    // Test 7: Validation Error Test
    console.log('\n7. Testing Validation Errors (Invalid Data)');
    const invalidData = {
      data: {
        name: '', // Invalid: empty name
        address: '', // Invalid: empty address
        contact: {
          email: 'invalid-email', // Invalid: wrong email format
          phone: '123' // Invalid: too short phone
        }
      }
    };
    
    try {
      await axios.post(`${BASE_URL}/studios`, invalidData);
      console.log('❌ Expected validation error but request succeeded');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log('✅ Validation error caught successfully');
        console.log(`   Error message: ${error.response.data.error.message}`);
      } else {
        console.log('❌ Unexpected error during validation test');
        console.log('   Error:', error.message);
      }
    }

    // Test 8: Delete Studio (DELETE)
    if (createdStudioId) {
      console.log('\n8. Testing DELETE /studios/:id (Delete Studio)');
      const deleteResponse = await axios.delete(`${BASE_URL}/studios/${createdStudioId}`);
      
      if (deleteResponse.status === 200) {
        console.log('✅ Studio deleted successfully');
        console.log(`   Deleted Studio ID: ${deleteResponse.data.data.id}`);
      } else {
        console.log('❌ Failed to delete studio');
        console.log('   Response:', deleteResponse.data);
      }
    }

    console.log('\n🎉 All tests completed!');

  } catch (error) {
    console.error('\n❌ Test failed with error:', error.message);
    if (error.response) {
      console.error('   Response status:', error.response.status);
      console.error('   Response data:', error.response.data);
    }
  }
}

// Run the tests
testStudioAPI();
