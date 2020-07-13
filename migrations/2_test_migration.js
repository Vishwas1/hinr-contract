const StableProofs = artifacts.require("StableProofs");
const CoinbaseOracle =  artifacts.require('CoinbaseOracle')
const { getAddress } = require('@harmony-js/crypto')

const adminAddressInEth = "0xA7E963339C977d14e17666BD91917a76fF9E3342"; // TODO;  This seems to a bug
const adminAddressInHrm =  getAddress(adminAddressInEth).bech32;
module.exports = async (deployer) => {
  // Deploy Oracle Contract first
  deployer.deploy(CoinbaseOracle, adminAddressInEth)
  const oracleInstance = await CoinbaseOracle.deployed();

  // Deploy the StableProof Contract
  deployer.deploy(StableProofs,
    "Harmony INR", // Name of token
    "HINR", // Symbol
    2, // decimals
    10000, // Total Supply
    oracleInstance.address, // coinbase contract address 
    adminAddressInEth, // admin account in Ethereum format; TODO: This needs to be fixed. It should take harmony address
    1); // admin fee
};


