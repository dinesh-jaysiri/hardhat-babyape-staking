const { network, ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const BabyApe = await ethers.getContract("BabyApe")
    const BASRewards = await ethers.getContract("BASRewards")

    // Constractor arguments
    const args = [BabyApe.address, BASRewards.address]

    //deploy contract
    const NFTStaking = await deploy("NFTStaking", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmation || 1,
    })

    log("----------- deploying BASRewards contract is successfully -----------")

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("----------- starting verification process -----------")

        await verify(NFTStaking.address, args)
    }
}

module.exports.tags = ["all", "nftstaking"]
