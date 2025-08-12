# Studio API Documentation

This document provides comprehensive information about the Studio API endpoints for the gig economy platform.

## Base URL
```
http://localhost:1337/api
```

## Authentication
Currently, all endpoints are configured with `auth: false` for development purposes. In production, you should enable authentication.

## Endpoints

### 1. Create Studio (POST)
**Endpoint:** `POST /studios`

**Description:** Creates a new studio with the provided information.

**Request Body:**
```json
{
  "data": {
    "name": "Studio Name",
    "status": "active",
    "operatingHours": {
      "monday": {
        "open": "09:00",
        "close": "18:00",
        "closed": false
      },
      "tuesday": {
        "open": "09:00",
        "close": "18:00",
        "closed": false
      }
      // ... other days
    },
    "address": "123 Studio Street, City, State 12345",
    "image": "https://example.com/studio-image.jpg",
    "description": "A professional recording studio with state-of-the-art equipment.",
    "equipment": ["Microphones", "Mixers", "Acoustic Panels"],
    "contact": {
      "email": "studio@example.com",
      "phone": "+1234567890"
    }
  }
}
```

**Required Fields:**
- `name` (string, 2-100 characters)
- `address` (text, max 500 characters)
- `description` (text, max 2000 characters)
- `contact.email` (valid email format)
- `contact.phone` (valid phone number)

**Optional Fields:**
- `status` (enum: "active", "maintenance", "inactive", default: "active")
- `operatingHours` (JSON object)
- `image` (string, max 255 characters)
- `equipment` (array of strings)

**Response (Success - 201):**
```json
{
  "data": {
    "id": 1,
    "name": "Studio Name",
    "status": "active",
    "operatingHours": { ... },
    "address": "123 Studio Street, City, State 12345",
    "image": "https://example.com/studio-image.jpg",
    "description": "A professional recording studio...",
    "equipment": ["Microphones", "Mixers", "Acoustic Panels"],
    "contact": {
      "email": "studio@example.com",
      "phone": "+1234567890"
    },
    "createdAt": "2024-01-02T10:00:00.000Z",
    "updatedAt": "2024-01-02T10:00:00.000Z"
  }
}
```

**Response (Error - 400):**
```json
{
  "error": {
    "status": 400,
    "name": "BadRequestError",
    "message": "Missing required fields: name, address, description"
  }
}
```

### 2. Update Studio (PUT)
**Endpoint:** `PUT /studios/:id`

**Description:** Updates an existing studio with the provided information.

**Request Body:** Same as POST, but all fields are optional for updates.

**Response (Success - 200):**
```json
{
  "data": {
    "id": 1,
    "name": "Updated Studio Name",
    "status": "maintenance",
    // ... other fields
    "updatedAt": "2024-01-02T11:00:00.000Z"
  }
}
```

**Response (Error - 404):**
```json
{
  "error": {
    "status": 404,
    "name": "NotFoundError",
    "message": "Studio not found"
  }
}
```

### 3. Get All Studios (GET)
**Endpoint:** `GET /studios`

**Query Parameters:**
- `status` (optional): Filter by status ("active", "maintenance", "inactive")
- `address` (optional): Search in address field
- `sort` (optional): Sort field (default: "createdAt:desc")
- `pagination[page]` (optional): Page number (default: 1)
- `pagination[pageSize]` (optional): Items per page (default: 25)

**Example:** `GET /studios?status=active&pagination[page]=1&pagination[pageSize]=10`

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Studio Name",
      // ... other fields
    }
  ],
  "meta": {
    "filters": { "status": "active" },
    "pagination": {
      "page": 1,
      "pageSize": 10,
      "pageCount": 5,
      "total": 50
    }
  }
}
```

### 4. Get Studio by ID (GET)
**Endpoint:** `GET /studios/:id`

**Response (Success - 200):**
```json
{
  "data": {
    "id": 1,
    "name": "Studio Name",
    // ... all studio fields
  }
}
```

### 5. Delete Studio (DELETE)
**Endpoint:** `DELETE /studios/:id`

**Response (Success - 200):**
```json
{
  "data": {
    "id": 1,
    "name": "Studio Name",
    // ... deleted studio data
  }
}
```

### 6. Get Active Studios (GET)
**Endpoint:** `GET /studios/active`

**Description:** Returns only studios with "active" status.

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Active Studio",
      "status": "active",
      // ... other fields
    }
  ]
}
```

### 7. Search Studios (GET)
**Endpoint:** `GET /studios/search?query=search_term`

**Description:** Searches studios by name, description, or address.

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "Matching Studio",
      // ... other fields
    }
  ]
}
```



## Data Validation

### Studio Name
- Required
- Minimum 2 characters
- Maximum 100 characters
- Must be unique across all studios

### Status
- Must be one of: "active", "maintenance", "inactive"
- Default: "active"

### Address
- Required
- Maximum 500 characters

### Description
- Required
- Maximum 2000 characters

### Contact Information
- Email: Required, must be valid email format
- Phone: Required, must be valid phone number format

### Equipment
- Optional array of strings
- Each equipment item should be a string

### Operating Hours
- Optional JSON object
- Structure should match the OperatingHoursPicker component format

### Image
- Optional string (URL)
- Maximum 255 characters
- Should be a valid image URL

## Error Handling

All endpoints return appropriate HTTP status codes:

- **200**: Success (GET, PUT, DELETE)
- **201**: Created (POST)
- **400**: Bad Request (validation errors)
- **404**: Not Found
- **500**: Internal Server Error

Error responses include:
- `status`: HTTP status code
- `name`: Error type
- `message`: Human-readable error message
- `error`: Additional error details (for 500 errors)

## Example Usage

### Creating a Studio
```javascript
const response = await fetch('/api/studios', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    data: {
      name: 'My Recording Studio',
      status: 'active',
      address: '123 Music Street, Nashville, TN 37201',
      description: 'Professional recording studio with vintage equipment',
      contact: {
        email: 'contact@myrecordingstudio.com',
        phone: '+16155551234'
      },
      equipment: ['Neumann U87', 'SSL Console', 'Pro Tools HD'],
      operatingHours: {
        monday: { open: '09:00', close: '18:00', closed: false },
        tuesday: { open: '09:00', close: '18:00', closed: false },
        wednesday: { open: '09:00', close: '18:00', closed: false },
        thursday: { open: '09:00', close: '18:00', closed: false },
        friday: { open: '09:00', close: '18:00', closed: false },
        saturday: { open: '10:00', close: '16:00', closed: false },
        sunday: { open: '', close: '', closed: true }
      }
    }
  })
});

const studio = await response.json();
```

### Updating a Studio
```javascript
const response = await fetch('/api/studios/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    data: {
      status: 'maintenance',
      description: 'Updated description with new equipment'
    }
  })
});

const updatedStudio = await response.json();
```

### Uploading an Image
```javascript
const formData = new FormData();
formData.append('image', fileInput.files[0]);

const response = await fetch('/api/studios/upload-image', {
  method: 'POST',
  body: formData
});

const uploadResult = await response.json();
```

## Notes

1. **File Uploads**: Images are stored in `public/uploads/studios/` directory
2. **Validation**: All endpoints include comprehensive validation
3. **Error Messages**: Detailed error messages help identify validation issues
4. **Performance**: Database indexes are created for frequently queried fields
5. **Security**: File uploads are validated for type and size
6. **Flexibility**: The API supports both file uploads and URL-based images
