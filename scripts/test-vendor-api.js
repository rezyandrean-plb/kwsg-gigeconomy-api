const axios = require('axios');

const BASE_URL = 'http://localhost:1337/api';
let testVendorId = null;

// Test data
const testVendor = {
  name: 'Test Vendor API',
  company: 'Test Company',
  location: 'Test Location',
  status: 'pending',
  description: 'This is a test vendor for API testing',
  services: ['test-service'],
  specialties: ['Test Specialty'],
  email: 'test@vendorapi.com',
  phone: '+65 1234 5678',
  address: '123 Test Street, Test City',
  contact: {
    email: 'test@vendorapi.com',
    phone: '+65 1234 5678',
    address: '123 Test Street, Test City'
  }
};

// Utility function for making requests
async function makeRequest(method, endpoint, data = null) {
  try {
    const config = {
      method,
      url: `${BASE_URL}${endpoint}`,
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 10000
    };

    if (data) {
      config.data = data;
    }

    const response = await axios(config);
    return { success: true, data: response.data, status: response.status };
  } catch (error) {
    return { 
      success: false, 
      error: error.response?.data || error.message, 
      status: error.response?.status 
    };
  }
}

// Test functions
async function testHealthCheck() {
  console.log('🏥 Testing server health...');
  const result = await makeRequest('GET', '/health');
  
  if (result.success) {
    console.log('✅ Server is healthy');
    return true;
  } else {
    console.log('❌ Server health check failed:', result.error);
    return false;
  }
}

async function testCreateVendor() {
  console.log('\n📝 Testing vendor creation...');
  const result = await makeRequest('POST', '/vendors', { data: testVendor });
  
  if (result.success) {
    testVendorId = result.data.data.id;
    console.log(`✅ Vendor created successfully with ID: ${testVendorId}`);
    return true;
  } else {
    console.log('❌ Vendor creation failed:', result.error);
    return false;
  }
}

async function testGetAllVendors() {
  console.log('\n📋 Testing get all vendors...');
  const result = await makeRequest('GET', '/vendors');
  
  if (result.success) {
    console.log(`✅ Retrieved ${result.data.data.length} vendors`);
    return true;
  } else {
    console.log('❌ Get all vendors failed:', result.error);
    return false;
  }
}

async function testGetVendorById() {
  if (!testVendorId) {
    console.log('⚠️  Skipping get vendor by ID test - no vendor ID available');
    return false;
  }

  console.log('\n🔍 Testing get vendor by ID...');
  const result = await makeRequest('GET', `/vendors/${testVendorId}`);
  
  if (result.success) {
    console.log(`✅ Retrieved vendor: ${result.data.data.name}`);
    return true;
  } else {
    console.log('❌ Get vendor by ID failed:', result.error);
    return false;
  }
}

async function testUpdateVendor() {
  if (!testVendorId) {
    console.log('⚠️  Skipping update vendor test - no vendor ID available');
    return false;
  }

  console.log('\n✏️  Testing vendor update...');
  const updateData = {
    data: {
      status: 'active',
      rating: 4.5,
      reviews_count: 5
    }
  };
  
  const result = await makeRequest('PUT', `/vendors/${testVendorId}`, updateData);
  
  if (result.success) {
    console.log('✅ Vendor updated successfully');
    return true;
  } else {
    console.log('❌ Vendor update failed:', result.error);
    return false;
  }
}

async function testGetActiveVendors() {
  console.log('\n✅ Testing get active vendors...');
  const result = await makeRequest('GET', '/vendors/active');
  
  if (result.success) {
    console.log(`✅ Retrieved ${result.data.data.length} active vendors`);
    return true;
  } else {
    console.log('❌ Get active vendors failed:', result.error);
    return false;
  }
}

async function testSearchVendors() {
  console.log('\n🔍 Testing vendor search...');
  const result = await makeRequest('GET', '/vendors/search?query=test');
  
  if (result.success) {
    console.log(`✅ Search returned ${result.data.data.length} results`);
    return true;
  } else {
    console.log('❌ Vendor search failed:', result.error);
    return false;
  }
}

async function testGetVendorsByLocation() {
  console.log('\n📍 Testing get vendors by location...');
  const result = await makeRequest('GET', '/vendors/location/Singapore');
  
  if (result.success) {
    console.log(`✅ Retrieved ${result.data.data.length} vendors from Singapore`);
    return true;
  } else {
    console.log('❌ Get vendors by location failed:', result.error);
    return false;
  }
}

async function testVendorFiltering() {
  console.log('\n🔧 Testing vendor filtering...');
  const result = await makeRequest('GET', '/vendors?status=active&location=Singapore');
  
  if (result.success) {
    console.log(`✅ Filtering returned ${result.data.data.length} results`);
    return true;
  } else {
    console.log('❌ Vendor filtering failed:', result.error);
    return false;
  }
}

async function testDeleteVendor() {
  if (!testVendorId) {
    console.log('⚠️  Skipping delete vendor test - no vendor ID available');
    return false;
  }

  console.log('\n🗑️  Testing vendor deletion...');
  const result = await makeRequest('DELETE', `/vendors/${testVendorId}`);
  
  if (result.success) {
    console.log('✅ Vendor deleted successfully');
    return true;
  } else {
    console.log('❌ Vendor deletion failed:', result.error);
    return false;
  }
}

async function testValidationErrors() {
  console.log('\n🚫 Testing validation errors...');
  
  // Test missing required fields
  const invalidVendor = {
    data: {
      name: 'Invalid Vendor'
      // Missing required fields: company, email, phone, address
    }
  };
  
  const result = await makeRequest('POST', '/vendors', invalidVendor);
  
  if (!result.success && result.status === 400) {
    console.log('✅ Validation error handled correctly');
    return true;
  } else {
    console.log('❌ Validation error test failed:', result.error);
    return false;
  }
}

// Main test runner
async function runTests() {
  console.log('🧪 Starting Vendor API Tests...\n');
  
  const tests = [
    { name: 'Health Check', fn: testHealthCheck },
    { name: 'Create Vendor', fn: testCreateVendor },
    { name: 'Get All Vendors', fn: testGetAllVendors },
    { name: 'Get Vendor by ID', fn: testGetVendorById },
    { name: 'Update Vendor', fn: testUpdateVendor },
    { name: 'Get Active Vendors', fn: testGetActiveVendors },
    { name: 'Search Vendors', fn: testSearchVendors },
    { name: 'Get Vendors by Location', fn: testGetVendorsByLocation },
    { name: 'Vendor Filtering', fn: testVendorFiltering },
    { name: 'Validation Errors', fn: testValidationErrors },
    { name: 'Delete Vendor', fn: testDeleteVendor }
  ];

  let passedTests = 0;
  let totalTests = tests.length;

  for (const test of tests) {
    try {
      const result = await test.fn();
      if (result) {
        passedTests++;
      }
    } catch (error) {
      console.log(`❌ Test "${test.name}" failed with error:`, error.message);
    }
  }

  console.log('\n📊 Test Results:');
  console.log(`✅ Passed: ${passedTests}/${totalTests}`);
  console.log(`❌ Failed: ${totalTests - passedTests}/${totalTests}`);
  
  if (passedTests === totalTests) {
    console.log('🎉 All tests passed! Vendor API is working correctly.');
  } else {
    console.log('⚠️  Some tests failed. Please check the server and try again.');
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = {
  runTests,
  makeRequest,
  testVendor
}; 