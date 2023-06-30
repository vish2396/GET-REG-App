module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    develop: {
        port: 8545
    },
  },
 /* contracts_directory: './smart-contracts/contracts/',
  contracts_directory: './smart-contracts/artifacts/contracts/',
  contracts_build_directory: './smart-contracts/contracts/',
  contracts_build_directory: './smart-contracts/artifacts/contracts/',
  compilers: {
    solc: {
      version: "0.8.0",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }*/
}
