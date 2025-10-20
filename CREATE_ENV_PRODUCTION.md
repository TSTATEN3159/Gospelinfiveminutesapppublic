# How to Create .env.production File

## For Local Xcode Builds

Create a file named `.env.production` in your project root directory with this content:

```bash
# Production Environment Configuration for iOS App
VITE_API_BASE_URL=https://daily-gospel-timothystaten.replit.app
```

That's it! Just one line is needed.

## Steps:

1. In your project folder, create a new file: `.env.production`
2. Add the line above
3. Save the file
4. Build your iOS app:
   ```bash
   npm run build
   npx cap sync ios
   npx cap open ios
   ```

The environment variable will be embedded in your app during build.

## Important Notes:

- The file should be named exactly `.env.production` (note the leading dot)
- Place it in the root of your project (same level as package.json)
- Don't commit this to Git - it's for local builds only
- For Appflow builds, use the Appflow environment configuration instead
