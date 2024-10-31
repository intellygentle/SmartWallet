// scripts/deploy.js
const hre = require("hardhat");

async function main() {
    const TimelockController = await hre.ethers.getContractFactory("TimelockController");
    const timelockController = await TimelockController.deploy();
    await timelockController.waitForDeployment();


    console.log("TimelockController deployed to:", timelockController.target);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
