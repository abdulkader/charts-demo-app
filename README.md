# Charts Demo App Using Fred Series API

## Prerequisites

1. Node v18+

## Setup and Installation

1. Clone the repo
2. Copy `env-example` file to `.env` file
3. Obtain your API key by registering on the portal [https://fred.stlouisfed.org/](https://fred.stlouisfed.org/) and update the value in `.env` file `VITE_API_KEY` value field
4. Run `npm install` from the root of the project to install the dependencies
5. Run `npm run dev` to run the project in development mode and you can access the application at [http://localhost:3000/](http://localhost:3000/)
6. Run `npm run start` to run the project in production mode and you can access the application at [http://localhost:3000/](http://localhost:3000/)

### API Proxy to Aviod CORS

We are using [https://corsproxy.io/](https://corsproxy.io/) to bypass the CORS issues to the API. You can find more details on their website.

## Note

Currently the charts created are only stored to Localstorage and Not saved to any database at the moment. But the logic is there in place to call the API services to create/delete/update chart details.