## DAPI-Client

[![NPM Version](https://img.shields.io/npm/v/@xazabevo/dapi-client)](https://www.npmjs.com/package/@xazabevo/dapi-client)
[![Build Status](https://travis-ci.com/xazabevo/dapi-client.svg?branch=master)](https://travis-ci.com/xazabevo/dapi-client)
[![Release Date](https://img.shields.io/github/release-date/xazabevo/dapi-client)](https://github.com/xazabevo/dapi-client/releases/latest)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen)](https://github.com/RichardLitt/standard-readme)

Client library used to access Xazab DAPI endpoints

This library enables HTTP-based interaction with the Xazab blockchain and Xazab
Platform via the decentralized API ([DAPI](https://github.com/xazabevo/dapi))
hosted on Xazab masternodes.

 - `DAPI-Client` provides automatic server (masternode) discovery using either a default seed node or a user-supplied one
 - `DAPI-Client` maps to DAPI's [RPC](https://github.com/xazabevo/dapi/tree/master/lib/rpcServer/commands) and [gRPC](https://github.com/xazabevo/dapi/tree/master/lib/grpcServer/handlers) endpoints

### Install

### ES5/ES6 via NPM

In order to use this library in Node, you will need to add it to your project as a dependency.

Having [NodeJS](https://nodejs.org/) installed, just type in your terminal :

```sh
npm install @xazabevo/dapi-client
```

### CDN Standalone

For browser usage, you can also directly rely on unpkg :

```
<script src="https://unpkg.com/@xazabevo/dapi-client"></script>
```


## Licence

[MIT](https://github.com/xazabevo/dapi-client/blob/master/LICENCE.md) © Dash Core Group, Inc.
