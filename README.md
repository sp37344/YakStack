# YakStack

> An anonymous social media platform built for the decentralized web.

## Build Setup

The following instructions were adapted from Blockstack's todo application.

``` bash
# install dependencies
# previously we used yarn install. This is no longer supported.
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

```

### Running with the Blockstack Test Environment

First follow the above steps to setup the `YakStack` application. 

The `YakStack` is easiest to develop against a [`regtest`](https://bitcoin.org/en/glossary/regression-test-mode) bitcoin environment. There are a [couple of ways](https://github.com/blockstack/blockstack-core/tree/master/integration_tests#getting-started-with-docker) to setup the environment, but the easiest is through the [`docker`](https://www.docker.com/what-docker) setup. To use it first [install Docker](https://docs.docker.com/engine/installation/) and `docker-compose` (comes with the `docker` install on MacOS and Windows, but is a separate install on linux: `apt-get install docker-compose`)

To get started make sure you stop any running Blockstack applications:

- On MacOS: Exit the Blockstack App running in the menu bar. If you were using the CLI you will also need to run `blockstack api stop`
- On Windows: Exit the Blockstack App and stop any running containers.
- On Linux: Stop any containers running the browser or API and if you were using the CLI run `blockstack api stop`

Then you are ready to start up the test environment:

```bash
$ docker-compose up -d
```

The first time you run this command it will download the current stable docker images for [browser](https://quay.io/repository/blockstack/blockstack-browser) (~380MB) and the [integration test framework](https://quay.io/repository/blockstack/integrationtests) (~380MB). This may take a while depending on your internet connection.

The easiest way to work the regtest environment is in Incognito or Private Browsing mode in your browser. Open a private browsing window to [`localhost:8888`](http://localhost:8888) and setup your browser. In the first modal be sure to click `Advanced Pairing Mode`. Input the API Password as `blockstack_integration_test_api_password`:

![Add API Password](/static/api-password.png)

Choose the default storage option to get started quickly.

> Optional:

> While not necessary you may want to register a name in the regtest environment. There are bitcoins in the wallet associated with the `blockstack api`. To transfer them to the browser wallet for use navigate to the wallet tab and copy the address. I should look something like `19WWRiJwkEcqX7HsWUSDFfi8zpTRoMMfx1`.

> Then open a new tab to [`localhost:8888/wallet/send-core`](http://localhost:8888/wallet/send-core) and input the browser wallet address and `blockstack_integration_test_api_password` into the respective fields. Click send and wait for the modals to indicate that the transaction has been processed.

> You will see the balance in your browser wallet and can use that to purchase names.

After that, make sure you have started your `YakStack` application with the dev instructions in the first section. Open [`locahost:8080`](http://localhost:8080) and click the `Login` button. You will be redirected to a site on `blockstack.org` with a long auth string on the end:

```
https://blockstack.org/auth?authRequest=eyJ0eXAiOiJKV1QiLCJhbGciOi...
```

Edit the url to replace `https://blockstack.org` with `locahost:8888`:

```
locahost:8888/auth?authRequest=eyJ0eXAiOiJKV1QiLCJhbGciOi...
```

This will redirect you back to the browser to complete the signin flow. Now you have a full test environment ready to build Blockstack Apps.
