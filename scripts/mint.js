
const { ethers } = require("hardhat");

async function main() {
    // Replace with the address where you deployed your MyToken contract
    const contractAddress = "";

    // Get the wallet to interact with the contract (the first account from the Hardhat node)
    const [deployer] = await ethers.getSigners();

    console.log("Interacting with the contract using the deployer account:", deployer.address);

    // ABI of the MyToken contract
    const contractABI = [
        "function mint100tokens() public",
        "function balanceOf(address account) view returns (uint256)"
    ];

    // Create a contract instance
    const myToken = new ethers.Contract(contractAddress, contractABI, deployer);

    // Call the mint100tokens function
    console.log("Minting 100 tokens...");
    const tx = await myToken.mint100tokens();
    await tx.wait(); // Wait for the transaction to be mined

    console.log("Minting successful!");

    
}

main().catch((error) => {
    console.error("Error minting tokens:", error);
    process.exitCode = 1;
});
