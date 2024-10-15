// Import necessary modules from Hardhat
const hre = require("hardhat");

async function main() {
  // Address of the deployed contract
  const contractAddress = "";

  // Get the signer (your account)
  const [signer] = await hre.ethers.getSigners();

  // Create a contract instance
  const contractFactory = await hre.ethers.getContractFactory("MyERC721Token");
  const contract = contractFactory.attach(contractAddress);

  // Define the function name and parameters for the mint function
  const functionName = "mint";
  const recipient = "0x644429776367A1bDd8350D99897726B295D8fBcc"; // Replace with the actual recipient address

  // Encode the mint function data
  const encodedFunctionData = contract.interface.encodeFunctionData(functionName, [recipient]);

  // Send a transaction to mint a token in the contract
  const mintTokenTx = await signer.sendTransaction({
    to: contractAddress,
    data: encodedFunctionData,
    value: 0, // Assuming no Ether is being sent; adjust if necessary
  });

  // Wait for the transaction to be mined
  await mintTokenTx.wait();

  // Log the Transaction Receipt
  console.log("Transaction Receipt: ", mintTokenTx);
}

// Using async/await pattern to handle errors properly
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
