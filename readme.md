# Serviette

Clean and simple API routes.

## Wot dis?

A template that compiles single-file functions into a complete Express server.

- TypeScript, complete access to `tsconfig.json`.
    - Recommend not to change the `compilerOptions.outDir` or the `include` options.
- Inspired somewhat by serverless functions, even though it's technically different.
    - Don't get confused, this is still an Express server, with a small layer of abstraction.
    - In contrast to serverless functions, each route isn't completely isolated.
        - Only the direct children files of the `/api` folder are converted to routes.
        - Subfolders can be used to share code across functions (e.g. typings, utilities, models, etc).
- All the files used to build the server are in `.build`
    - `server.js` - Runs the production server.
    - `Gulpfile.js` - In charge of the build scripts.

## Setup:
1. Create a project with `npx degit github:raghav-misra/serviette`.
2. Change the project `name` in `package.json`.
3. Run `npm i`

## Creating routes:
All `.ts` files that are direct children of the `/api` folder are converted to routes.

1. Create a file with a name like this: `[endpoint].[method].ts`
    - For example, `getUserByEmail.get.ts` would become the route `/getUserByEmail` and accept `GET` requests.
    - If all HTTP methods are allowed for a route, use `[endpoint].all.ts`.

2. Route names can be modified even more:
    - `auth.login.post.ts` would result in an endpoint `/auth/login` accepting `POST` requests.

3. Inside this file, export a function like the following:
    - ```ts
        import { Request } from "express";

        export default function endpointName (request: Request) {
            /* Super top-secret backend logic */

            return {
                code: 200, // HTTP status code
                data: { success: true } // Anything that can be converted to JSON.
            };
        }
        ```

## Building & Running:
- `npm run build`: Transpiles the routes from TypeScript to JavaScript.
- `npm run watch`: Transpiles the routes from TypeScript to JavaScript on-change.

- `npm run start`: Starts the production using the output from `npm run build`.
- `npm run dev`: Starts a dev server that restarts on file change.