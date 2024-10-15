
const hre = require("hardhat");

async function main() {
  const network = hre.network.name; // Automatically detect network from Hardhat
  const provider = hre.ethers.provider; // Use Hardhat's provider

  const CONTRACT_ADDRESS = "0x145025D9e18F1532386A215de17ad3cdBA3Fcc39"; // Replace with your contract's address
  const CONTRACT_ABI = require("").abi;

  // Get the signer from Hardhat's configured private key
  const [signer] = await hre.ethers.getSigners();

  // Create a contract instance
  const contract = new hre.ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

  console.log(`Interacting with contract at ${CONTRACT_ADDRESS} on ${network}`);

  // Example: Now you can call functions on the contract
  // const result = await contract.someFunction();

  async function claimTokens() {
    const tx = await contract.claim();
    console.log("Claiming tokens...");
    await tx.wait(); // Wait for the transaction to be mined
    console.log("Tokens claimed successfully.");
  }
  
  claimTokens();

  
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
