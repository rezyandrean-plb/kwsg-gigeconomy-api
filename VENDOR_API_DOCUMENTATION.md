# Vendor API Documentation

## Overview
The Vendor API provides comprehensive CRUD operations and specialized endpoints for managing vendor data in the gig economy platform.

## Base URL
```
http://localhost:1337/api
```

## Authentication
Most endpoints are public, but some may require authentication in the future.

## Endpoints

### 1. Get All Vendors
**GET** `/vendors`

**Query Parameters:**
- `status` (optional): Filter by status (`active`, `inactive`, `pending`)
- `location` (optional): Filter by location (case-insensitive search)
- `services` (optional): Filter by services (JSON array)
- `pagination[page]` (optional): Page number (default: 1)
- `pagination[pageSize]` (optional): Items per page (default: 25)
- `sort` (optional): Sort field (default: `createdAt:desc`)

**Example:**
```bash
curl -X GET "http://localhost:1337/api/vendors?status=active&location=Singapore&pagination[page]=1&pagination[pageSize]=10"
```

**Response:**
```json
{
  "data": [
    {
      "id": 1,
      "name": "TUBEAR",
      "company": "TUBEAR",
      "location": "Singapore",
      "status": "active",
      "description": "Specializing in virtual staging...",
      "services": ["virtual-staging", "photography"],
      "specialties": ["Virtual Staging", "Digital Decluttering"],
      "email": "hello@tubear.sg",
      "phone": "+65 9123 4567",
      "address": "Singapore",
      "rating": 4.8,
      "reviews_count": 15,
      "website": "https://tubear.sg",
      "contact": {
        "id": 1,
        "email": "hello@tubear.sg",
        "phone": "+65 9123 4567",
        "address": "Singapore"
      },
      "createdAt": "2024-01-15T00:00:00.000Z",
      "updatedAt": "2024-01-20T00:00:00.000Z",
      "publishedAt": "2024-01-15T00:00:00.000Z"
    }
  ],
  "meta": {
    "filters": {
      "status": "active",
      "location": "Singapore"
    },
    "pagination": {
      "page": 1,
      "pageSize": 10
    }
  }
}
```

### 2. Get Vendor by ID
**GET** `/vendors/:id`

**Example:**
```bash
curl -X GET "http://localhost:1337/api/vendors/1"
```

**Response:**
```json
{
  "data": {
    "id": 1,
    "name": "TUBEAR",
    "company": "TUBEAR",
    "location": "Singapore",
    "status": "active",
    "description": "Specializing in virtual staging...",
    "services": ["virtual-staging", "photography"],
    "specialties": ["Virtual Staging", "Digital Decluttering"],
    "email": "hello@tubear.sg",
    "phone": "+65 9123 4567",
    "address": "Singapore",
    "rating": 4.8,
    "reviews_count": 15,
    "website": "https://tubear.sg",
    "social_media": {
      "facebook": "https://facebook.com/tubear",
      "instagram": "https://instagram.com/tubear"
    },
    "business_hours": {
      "monday": "9:00 AM - 6:00 PM",
      "tuesday": "9:00 AM - 6:00 PM"
    },
    "pricing": {
      "virtual_staging": "$200-500",
      "photography": "$150-300"
    },
    "contact": {
      "id": 1,
      "email": "hello@tubear.sg",
      "phone": "+65 9123 4567",
      "address": "Singapore"
    },
    "createdAt": "2024-01-15T00:00:00.000Z",
    "updatedAt": "2024-01-20T00:00:00.000Z",
    "publishedAt": "2024-01-15T00:00:00.000Z"
  }
}
```

### 3. Create Vendor
**POST** `/vendors`

**Request Body:**
```json
{
  "data": {
    "name": "New Vendor",
    "company": "New Company",
    "location": "Singapore",
    "status": "pending",
    "description": "A new vendor description",
    "services": ["photography", "videography"],
    "specialties": ["Professional Photography", "Video Production"],
    "email": "contact@newvendor.sg",
    "phone": "+65 9123 4567",
    "address": "123 Main Street, Singapore",
    "website": "https://newvendor.sg",
    "contact": {
      "email": "contact@newvendor.sg",
      "phone": "+65 9123 4567",
      "address": "123 Main Street, Singapore"
    }
  }
}
```

