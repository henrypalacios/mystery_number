import GameContractMeta from "./artifacts/Gaming.json";

let instance = null;

class GameContract {
  /**
   * @param {Web3} web3
   * @param {string} networkId // Ej. "5717"
   * @param {Array} accounts
   **/
  constructor(web3, networkId, accounts) {
    this._ROUND_TYPE_EVENT = { PlayerWon: "Win", PlayerLost: "Lost" };
    this.web3 = web3;
    this.accounts = accounts;
    this.deployedNetwork = GameContractMeta.networks[networkId];
    this.contract = new this.web3.eth.Contract(
      GameContractMeta.abi,
      this.deployedNetwork && this.deployedNetwork.address
    );

    return this;
  }

  static async build(web3, networkId) {
    if (!instance) {
      const accounts = await web3.eth.getAccounts();
      if (!accounts.length) {
        throw new Error("There isn't any account to spend Ether...");
      }

      web3.eth.defaultAccount = accounts[0];
      instance = new GameContract(web3, networkId, accounts);
    }

    return instance;
  }

  /**
   * @param {int} displayedNumber
   * @param {Boolean} guess // Guess is if higher that a mystery number
   * @param {Number} wager
   * @returns {Object}
   **/
  async winOrLose(displayedNumber, guess, wager) {
    const weiValue = this.web3.utils.toWei(wager.toString(), "ether");
    console.debug("WinOrLose_account: ", this.accounts[0]);

    return new Promise((resolve, reject) =>
      this.contract.methods
        .winOrLose(displayedNumber, guess)
        .send({ value: weiValue, from: this.web3.eth.defaultAccount })
        .on("receipt", (receipt) => {
          const { transactionHash, events } = receipt;
          const type_event = Object.keys(this._ROUND_TYPE_EVENT).find(
            (key) => key === Object.keys(events)[0]
          );

          if (type_event === undefined) {
            reject("No events were thrown");
          }
          const result = {
            transactionHash,
            result: this._ROUND_TYPE_EVENT[type_event],
            mysteryNumber: events[type_event].returnValues.mysteryNumber,
          };

          resolve(result);
        })
    );
  }
}

export default GameContract;
