// scripts/deploy.js
require("dotenv").config();
const { ethers } = require("hardhat");

async function main() {
  // Fetch the TimelockController address from the .env file
  const timelockAddress = process.env.TIMELOCK_ADDRESS;

  if (!timelockAddress) {
    throw new Error("TIMELOCK_ADDRESS is not defined in the .env file");
  }

  // Get the contract factory
  const AutomaticForwardingContract = await ethers.getContractFactory("AutomaticForwardingContract");

  // Deploy the contract with the specified TimelockController address
  console.log("Deploying AutomaticForwardingContract...");
  const autoForwarder = await AutomaticForwardingContract.deploy(timelockAddress);

  // Wait for deployment to complete
  await autoForwarder.waitForDeployment();
  console.log("AutomaticForwardingContract deployed to:", autoForwarder.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


//   AutomaticForwardingContract deployed to: 0x3DA337eF70be8aCc1E91C3C62982cBbAf3493C10