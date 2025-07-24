// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PayMeNow {
    address public owner;
    event PaymentReceived(address indexed from, uint256 amount, string memo);

    constructor() {
        owner = msg.sender;
    }

    function pay(string memory memo) public payable {
        require(msg.value > 0, "Send some ETH");
        emit PaymentReceived(msg.sender, msg.value, memo);
    }

    function withdraw() public {
        require(msg.sender == owner, "Not owner");
        payable(owner).transfer(address(this).balance);
    }
}
