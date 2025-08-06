const axios = require('axios');

async function setupPermissions() {
  console.log('🔧 Setting up API permissions for vendors...');
  
  try {
    // First, let's try to get the current permissions
    const response = await axios.get('http://localhost:1337/admin/users/me/permissions', {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Permissions check successful');
    console.log('Current permissions:', response.data);
    
  } catch (error) {
    console.error('❌ Error checking permissions:', error.response?.data || error.message);
  }
}

setupPermissions().catch(console.error); 