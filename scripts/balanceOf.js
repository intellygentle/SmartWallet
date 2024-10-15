const hre = require("hardhat");

async function main() {
  // Address of the deployed contract
  const contractAddress = "";

  // Get the signer (your account)
  const [signer] = await hre.ethers.getSigners();

  // Create a contract instance
  const contractFactory = await hre.ethers.getContractFactory("MyToken");
  const contract = contractFactory.attach(contractAddress);

  // Define the address to check balance
  const addressToCheck = "";

  // Retrieve balance data from the contract
  const balance = await contract.balanceOf(addressToCheck);

  // Log the balance
  console.log(`Balance of ${addressToCheck}: ${balance.toString()}`);
}

// Using async/await pattern to handle errors properly
main().catch((error) => {
  console.error("Error fetching balance:", error);
  process.exitCode = 1;
});
