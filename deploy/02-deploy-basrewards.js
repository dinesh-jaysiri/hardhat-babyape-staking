const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    // Constractor arguments
    const args = []

    //deploy contract
    const BASRewards = await deploy("BASRewards", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmation || 1,
    })

    log("----------- deploying BASRewards contract is successfully -----------")

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("----------- starting verification process -----------")

        await verify(BASRewards.address, args)
    }
}

module.exports.tags = ["all", "basrewards"]
