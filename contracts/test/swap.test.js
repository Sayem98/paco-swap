const Web3 = require("web3");

contract("Swap", function (accounts) {
  beforeEach("should setup the contract instance", async () => {
    btcb = await artifacts.require("BTCB").deployed();
    paco = await artifacts.require("PACO").deployed();
    pool = await artifacts.require("Pool").deployed();
    lp = await artifacts.require("LP").deployed();
  });
  it("should mint 100 BTCB to accounts[0]", async function () {
    await btcb.mint(accounts[0], "77509571559852644053");

    const balance = await btcb.balanceOf(accounts[0]);
    // assert.equal(Web3.utils.fromWei(balance.toString(), "ether"), 100);
  });
  it("should mint 100 PACO to accounts[0]", async function () {
    await paco.mint(accounts[0], "5000000000000000000000000000");

    const balance = await paco.balanceOf(accounts[0]);
    // assert.equal(Web3.utils.fromWei(balance.toString(), "ether"), 100);
  });

  it("should provide liquidity", async function () {
    // check balance before BTCB and PACO
    const balanceBTCB = await btcb.balanceOf(accounts[0]);
    const balancePACO = await paco.balanceOf(accounts[0]);
    // assert.equal(
    //   Web3.utils.fromWei(balanceBTCB.toString(), "ether"),
    //   Web3.utils.fromWei(balancePACO.toString(), "ether")
    // );

    // approve
    await btcb.approve(pool.address, balanceBTCB, {
      from: accounts[0],
    });
    await paco.approve(pool.address, balancePACO, {
      from: accounts[0],
    });

    // add pool as a minter in LP contract
    await lp.addMinters(accounts[0], {
      from: accounts[0],
    });

    await lp.addMinters(pool.address, {
      from: accounts[0],
    });
    // check if minter or not
    const isMinter = await lp.minters(pool.address);
    // mint 10 lp token
    await lp.mint(accounts[0], Web3.utils.toWei("10", "ether"), {
      from: accounts[0],
    });
    console.log("isMinter: ", isMinter);
    console.log(
      "balanceBTCB ",
      Web3.utils.fromWei(balanceBTCB.toString(), "ether")
    );
    console.log(
      "balancePACO ",
      Web3.utils.fromWei(balancePACO.toString(), "ether")
    );
    const share = await pool.addLiquidity(balanceBTCB, balancePACO, {
      from: accounts[0],
    });
    const balanceShare = await pool.balanceOf(accounts[0]);
    console.log(
      "balanceShare: ",
      Web3.utils.fromWei(balanceShare.toString(), "ether")
    );
  });

  it("should swap BTCB to PACO", async function () {
    // mint 10 token BTCB
    await btcb.mint(accounts[0], Web3.utils.toWei("10", "ether"));
    // approve
    await btcb.approve(pool.address, Web3.utils.toWei("10", "ether"), {
      from: accounts[0],
    });
    // swap
    const trx = await pool.swap(btcb.address, Web3.utils.toWei("10", "ether"), {
      from: accounts[0],
    });

    assert(trx.receipt.status, true);
  });

  it("should remove liquidity", async function () {
    // get the balance of share
    const balanceShare = await lp.balanceOf(accounts[0]);
    const totalSupply = await pool.totalSupply();
    console.log(
      "totalSupply: ",
      Web3.utils.fromWei(totalSupply.toString(), "ether")
    );
    console.log(
      "balanceShare: ",
      Web3.utils.fromWei(balanceShare.toString(), "ether")
    );
    const approveLP = await lp.approve(
      pool.address,
      Web3.utils.toWei("100", "ether"),
      {
        from: accounts[0],
      }
    );

    // remove liquidity

    const trx = await pool.removeLiquidity(Web3.utils.toWei("100", "ether"), {
      from: accounts[0],
    });
    assert(trx.receipt.status, true);
  });
});
