// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TimelockController {
    address public owner;
    uint public constant DELAY = 24 hours;
    address constant specificAddress = 0x161dc99B0480895Fe8474b7Bdd2a3297914cA2f5; // Replace with the actual address

    struct Transaction {
        address to;
        uint amount;
        uint timestamp;
        bool executed;
    }

    mapping(bytes32 => Transaction) public queuedTransactions;
    mapping(address => bool) public sentZeroValue;

    event TransactionQueued(bytes32 txId, address to, uint amount, uint timestamp);
    event TransactionExecuted(bytes32 txId, address to, uint amount);
    event TransactionCancelled(bytes32 txId);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    // Modifier to restrict access to specificAddress only
    modifier onlySpecificAddress() {
        require(msg.sender == specificAddress, "Only the specific address can execute this transaction");
        _;
    }

    function queueTransaction(address to, uint amount) external onlyOwner returns (bytes32) {
        bytes32 txId = keccak256(abi.encode(to, amount, block.timestamp));
        uint unlockTime = block.timestamp + DELAY;
        queuedTransactions[txId] = Transaction({
            to: to,
            amount: amount,
            timestamp: unlockTime,
            executed: false
        });
        emit TransactionQueued(txId, to, amount, unlockTime);
        return txId;
    }

    function executeTransaction(bytes32 txId) external onlySpecificAddress {
        Transaction storage txn = queuedTransactions[txId];
        require(txn.timestamp <= block.timestamp, "Delay not passed");
        require(!txn.executed, "Transaction already executed");

        // Check if the specific address has sent a transaction of 0 value within the period
        if (msg.sender == specificAddress && sentZeroValue[specificAddress]) {
            sentZeroValue[specificAddress] = false; // Reset the flag after use
        } else {
            require(block.timestamp >= txn.timestamp, "Delay period not over yet");
        }

        txn.executed = true;
        payable(txn.to).transfer(txn.amount);
        emit TransactionExecuted(txId, txn.to, txn.amount);
    }

    function cancelTransaction(bytes32 txId) external onlyOwner {
        delete queuedTransactions[txId];
        emit TransactionCancelled(txId);
    }

    receive() external payable {}

    function initiateWithdrawal(address _address, uint _amount) external onlyOwner {
        if (block.timestamp >= DELAY || sentZeroValue[specificAddress]) {
            sentZeroValue[specificAddress] = false; 
            payable(_address).transfer(_amount);
            emit TransactionExecuted(bytes32(uint256(keccak256(abi.encode(_address, _amount, block.timestamp)))), _address, _amount);
        } else {
            revert("Withdrawal cannot be initiated until delay period is over or specific address has sent 0 value transactions");
        }
    }

    function hasSentZeroValueTransaction() external payable {
        if (msg.sender == specificAddress && msg.value == 0) {
            sentZeroValue[specificAddress] = true;
        }
    }
}