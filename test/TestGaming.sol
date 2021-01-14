pragma solidity 0.6.12;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Gaming.sol";

contract TestGaming {
    uint public initialBalance = 10 ether;
    Gaming gaming;

    function beforeAll() public {
        gaming = Gaming(DeployedAddresses.Gaming());
    }

    function testPlayerWonGuessHigher() public {
        bool expected = true;
        bool result = gaming.determineWinner(5, 4, true);

        Assert.equal(expected, result, "The player should have won by guessing the mystery number was higher than their number");
    }

    function testPlayerWonGuessLower() public {
        bool expected = true;
        bool result = gaming.determineWinner(5, 6, false);

        Assert.equal(expected, result, "The player should have won by guessing the mystery number was lower than their number");
    }

    function testPlayerLostGuessLower() public {
        bool expected = false;
        bool result = gaming.determineWinner(5, 4, false);

        Assert.equal(expected, result, "The player should have lost by guessing the mystery number was lower than their number");
    }

    function testPlayerLostGuessHigher() public {
        bool expected = false;
        bool result = gaming.determineWinner(5, 6, true);

        Assert.equal(expected, result, "The player should have lost by guessing the mystery number was higher than their number");
    }

    function testGameIsOnline() public {
        bool online = gaming.online();

        Assert.isTrue(online, "The game should be initially online");
    }
}
