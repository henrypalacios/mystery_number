pragma solidity 0.6.12;

contract Gaming {
/* Our Online gaming contract*/
    address owner;
    bool public online ;
    struct Player  {
        address player;        
        string playerName;     
        uint playerBalance;    
        uint wins;             
        uint losses;           
    }                          
    mapping(uint => Player) public players;    
    
    /*Player public player;*/

    constructor() public {
        owner = msg.sender;
        online = true;
        players[0] = Player(msg.sender, "Test Player", 0, 1, 2);
    }
    
    event PlayerWon(address player, uint value);
    
    function winOrLose(uint display, bool guess, uint wager) 
    external payable returns (bool) {
        require(online==true);
        require(msg.sender.balance > msg.value, "Insufficient funds");
        uint mysteryNumber_ = mysteryNumber();
        bool isWinner = determineWinner(mysteryNumber_, display, guess);
        if (isWinner == true) {
          /* Player won */
          emit PlayerWon(msg.sender, msg.value);
          msg.sender.transfer(wager*2);
          return true;
        } else if (isWinner == false) {
          /* Player lost */
          return false;
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
}
