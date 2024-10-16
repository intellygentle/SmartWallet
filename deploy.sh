#!/bin/bash

# Prompt the user for the private key
read -sp "Enter your private key for deployment: " PRIVATE_KEY
echo

# Export the private key as an environment variable
export PRIVATE_KEY=$PRIVATE_KEY

# Deploy the contract using Hardhat
npx hardhat run --network sonic scripts/deploy.js
