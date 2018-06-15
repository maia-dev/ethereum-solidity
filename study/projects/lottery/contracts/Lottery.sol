pragma solidity ^0.4.17;

contract Lottery {
  address public manager;
  address[] public players;

  function Lottery() public {
    manager = msg.sender;
  }

  function enter() public payable {
    require(msg.value > .01 ether);
    players.push(msg.sender);
  }

  function pickWinner() public restricted resetStateAfter {
    players[random() % players.length].transfer(address(this).balance);
  }

  function getPlayers() public view returns (address[]) {
    return players;
  }

  function random() private view returns (uint){
    return uint(keccak256(block.difficulty, now, players));
  }

  modifier resetStateAfter() {
    _;
    players = new address[](0);
  }

  modifier restricted() {
    require(msg.sender == manager);
    _;
  }
 }
