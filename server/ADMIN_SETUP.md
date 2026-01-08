# Admin User Setup

This document describes how to create and use the admin user account for the CyberStore application.

## Admin Credentials

**Email:** `admin`  
**Password:** `Detroit1977!!`  
**Role:** `admin`  
**Privileges:** Full access to all application features

## Creating the Admin User

To create the admin user in the database, run the following command from the server directory:

```bash
cd server
npm run create-admin
```

This script will:
- Connect to the MongoDB database
- Create an admin user with the specified credentials (if it doesn't exist)
- Update the admin user credentials (if it already exists)
- Grant full privileges (admin role, pro subscription tier)

## Using Admin Credentials

### Login via API

```bash
curl -X POST http://localhost:8000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin",
    "password": "Detroit1977!!"
  }'
```

### Login via Web Interface

1. Navigate to the login page
2. Enter email: `admin`
3. Enter password: `Detroit1977!!`
4. Click "Login"

## Admin Privileges

The admin user has the following privileges:
- Full access to all products and categories
- User management capabilities
- Order management
- Access to all subscription tiers (pro level)
- Active status (account enabled)

## Security Notes

⚠️ **Important Security Considerations:**

1. **Change Default Password:** In production environments, change the default password immediately after first login.
2. **Secure Storage:** Never commit actual admin passwords to version control.
3. **Use Environment Variables:** Consider using environment variables for admin credentials in production.
4. **Strong Password Policy:** Ensure the password meets your organization's security requirements.

## Troubleshooting

### Admin User Already Exists

If the admin user already exists, the script will update its credentials to match the specified password and ensure admin privileges are set.

### Database Connection Issues

Ensure that:
1. MongoDB is running
2. The `MONGODB_URI` environment variable is correctly set in the `.env` file
3. Network connectivity to the database is available

### Permission Issues

The admin role is set to `'admin'` which provides full access. Ensure that your application's middleware properly checks for this role when implementing admin-only features.
