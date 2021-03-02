const {
  v0: {
    PlatformPromiseClient,
    GetDataContractRequest,
    GetDataContractResponse,
  },
} = require('@xazabevo/dapi-grpc');

const getDataContractFixture = require('@xazabevo/dpp/lib/test/fixtures/getDataContractFixture');
const grpcErrorCodes = require('@xazabevo/grpc-common/lib/server/error/GrpcErrorCodes');

const getDataContractFactory = require('../../../../lib/methods/platform/getDataContractFactory');

describe('getDataContractFactory', () => {
  let grpcTransportMock;
  let getDataContract;
  let options;
  let response;
  let dataContractFixture;

  beforeEach(function beforeEach() {
    dataContractFixture = getDataContractFixture();

    response = new GetDataContractResponse();
    response.setDataContract(dataContractFixture.toBuffer());

    grpcTransportMock = {
      request: this.sinon.stub().resolves(response),
    };

    options = {
      timeout: 1000,
    };

    getDataContract = getDataContractFactory(grpcTransportMock);
  });

  it('should return data contract', async () => {
    const contractId = dataContractFixture.getId();
    const result = await getDataContract(contractId, options);

    const request = new GetDataContractRequest();
    request.setId(contractId);

    expect(grpcTransportMock.request.getCall(0).args).to.have.deep.members([
      PlatformPromiseClient,
      'getDataContract',
      request,
      options,
    ]);
    expect(result).to.deep.equal(dataContractFixture.toBuffer());
  });

  it('should return null if data contract not found', async () => {
    const error = new Error('Nothing found');
    error.code = grpcErrorCodes.NOT_FOUND;

    grpcTransportMock.request.throws(error);

    const contractId = dataContractFixture.getId();

    const result = await getDataContract(contractId, options);

    const request = new GetDataContractRequest();
    request.setId(contractId);

    expect(grpcTransportMock.request.getCall(0).args).to.have.deep.members([
      PlatformPromiseClient,
      'getDataContract',
      request,
      options,
    ]);
    expect(result).to.equal(null);
  });

  it('should throw unknown error', async () => {
    const error = new Error('Unknown found');
    const contractId = dataContractFixture.getId();

    grpcTransportMock.request.throws(error);

    const request = new GetDataContractRequest();
    request.setId(contractId.toBuffer());

    try {
      await getDataContract(contractId, options);

      expect.fail('should throw unknown error');
    } catch (e) {
      expect(e).to.deep.equal(error);
      expect(grpcTransportMock.request).to.be.calledOnceWithExactly(
        PlatformPromiseClient,
        'getDataContract',
        request,
        options,
      );
    }
  });
});
