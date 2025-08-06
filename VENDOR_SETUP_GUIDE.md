# Vendor API Setup Guide

## Overview
This guide will help you set up and test the Vendor API functionality in your Strapi application. The vendor system has been completely reworked to address previous issues and provide a robust, scalable solution.

## What's Been Fixed

### Previous Issues Resolved:
1. **Schema Mismatch**: Added missing fields (services, specialties, image, contact component)
2. **Data Validation**: Implemented comprehensive validation for all fields
3. **Error Handling**: Added proper error handling and meaningful error messages
4. **API Structure**: Enhanced controller with custom methods and better routing
5. **Type Safety**: Updated TypeScript definitions to match the actual schema
6. **Database Structure**: Created proper migration for database schema
7. **Testing**: Added comprehensive test suite for all endpoints

### New Features Added:
- Advanced filtering and search capabilities
- Rating and review system
- Business hours and pricing information
- Social media integration
- Location-based vendor discovery
- Comprehensive API documentation
- Automated testing suite

## Quick Start

### 1. Start the Strapi Server
```bash
npm run develop
```

### 2. Run Database Migrations
```bash
npm run migrate
```

### 3. Seed the Database with Sample Data
```bash
npm run seed:vendors
```

### 4. Test the API
```bash
npm run test:vendors
```

## File Structure

```
src/api/vendor/
├── content-types/vendor/schema.json    # Vendor data model
├── controllers/vendor.ts               # API controller with custom logic
├── routes/vendor.ts                    # Custom API routes
└── services/vendor.ts                  # Business logic and utilities

src/components/vendor/
└── contact-info.json                   # Contact information component

database/migrations/
└── 2024-01-01-000000-create-vendors-table.js  # Database migration

scripts/
├── seed-vendors.js                     # Data seeding script
└── test-vendor-api.js                  # API testing script

docs/
├── VENDOR_API_DOCUMENTATION.md         # Complete API documentation
└── VENDOR_SETUP_GUIDE.md              # This setup guide
```

## API Endpoints

### Core CRUD Operations
- `GET /api/vendors` - Get all vendors with filtering
- `GET /api/vendors/:id` - Get vendor by ID
- `POST /api/vendors` - Create new vendor
- `PUT /api/vendors/:id` - Update vendor
- `DELETE /api/vendors/:id` - Delete vendor

### Custom Endpoints
- `GET /api/vendors/active` - Get only active vendors
- `GET /api/vendors/search?query=term` - Search vendors
- `GET /api/vendors/location/:location` - Get vendors by location

## Data Model

### Required Fields
- `name` (string, 2-100 chars)
- `company` (string, max 100 chars)
- `location` (string, max 100 chars)
- `email` (valid email, unique)
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

## Validation Rules

### Email Validation
- Must be a valid email format
- Must be unique across all vendors
- Required field

### Status Validation
- Must be one of: `active`, `inactive`, `pending`
- Defaults to `pending` for new vendors

### Rating Validation
- Must be a number between 0 and 5
- Decimal precision of 2 places

### Name Validation
- Minimum 2 characters
- Maximum 100 characters
- Required field

## Error Handling

The API now provides comprehensive error handling:

### 400 Bad Request
- Missing required fields
- Invalid email format
- Duplicate email addresses
- Invalid status values
- Invalid rating values

### 404 Not Found
- Vendor not found by ID
- No vendors matching search criteria

### 500 Internal Server Error
- Database connection issues
- Server configuration problems

## Testing

### Automated Tests
Run the complete test suite:
```bash
npm run test:vendors
```

### Manual Testing
Test individual endpoints:
```bash
# Get all vendors
curl -X GET "http://localhost:1337/api/vendors"

# Get active vendors
curl -X GET "http://localhost:1337/api/vendors/active"

# Search vendors
curl -X GET "http://localhost:1337/api/vendors/search?query=photography"

# Create a vendor
curl -X POST "http://localhost:1337/api/vendors" \
  -H "Content-Type: application/json" \
  -d '{
    "data": {
      "name": "Test Vendor",
      "company": "Test Company",
      "location": "Singapore",
      "email": "test@example.com",
      "phone": "+65 1234 5678",
      "address": "123 Test Street",
      "contact": {
        "email": "test@example.com",
        "phone": "+65 1234 5678",
        "address": "123 Test Street"
      }
    }
  }'
```

## Troubleshooting

### Common Issues

#### 1. Server Not Starting
```bash
# Check if port 1337 is available
lsof -i :1337

# Kill process if needed
kill -9 <PID>
```

#### 2. Database Connection Issues
```bash
# Check database configuration in config/database.js
# Ensure database is running and accessible
```

#### 3. Migration Failures
```bash
# Rollback migrations
npm run migrate:rollback

# Re-run migrations
npm run migrate
```

#### 4. Seed Script Failures
```bash
# Check server is running
curl http://localhost:1337/api/health

# Check for duplicate emails in seed data
# Ensure all required fields are present
```

#### 5. API Test Failures
```bash
# Check server logs for errors
# Verify database schema is correct
# Ensure all migrations have been applied
```

### Debug Mode
Enable debug logging:
```bash
DEBUG=strapi:* npm run develop
```

### Database Reset
If you need to start fresh:
```bash
# Drop and recreate database
npm run migrate:rollback
npm run migrate
npm run seed:vendors
```

## Performance Considerations

### Database Indexes
The migration creates indexes on:
- `status` - For filtering active/inactive vendors
- `location` - For location-based searches
- `email` - For unique email lookups
- `rating` - For rating-based sorting

### Query Optimization
- Use pagination for large datasets
- Filter by status when possible
- Use specific field selection for large objects

### Caching
Consider implementing caching for:
- Frequently accessed vendor lists
- Search results
- Vendor details

## Security Considerations

### Input Validation
- All inputs are validated server-side
- SQL injection protection through Strapi ORM
- XSS protection through input sanitization

### Rate Limiting
Consider implementing rate limiting for:
- API endpoints
- Search functionality
- Vendor creation

### Authentication
Currently public endpoints, but ready for:
- JWT authentication
- Role-based access control
- API key authentication

## Deployment

### Production Checklist
- [ ] Update database configuration for production
- [ ] Set environment variables
- [ ] Configure CORS settings
- [ ] Set up SSL/TLS
- [ ] Configure logging
- [ ] Set up monitoring
- [ ] Test all endpoints in production environment

### Environment Variables
```bash
# Database
DATABASE_HOST=your-db-host
DATABASE_PORT=5432
DATABASE_NAME=your-db-name
DATABASE_USERNAME=your-username
DATABASE_PASSWORD=your-password

# Server
HOST=0.0.0.0
PORT=1337
NODE_ENV=production
```

## Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review server logs for error messages
3. Verify database schema matches expectations
4. Test with the provided test suite
5. Check API documentation for correct usage

## Contributing

When making changes to the vendor system:

1. Update the schema if adding new fields
2. Add corresponding validation rules
3. Update the test suite
4. Update API documentation
5. Test thoroughly before deployment

---

This vendor system is now production-ready with comprehensive error handling, validation, and testing. The previous issues have been resolved and the system is much more robust and maintainable. 