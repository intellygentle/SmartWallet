require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
// Remember to use the private key of a testing account
// For better security practices, it's recommended to use npm i dotenv for storing secret variables



module.exports = {
  //  https://rpc.ankr.com/fantom,
  solidity: "0.8.19",
  networks: {
    sonic: {
      url: "https://rpc.testnet.soniclabs.com",
      accounts: [`0x` + `${process.env.PRIVATE_KEY}`],
    },
  },
};


// require("@nomicfoundation/hardhat-toolbox");

// // Replace this private key with your Sonic account private key
// const SONIC_PRIVATE_KEY = "YOUR SONIC TEST ACCOUNT PRIVATE KEY";

// module.exports = {
//   solidity: "0.8.19",
//   networks: {
//     sonic: {
//       url: "https://rpc.testnet.soniclabs.com",
//       accounts: [SONIC_PRIVATE_KEY]
//     }
//   }
// };