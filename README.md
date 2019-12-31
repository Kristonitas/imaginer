This project is used to generate images to be used in mocks

## Scripts

-   `tsc` Compiles the app in preparation of production launch
-   `dev` Starts `ts-node-dev`, which compiles typescript without generating files, reloads on changes and launches `index.ts` (which is an `express` server in this case)
-   `prod` Compiles the app and launches it (from `dist/index.js`)

## Dependencies

-   `express` Backend server to easily get access to request information (path, query), have different routes, etc.
-   `typescript` Have types
-   `ts-node-dev` Since this is a node **server** and not source code for web app, we don't use a bundler. Therefore we need to compile typescript before running `index.ts` on our own. On production this will happen with `npm run tsc`, but while developing it is more convenient to have it auto recompile when files have changed
