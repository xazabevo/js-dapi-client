const {
  v0: {
    GetTransactionRequest,
    CorePromiseClient,
  },
} = require('@xazabevo/dapi-grpc');

const grpcErrorCodes = require('@xazabevo/grpc-common/lib/server/error/GrpcErrorCodes');

/**
 * @param {GrpcTransport} grpcTransport
 * @returns {getTransaction}
 */
function getTransactionFactory(grpcTransport) {
  /**
   * Get Transaction by ID
   *
   * @typedef {getTransaction}
   * @param {string} id
   * @param {DAPIClientOptions} [options]
   * @returns {Promise<null|Buffer>}
   */
  async function getTransaction(id, options = {}) {
    const getTransactionRequest = new GetTransactionRequest();
    getTransactionRequest.setId(id);

    let response;
    try {
      response = await grpcTransport.request(
        CorePromiseClient,
        'getTransaction',
        getTransactionRequest,
        options,
      );
    } catch (e) {
      if (e.code === grpcErrorCodes.NOT_FOUND) {
        return null;
      }

      throw e;
    }

    const transactionBinaryArray = response.getTransaction();

    let transaction = null;
    if (transactionBinaryArray) {
      transaction = Buffer.from(transactionBinaryArray);
    }

    return transaction;
  }

  return getTransaction;
}

module.exports = getTransactionFactory;
