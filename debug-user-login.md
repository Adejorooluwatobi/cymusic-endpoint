# Debug User Login Issue

## The Problem
User login fails with "Invalid email or password" while other roles work fine.

## Root Cause
Your database has separate tables for each user type:
- `User` table for regular users
- `Admin` table for admins  
- `SuperAdmin` table for super admins
- `Artist` table for artists

The `AuthService.loginUser()` method only searches in the `User` table, but your test user might have been created in a different table.

## Quick Fix - Check which table your user is in:

1. **Check if user exists in User table:**
   ```sql
   SELECT * FROM "User" WHERE email = 'Adejorotogold1@hotmail.com';
   ```

2. **Check if user exists in other tables:**
   ```sql
   SELECT * FROM "Admin" WHERE email = 'Adejorotogold1@hotmail.com';
   SELECT * FROM "SuperAdmin" WHERE email = 'Adejorotogold1@hotmail.com';  
   SELECT * FROM "Artist" WHERE email = 'Adejorotogold1@hotmail.com';
   ```

## Solution Options:

### Option 1: Create user in correct table
Use the `/users` endpoint (not `/auth/user/register`) to create a regular user:
```
POST /users
{
  "email": "Adejorotogold1@hotmail.com",
  "password": "Password#",
  "displayName": "MR USER"
}
```

### Option 2: Use correct login endpoint
If your user was created as an admin/artist/superAdmin, use the corresponding login endpoint:
- `/auth/admin/login` for admin users
- `/auth/artist/login` for artist users  
- `/auth/super-admin/login` for super admin users

## Verification:
After creating a user via `/users` endpoint, try logging in with `/auth/user/login`