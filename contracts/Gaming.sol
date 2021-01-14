pragma solidity 0.6.12;

contract Gaming {
/* Our Online gaming contract*/
    address owner;
    bool public online ;
    struct Player  {
        uint wins;             
        uint losses;           
    }                          
    mapping(address => Player) public players;    
    
    /*Player public player;*/

    constructor() public {
        owner = msg.sender;
        online = true;
    }

    modifier isOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    event PlayerWon(address player, uint value, uint mysteryNumber, uint displayNumber);
    event PlayerLost(address player, uint value, uint mysteryNumber, uint displayNumber);
    event GameFunded(address funder, uint value);
    
    /* TODO: Fix when the mysteryNumber is equal to display*/
    function winOrLose(uint display, bool guess)
    external payable returns (bool, uint) {
        require(online==true);
        require(msg.sender.balance > msg.value, "Insufficient funds");
        uint mysteryNumber_ = mysteryNumber();
        bool isWinner = determineWinner(mysteryNumber_, display, guess);
        Player storage player = players[msg.sender];
        if (isWinner == true) {
          /* Player won */
          player.wins += 1; 
          emit PlayerWon(msg.sender, msg.value, mysteryNumber_, display);
          msg.sender.transfer(msg.value*2);
          return (true, mysteryNumber_);
        } else if (isWinner == false) {
          /* Player lost */
          player.losses += 1;
          emit PlayerLost(msg.sender, msg.value, mysteryNumber_, display);
          return (false, mysteryNumber_);
        }
    }
    
    function mysteryNumber() private view returns (uint) {
        uint randomNumber = uint(blockhash(block.number - 1)) % 10 + 1;
        return randomNumber;
    }
    
    function determineWinner(uint number, uint display, bool guess)
    public pure returns (bool) {
        /* Use true for higher guess, false for a lower guess */
    
        if (guess == true) {
            if (number > display ) {
                return true;
            }
            if (number < display) {
                return false;
            }
        } else if (guess == false) {
            if (number > display ) {
                return false;
            }
            if (number < display) {
                return true;
            }
        }
    }

    function withdrawFunds() public isOwner  {
        msg.sender.transfer(address(this).balance);
    }

    function fundGame() public isOwner payable {
        emit GameFunded(msg.sender, msg.value);
    }
}
