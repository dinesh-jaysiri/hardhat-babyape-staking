const { network, ethers } = require("hardhat")
const keccak256 = require("keccak256")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { GenaratedMerkleTree } = require("../utils/genarateMerkleTree")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    // Constractor arguments
    const BASE_URI = process.env.NFT_BASE_URI
    const merkleroot = ethers.utils.hexlify(GenaratedMerkleTree.getRoot())
    const proxyRegisteryAdderss = networkConfig[chainId].proxyRegisteryAdderss
    const args = [BASE_URI]

    //deploy contract
    const babyApe = await deploy("BabyApe", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmation || 1,
    })

    log("----------- deploying BabyApe contract is successfully -----------")

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("----------- starting verification process -----------")

        await verify(babyApe.address, args)
    }
}

module.exports.tags = ["all", "babyape"]