**Example:**
```bash
curl -X POST "http://localhost:1337/api/vendors" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "name": "New Vendor",
      "company": "New Company",
      "location": "Singapore",
      "email": "contact@newvendor.sg",
      "phone": "+65 9123 4567",
      "address": "123 Main Street, Singapore",
      "contact": {
        "email": "contact@newvendor.sg",
        "phone": "+65 9123 4567",
        "address": "123 Main Street, Singapore"
      }
    }
  }'
```

### 4. Update Vendor
**PUT** `/vendors/:id`

**Request Body:**
```json
{
  "data": {
    "name": "Updated Vendor Name",
    "status": "active",
    "rating": 4.5,
    "reviews_count": 10
  }
}
```

**Example:**
```bash
curl -X PUT "http://localhost:1337/api/vendors/1" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "status": "active",
      "rating": 4.5
    }
  }'
```

### 5. Delete Vendor
**DELETE** `/vendors/:id`

**Example:**
```bash
curl -X DELETE "http://localhost:1337/api/vendors/1"
```

### 6. Get Active Vendors
**GET** `/vendors/active`

**Example:**
```bash
curl -X GET "http://localhost:1337/api/vendors/active"
```

### 7. Search Vendors
**GET** `/vendors/search?query=search_term`

**Example:**
```bash
curl -X GET "http://localhost:1337/api/vendors/search?query=photography"
```

### 8. Get Vendors by Location
**GET** `/vendors/location/:location`

**Example:**
```bash
curl -X GET "http://localhost:1337/api/vendors/location/Singapore"
```

## Data Validation

### Required Fields
- `name` (string, min 2 chars, max 100 chars)
- `company` (string, max 100 chars)
- `location` (string, max 100 chars)
- `email` (valid email format, unique)
- `phone` (string, max 20 chars)
- `address` (text, max 200 chars)
- `contact` (component with email, phone, address)

### Optional Fields
- `status` (enum: active, inactive, pending)
- `description` (text)
- `services` (JSON array)
- `specialties` (JSON array)
- `image` (string, max 255 chars)
- `rating` (decimal, 0-5)
- `reviews_count` (integer, min 0)
- `website` (string, max 255 chars)
- `social_media` (JSON object)
- `business_hours` (JSON object)
- `pricing` (JSON object)

## Error Responses

### 400 Bad Request
```json
{
  "error": {
    "status": 400,
    "name": "BadRequestError",
    "message": "Missing required fields: name, company, email, phone, address"
  }
}
```

### 404 Not Found
```json
{
  "error": {
    "status": 404,
    "name": "NotFoundError",
    "message": "Vendor not found"
  }
}
```

### 500 Internal Server Error
```json
{
  "error": {
    "status": 500,
    "name": "InternalServerError",
    "message": "Error fetching vendors",
    "details": {
      "error": "Database connection error"
    }
  }
}
```

## Testing

### Using the Seed Script
```bash
# Start the Strapi server
npm run develop

# In another terminal, run the seed script
node scripts/seed-vendors.js
```

### Manual Testing with curl
```bash
# Get all vendors
curl -X GET "http://localhost:1337/api/vendors"

# Get active vendors
curl -X GET "http://localhost:1337/api/vendors/active"

# Search for vendors
curl -X GET "http://localhost:1337/api/vendors/search?query=photography"

# Get vendors by location
curl -X GET "http://localhost:1337/api/vendors/location/Singapore"
```

## Notes
- All timestamps are in ISO 8601 format
- JSON fields (services, specialties, social_media, business_hours, pricing) should be properly formatted
- The contact component is automatically populated when creating/updating vendors
- Email addresses must be unique across all vendors
- Status changes are validated to ensure only valid values are accepted 