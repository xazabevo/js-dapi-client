const MNDiscoveryService = require('./MNDiscovery/index');
const { block: blockApi } = require('./index');
const dashQuorums = require('quorums-dash');

const QuorumService = {
  async getQuorumForUser(userRegTxId) {
    const bestBlockHeight = await blockApi.getBestBlockHeight();
    const refHeight = dashQuorums.getRefHeight(bestBlockHeight);
    const refBlockHash = await blockApi.getBlockHash(refHeight);
    const MNList = MNDiscoveryService.getMNList();
    return dashQuorums.getQuorum(MNList, refBlockHash, userRegTxId);
  },
};

module.exports = QuorumService;