// Import necessary modules from Hardhat
const hre = require("hardhat");

// Function to send a transaction using the provided signer, destination, data, and value
const sendTransaction = async (signer, destination, data, value) => {
  // Construct and sign transaction with provided data
  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data,
    value,
  });
};

async function main() {
  // Address of the deployed contract
  const contractAddress = "";

  // Get the signer (your account)
  const [signer] = await hre.ethers.getSigners();

  // Create a contract instance
  const contractFactory = await hre.ethers.getContractFactory("MyToken");
  const contract = contractFactory.attach(contractAddress);

  // Send a transaction to execute a function in the contract
  const functionName = "transfer";
  const functionArgs = ["0x16af037878a6cAce2Ea29d39A3757aC2F6F7aac1", "10000000000000000000"];
  
  // Encode the function call data
  const data = contract.interface.encodeFunctionData(functionName, functionArgs);
  
  // Send the transaction
  const transaction = await sendTransaction(signer, contractAddress, data, 0);

  await transaction.wait();

  // It should return a TransactionResponse object
  console.log("Transaction Response: ", transaction);
}

// Using async/await pattern to handle errors properly
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
