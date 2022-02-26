# GeEffektivt.se - Donation Widget

The Donation Widget is the payment user interface for donations via geeffektivt.se, the app is stored in a Google Cloud Storage bucket and is mounted into the website using tilda.cc. The widget is created with React and is written in TypeScript.

## Install

Install dependencies with yarn by running the following command in the root of the project:

```
yarn install
```

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Build and deployment

### Github actions

Deployment is handled by a [github action](https://github.com/features/actions) specified in .github/workflows/deploy.yml.
This action will checkout the code, run the tests, build the app and then upload the contents of the build-folder to a Google Cloud Storage bucket.

### Environments

| Environment | Google Cloud Bucket             | Backend API                                                                                                   | Tilda page | Deploy trigger          |
| ----------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------- | ---------- | ----------------------- |
| LIVE        | geeffektivt-se-frontend-ec5e8b5 | https://europe-west2-geeffektivt-se-live.cloudfunctions.net/                                                  | /ge        | Push to **main** branch |
| DEV         | geeffektivt-se-frontend-0e976eb | https://europe-west2-geeffektivt-se-dev.cloudfunctions.net                                                    | /dummy     | Push to **dev** branch  |
| LOCAL       | N/A                             | Mocked if REACT_APP_USE_DEV_DATA is true otherwise https://europe-west2-geeffektivt-se-dev.cloudfunctions.net | N/A        | N/A                     |

## Google Analytics & Facebook Pixel

There's a middleware responsible for posting messages in store.ts, and code in tilda that receives the messages and post it to GA/Facebook Pixel.
