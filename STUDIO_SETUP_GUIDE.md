# Studio API Setup Guide

This guide will help you set up and use the Studio API endpoints for your gig economy platform.

## Prerequisites

1. Node.js (v16 or higher)
2. Strapi v4.x
3. Database (MySQL, PostgreSQL, or SQLite)

## Installation Steps

### 1. Database Schema Setup

In Strapi v5, the database schema is automatically created from the content types. The studio table will be created when you restart the server.

If you have existing migrations, you can run:

```bash
npm run migrate
```

This will apply any pending migrations.

### 2. Restart Strapi

After adding the new API files, restart your Strapi server:

```bash
npm run develop
```

### 3. Verify Installation

Check that the studio API is properly registered by visiting:
```
http://localhost:1337/admin/content-manager/content-types
```

You should see "Studio" in the list of content types.

## API Endpoints Available

### Core CRUD Operations
- `POST /api/studios` - Create a new studio
- `GET /api/studios` - Get all studios (with filtering and pagination)
- `GET /api/studios/:id` - Get a specific studio
- `PUT /api/studios/:id` - Update a studio
- `DELETE /api/studios/:id` - Delete a studio

### Custom Endpoints
- `GET /api/studios/active` - Get only active studios
- `GET /api/studios/search?query=term` - Search studios

## Testing the API

### 1. Run the Test Script

```bash
node scripts/test-studio-api.js
```

This will test all endpoints and provide feedback on their functionality.

### 2. Manual Testing with cURL

#### Create a Studio
```bash
curl -X POST http://localhost:1337/api/studios \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "name": "My Studio",
      "status": "active",
      "address": "123 Studio Street, City, State 12345",
      "description": "A professional recording studio",
      "contact": {
        "email": "contact@mystudio.com",
        "phone": "+1234567890"
      },
      "equipment": ["Microphone", "Mixer", "Speakers"],
      "operatingHours": {
        "monday": {"open": "09:00", "close": "18:00", "closed": false},
        "tuesday": {"open": "09:00", "close": "18:00", "closed": false}
      }
    }
  }'
```

#### Get All Studios
```bash
curl -X GET http://localhost:1337/api/studios
```

#### Update a Studio
```bash
curl -X PUT http://localhost:1337/api/studios/1 \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "status": "maintenance",
      "description": "Updated description"
    }
  }'
```

## Frontend Integration

### React/JavaScript Example

```javascript
// Create a studio
const createStudio = async (studioData) => {
  try {
    const response = await fetch('/api/studios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: studioData })
    });
    
    if (!response.ok) {
      throw new Error('Failed to create studio');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating studio:', error);
    throw error;
  }
};

// Update a studio
const updateStudio = async (id, updateData) => {
  try {
    const response = await fetch(`/api/studios/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: updateData })
    });
    
    if (!response.ok) {
      throw new Error('Failed to update studio');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating studio:', error);
    throw error;
  }
};

// Get all studios
const getStudios = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters);
    const response = await fetch(`/api/studios?${queryParams}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch studios');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching studios:', error);
    throw error;
  }
};


```

### Form Integration Example

```javascript
// Handle form submission
const handleFormSubmit = async (formData) => {
  try {
    // Prepare studio data
    const studioData = {
      name: formData.name,
      status: formData.status,
      address: formData.address,
      description: formData.description,
      image: formData.image, // Direct URL
      equipment: formData.equipment,
      operatingHours: formData.operatingHours,
      contact: {
        email: formData.contact.email,
        phone: formData.contact.phone
      }
    };
    
    // Create or update studio
    if (formData.id) {
      // Update existing studio
      const result = await updateStudio(formData.id, studioData);
      console.log('Studio updated:', result);
    } else {
      // Create new studio
      const result = await createStudio(studioData);
      console.log('Studio created:', result);
    }
    
  } catch (error) {
    console.error('Error saving studio:', error);
    // Handle error (show notification, etc.)
  }
};
```

## Data Validation

The API includes comprehensive validation for all fields:

### Required Fields
- `name` (2-100 characters, unique)
- `address` (max 500 characters)
- `description` (max 2000 characters)
- `contact.email` (valid email format)
- `contact.phone` (valid phone number)

### Optional Fields
- `status` (enum: "active", "maintenance", "inactive")
- `operatingHours` (JSON object)
- `image` (string URL or file path)
- `equipment` (array of strings)

### Validation Rules
- Studio names must be unique
- Email addresses must be in valid format
- Phone numbers must be in valid format
- Status must be one of the allowed values
- Equipment must be an array
- Operating hours must be an object

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- **400 Bad Request**: Validation errors
- **404 Not Found**: Studio not found
- **500 Internal Server Error**: Server errors

Error responses include detailed messages to help identify issues.



## Performance Considerations

### Database Indexes
The migration creates indexes on:
- `status` field for filtering
- `name` field for uniqueness and searching
- `contact_email` field for contact lookups
- `created_at` field for sorting

### Pagination
The GET `/studios` endpoint supports pagination:
- Default page size: 25
- Configurable via `pagination[pageSize]` parameter
- Page number via `pagination[page]` parameter

## Security Considerations

### Current Configuration
- Authentication is disabled for development
- File uploads are validated for type and size
- Input validation prevents injection attacks

### Production Recommendations
1. Enable authentication for all endpoints
2. Implement rate limiting
3. Add CORS configuration
4. Use HTTPS in production
5. Add API key authentication if needed

## Troubleshooting

### Common Issues

1. **Migration fails**: Ensure database connection is working
2. **API not found**: Restart Strapi after adding new API files
3. **Validation errors**: Check the error message for specific field issues

5. **Database errors**: Check database connection and permissions

### Debug Mode

Enable debug logging in Strapi by setting:
```bash
NODE_ENV=development npm run develop
```

This will provide detailed error messages and logging.

## Support

For issues or questions:
1. Check the error messages in the API responses
2. Review the validation rules
3. Test with the provided test script
4. Check Strapi logs for detailed error information
