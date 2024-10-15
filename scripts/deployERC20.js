

const hre = require("hardhat");

async function main() {
  // Define the constructor arguments
  const name = "IntellCoin";
  const symbol = "ICO";

  // Deploy the contract with constructor arguments
  const contract = await hre.ethers.deployContract("WeightedVoting", [name, symbol]);

  await contract.waitForDeployment();

  console.log(`deployed to ${contract.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
