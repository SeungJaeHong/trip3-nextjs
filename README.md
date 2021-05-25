## About

Trip stack **FRONTEND** experiment built on [Next.js](https://nextjs.org/) and bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

See also the **BACKEND** part [https://github.com/kkallasm/trip3-laravel](https://github.com/kkallasm/trip3-laravel) -> works only as API

NOTE! It can be used with any other BACKEND system/framework which supports cookie/session based authentication.

## Demo

[https://tripstaging.eu](https://tripstaging.eu)

## Development

It's better to spin up API backend server before doing npm run's and stuff because some pages need SSR and API to build up.

### Installation

First, add API endpoint to .env file (generate if it doesn't exist):

```bash
LARAVEL_API_URL=http://localhost:8000 (when using laravel "php artisan serve")
```

Second, run the development server:

```bash
npm install
npm run dev
```
 - Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
 - Note: If backend and front are sitting on different domains then u need configure the cors params as well on backend side

## Production

```bash
LARAVEL_API_URL=https://someapiendpoint
```

```bash
npm install
npm run build
npm start
```
 - Note: It's recommended to use some sort of process manager e.g [pm2](https://pm2.keymetrics.io), supervisor etc..
 - Note: If backend and front are sitting on different domains then u need configure the cors params as well on backend side

## Internal API routes (not implemented and probably not needed)

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

Can be useful in the future to generate sidemap

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## TODO

 - better readme
 - Dockerfile
 - typescript types (any is used at the moment)
 - authentication with backend
 - LARAVEL_API_URL to more generic variable
 - ...
