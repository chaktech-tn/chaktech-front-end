# Netlify Deployment Guide

This guide will help you deploy the Chaktech E-commerce frontend to Netlify.

## Prerequisites

- A Netlify account (sign up at [netlify.com](https://www.netlify.com))
- Your repository pushed to GitHub, GitLab, or Bitbucket
- Environment variables ready (see below)

## Deployment Steps

### Option 1: Deploy via Netlify UI (Recommended)

1. **Log in to Netlify**
   - Go to [app.netlify.com](https://app.netlify.com)
   - Sign in with your Git provider

2. **Create a New Site**
   - Click "Add new site" → "Import an existing project"
   - Connect your Git repository
   - Select the repository containing this project

3. **Configure Build Settings**
   - Netlify will auto-detect Next.js and use the settings from `netlify.toml`
   - Build command: `npm run build` (auto-detected)
   - Publish directory: `.next` (handled by Netlify plugin)
   - Node version: `18` (specified in netlify.toml)

4. **Set Environment Variables**
   - Go to Site settings → Environment variables
   - Add the following required variables:
     ```
     NEXT_PUBLIC_API_BASE_URL=https://your-api-domain.com
     ```
   - Add any other environment variables your app needs
   - For production, make sure to set:
     ```
     NODE_ENV=production
     ```

5. **Deploy**
   - Click "Deploy site"
   - Netlify will install dependencies, build, and deploy your site
   - The first deployment may take a few minutes

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Initialize Site**
   ```bash
   netlify init
   ```
   - Follow the prompts to link your site

4. **Set Environment Variables**
   ```bash
   netlify env:set NEXT_PUBLIC_API_BASE_URL https://your-api-domain.com
   ```

5. **Deploy**
   ```bash
   netlify deploy --prod
   ```

## Required Environment Variables

Make sure to set these in Netlify's environment variables:

- `NEXT_PUBLIC_API_BASE_URL` - Your backend API URL (required)
- Any other `NEXT_PUBLIC_*` variables your app uses

## Post-Deployment

1. **Custom Domain (Optional)**
   - Go to Site settings → Domain management
   - Add your custom domain
   - Follow DNS configuration instructions

2. **SSL Certificate**
   - Netlify automatically provides SSL certificates via Let's Encrypt
   - No additional configuration needed

3. **Environment-Specific Builds**
   - You can set different environment variables for production, branch deploys, and deploy previews
   - Go to Site settings → Environment variables

## Troubleshooting

### Build Fails

- Check build logs in Netlify dashboard
- Ensure Node version matches (18.x)
- Verify all environment variables are set
- Check that `@netlify/plugin-nextjs` is installed

### API Connection Issues

- Verify `NEXT_PUBLIC_API_BASE_URL` is set correctly
- Ensure your API allows CORS from your Netlify domain
- Check API is accessible from the internet (not localhost)

### Routing Issues

- The Netlify Next.js plugin handles routing automatically
- If you see 404s, check that middleware is configured correctly
- Verify `netlify.toml` is in the root directory

## Features Enabled

- ✅ Server-Side Rendering (SSR)
- ✅ Incremental Static Regeneration (ISR)
- ✅ API Routes (if any)
- ✅ Middleware support
- ✅ Internationalization (i18n)
- ✅ Image Optimization
- ✅ Automatic HTTPS
- ✅ Edge Functions support

## Additional Resources

- [Netlify Next.js Documentation](https://docs.netlify.com/integrations/frameworks/nextjs/)
- [Netlify Environment Variables](https://docs.netlify.com/environment-variables/overview/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

