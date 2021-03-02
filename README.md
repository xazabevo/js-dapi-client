# DAPI Client

[![NPM Version](https://img.shields.io/npm/v/@xazabevo/dapi-client)](https://www.npmjs.com/package/@xazabevo/dapi-client)
[![Build Status](https://travis-ci.com/xazabevo/js-dapi-client.svg?branch=master)](https://travis-ci.com/xazabevo/js-dapi-client)
[![Release Date](https://img.shields.io/github/release-date/xazabevo/js-dapi-client)](https://github.com/xazabevo/js-dapi-client/releases/latest)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen)](https://github.com/RichardLitt/standard-readme)

Client library used to access Xazab DAPI endpoints

This library enables HTTP-based interaction with the Xazab blockchain and Xazab
Platform via the decentralized API ([DAPI](https://github.com/xazabevo/dapi))
hosted on Xazab masternodes.

 - `DAPI-Client` provides automatic server (masternode) discovery using either a default seed node or a user-supplied one
 - `DAPI-Client` maps to DAPI's [RPC](https://github.com/xazabevo/dapi/tree/master/lib/rpcServer/commands) and [gRPC](https://github.com/xazabevo/dapi/tree/master/lib/grpcServer/handlers) endpoints

## Table of Contents
- [Install](#install)
- [Usage](#usage)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

## Install

```sh
npm install @xazabevo/dapi-client
```

## Usage

### Basic

```javascript
const DAPIClient = require('@xazabevo/dapi-client');
const client = new DAPIClient();

client.core.getStatus().then((coreStatus) => {
  console.dir(coreStatus);
});
```

### Custom seed node

Custom seed nodes are necessary for connecting the client to devnets since the client library is unaware of them otherwise.

```javascript
const DAPIClient = require('@xazabevo/dapi-client');

var client = new DAPIClient({
  seeds: [{
     host: 'seed-1.evonet.networks.xazab.xyz',
     httpPort: 3000,
     grpcPort: 3010,
  }],
});

client.core.getBestBlockHash().then((r) => {
  console.log(r);
});
```

**Note**: The seed node shown above (`seed-1.evonet.networks.xazab.xyz`) is for the Xazab Evonet testing network.

### Custom addresses

Custom addresses may be directly specified in cases where it is beneficial to know exactly what node(s) are being accessed (e.g. debugging, local development, etc.).

```javascript
const DAPIClient = require('@xazabevo/dapi-client');

var client = new DAPIClient({
  dapiAddresses: [
    '127.0.0.1:3000:3010',
    '127.0.0.2:3000:3010',
  ],
});

client.core.getBestBlockHash().then((r) => {
  console.log(r);
});
```

### Command specific options

DAPI Client options can be passed directly to any command to override any predefined client options and modify the client's behavior for that specific call.

```javascript
const DAPIClient = require('@xazabevo/dapi-client');

// Set options to direct the request to a specific address and disable retries
const options = {
  dapiAddresses: ['127.0.0.1'],
  retries: 0,
};

client.core.getBestBlockHash(options).then((r) => {
  console.log(r);
});
```

## Documentation

More extensive documentation available at https://xazabevo.github.io/js-dapi-client/.


## Contributing

Feel free to dive in! [Open an issue](https://github.com/xazabevo/js-dapi-client/issues/new/choose) or submit PRs.

## License

[MIT](LICENSE) &copy; Dash Core Group, Inc.
