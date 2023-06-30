var Migrations = artifacts.require("GreenEnergyToken.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations, { gas: 5000000 });
};
