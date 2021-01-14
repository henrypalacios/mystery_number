const Gaming = artifacts.require("contracts/Gaming.sol");

contract("Gaming", async (accounts) => {
  let gaming;
  const owner = accounts[0];
  const player1 = accounts[1];

  before(async () => {
    gaming = await Gaming.deployed();
    const fundGame = await gaming.fundGame({
      from: owner,
      value: web3.utils.toWei("2", "ether"),
    });
  });

  it("Should have positive balance", async () => {
    let initialBalance = await web3.eth.getBalance(gaming.address);

    assert.equal(
      initialBalance,
      web3.utils.toWei("2", "ether"),
      "Balance should be 200000000000000000wei ~ 2ETH"
    );
  });

  it("Should record player losses", async function () {
    const gameRound = await gaming.winOrLose(10, true, {
      from: player1,
      value: web3.utils.toWei("1", "ether"),
    });
    const playerStats = await gaming.players(player1);

    assert.equal(playerStats[1].toNumber(), 1, "The player should have 1 loss");
  });

  it("Should record player wins", async () => {
    const gameRound = await gaming.winOrLose(10, false, {
      from: player1,
      value: web3.utils.toWei("1", "ether"),
    });
    const playerStats = await gaming.players(player1);

    assert.equal(playerStats[0].toNumber(), 1, "The Player should have 1 wins");
  });

  it("Should decrease player account when his loss", async () => {
    const initialBalance = await web3.eth.getBalance(player1);
    const initialBalanceInEther = Number(
      web3.utils.fromWei(initialBalance, "ether")
    );
    const gameRound = await gaming.winOrLose(10, true, {
      from: player1,
      value: web3.utils.toWei("1", "ether"),
    });
    const postBalance = await web3.eth.getBalance(player1);
    const postBalanceInEther = Number(web3.utils.fromWei(postBalance, "ether"));

    assert.isAtLeast(
      initialBalanceInEther,
      postBalanceInEther + 1,
      "Player account have decreased by the amount of the wager"
    );
  });

  it("Should withdraw funds", async () => {
    let balanceGame = await web3.eth.getBalance(gaming.address);
    let balanceGameEther = Number(web3.utils.fromWei(balanceGame, "ether"));
    let balanceOwner = await web3.eth.getBalance(owner);
    let balanceOwnerEther = Number(web3.utils.fromWei(balanceOwner, "ether"));
    console.log("BalanceGame:", balanceGameEther);
    console.log("BalanceOwner:", balanceOwnerEther);

    const gameRound = await gaming.withdrawFunds();
    let postBalanceGame = await web3.eth.getBalance(gaming.address);
    let postBalanceGameEther = Number(web3.utils.fromWei(postBalanceGame));
    let postBalanceOwner = await web3.eth.getBalance(owner);
    let postBalanceOwnerEther = Number(
      web3.utils.fromWei(postBalanceOwner, "ether")
    );

    console.log("postBalance:", postBalanceGameEther);
    console.log("PostBalanceOwner:", postBalanceOwnerEther);
    assert.isBelow(
      postBalanceGameEther,
      balanceGameEther,
      "BalanceGame should be less than postBalanceGame"
    );
    assert.isAbove(
      postBalanceOwnerEther,
      balanceOwnerEther,
      "Balance Owner should increase after withdraw"
    );
  });
});
