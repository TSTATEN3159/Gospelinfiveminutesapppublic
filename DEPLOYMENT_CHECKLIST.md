# Deployment Troubleshooting Checklist

## Your Current Issue
✅ Build works (npm run build succeeds)
✅ .replit file configured correctly (single port)
✅ Development secrets exist
❌ Production deployment starts but crashes

## What to Check in Replit Publishing Tool

### 1. Check Deployment Secrets
1. Go to **Publishing tool** → **Settings** tab
2. Look for **"Secrets"** or **"Environment Variables"** section
3. **Verify these secrets exist in production**:
   - `VITE_API_BIBLE_KEY` (required)
   - `DATABASE_URL` (should auto-configure)
   - `API_BIBLE_KEY` (required)

**If missing**: Click "Add secret" and copy values from your development Secrets

### 2. Check Full Deployment Logs
1. In **Publishing tool** → **Overview** tab
2. Click **"View publish logs"**
3. **Look for errors AFTER** the SENDGRID warning
4. Common errors to look for:
   - "Cannot find module"
   - "Connection refused"
   - "Missing environment variable"
   - Any stack traces

### 3. Check Database Connection
1. In **Publishing tool** → **Settings** tab
2. Look for **"Database"** section
3. Verify production database is linked
4. **Production uses a DIFFERENT database than development!**

### 4. Check Build Output
In the deployment logs, you should see:
```
✓ vite build succeeded
✓ esbuild completed
serving on port 5000    <-- THIS LINE IS MISSING!
```

If "serving on port 5000" never appears, the server is crashing during startup.

## Most Likely Causes

### Cause 1: Missing Production Secrets
**Fix**: Manually add secrets to production deployment
1. Publishing tool → Settings → Secrets
2. Add each secret with same values as development

### Cause 2: Database Not Connected
**Fix**: Link production database
1. Publishing tool → Settings → Database
2. Enable/link production database
3. Verify `DATABASE_URL` is available

### Cause 3: Build Files Not Found
**Fix**: Ensure build completes
1. Check deployment logs for build errors
2. Verify `dist/public/index.html` exists after build

### Cause 4: Import/Module Errors
**Fix**: Check for missing dependencies
1. Look for "Cannot find module" errors in logs
2. Verify all packages are in `dependencies` (not `devDependencies`)

## Next Steps

1. **Check deployment logs** - Look for the FULL error message
2. **Verify secrets** - Make sure production has all required secrets
3. **Check database** - Confirm production database is linked
4. **Share full logs** - If still stuck, share complete deployment logs (not just the SENDGRID line)

## Expected Deployment Log (Success)
```
SENDGRID_API_KEY environment variable not set - email functionality will be disabled
Health check failed for database: ...
Attempting auto-recovery for database: ...
[express] serving on port 5000    <-- Should see this!
App health status: healthy
```

If you don't see "serving on port 5000", the server crashed before starting.
