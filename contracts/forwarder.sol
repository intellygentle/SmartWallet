// pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/access/Ownable.sol";

// contract AutomaticForwardingContract is Ownable {
//     address public timeLockAddress;
//     mapping(address => uint256) public balances;

//     event Deposited(address indexed wallet, uint256 amount);
//     event Forwarded(address indexed wallet, uint256 amount);

//     constructor(address _timeLockAddress) {
//         timeLockAddress = _timeLockAddress;
//     }

//     receive() external payable {
//         balances[msg.sender] += msg.value;
//         emit Deposited(msg.sender, msg.value);
        
//         // Automatically forward the deposited amount
//         forwardFunds(msg.sender);
//     }

//     function forwardFunds(address wallet) internal {
//         uint256 amount = balances[wallet];
//         require(amount > 0, "Wallet has no balance to forward");
        
//         balances[wallet] = 0;
//         (bool success, ) = timeLockAddress.call{value: amount}("");
//         if (!success) {
//             revert("Failed to forward funds");
//         }
//         emit Forwarded(wallet, amount);
//     }

//     function getBalance(address wallet) public view returns (uint256) {
//         return balances[wallet];
//     }
// }

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract AutomaticForwardingContract is Ownable {
    address public timeLockAddress;

    event Deposited(address indexed wallet, uint256 amount);
    event Forwarded(address indexed wallet, uint256 amount);

    constructor(address _timeLockAddress) {
        timeLockAddress = _timeLockAddress;
    }

    receive() external payable {
        emit Deposited(msg.sender, msg.value);
        
        // Automatically forward the deposited amount
        forwardFunds(msg.value);
    }

    function forwardFunds(uint256 amount) internal {
        (bool success, ) = timeLockAddress.call{value: amount}("");
        require(success, "Failed to forward funds");
        emit Forwarded(msg.sender, amount);
    }
}
