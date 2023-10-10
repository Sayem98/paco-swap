// get the contracts to deploy
const Pool = artifacts.require("Pool");
const BTCB = artifacts.require("BTCB");
const PACO = artifacts.require("PACO");
const LP = artifacts.require("LP");

module.exports = async function (deployer, network, accounts) {
  // deploy BTCB
  await deployer.deploy(BTCB);
  const btcb = await BTCB.deployed();
  console.log("BTCB address: ", btcb.address);

  // deploy PACO
  await deployer.deploy(PACO);
  const paco = await PACO.deployed();
  console.log("PACO address: ", paco.address);

  // deploy LP
  await deployer.deploy(LP);
  const lp = await LP.deployed();

  await deployer.deploy(Pool, btcb.address, paco.address, LP.address);
  const pool = await Pool.deployed();
  console.log("Pool address: ", pool.address);
};
