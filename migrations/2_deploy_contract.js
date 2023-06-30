const GreenEnergyToken = artifacts.require("GreenEnergyToken");

module.exports = function(deployer) {
  deployer.deploy(GreenEnergyToken);
};