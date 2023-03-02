const { ethers, network } = require("hardhat")
const fs = require("fs")

const fronEndContractsFile = "../react-babyape-staking/src/constants/networkMapping.json"
const frontendAbiLocation = "../react-babyape-staking/src/constants/"

module.exports = async function () {
    if (process.env.UPDATE_FRONT_END) {
        console.log("Updating front-end...")
        await updateContractAddresses()
        await updateAbi()
    }
}

async function updateAbi() {
    const babyApeNft = await ethers.getContract("BabyApe")
    fs.writeFileSync(
        `${frontendAbiLocation}BabyApe.json`,
        babyApeNft.interface.format(ethers.utils.FormatTypes.json)
    )

    const BASRewards = await ethers.getContract("BASRewards")
    fs.writeFileSync(
        `${frontendAbiLocation}BASREwards.json`,
        BASRewards.interface.format(ethers.utils.FormatTypes.json)
    )

    const NFTStaking = await ethers.getContract("NFTStaking")
    fs.writeFileSync(
        `${frontendAbiLocation}NFTStaking.json`,
        NFTStaking.interface.format(ethers.utils.FormatTypes.json)
    )
}

async function updateContractAddresses() {
    const babyApe = await ethers.getContract("BabyApe")
    const BASRewards = await ethers.getContract("BASRewards")
    const NFTStaking = await ethers.getContract("NFTStaking")
    const chainId = network.config.chainId.toString()
    const contractAddresses = JSON.parse(fs.readFileSync(fronEndContractsFile, "utf8"))

    if (!chainId in contractAddresses) {
        contractAddresses = { ...contractAddresses, chainId: {} }
    }
    contractAddresses[chainId] = { ...contractAddresses[chainId], BabyApe: babyApe.address }
    contractAddresses[chainId] = { ...contractAddresses[chainId], BASRewards: BASRewards.address }
    contractAddresses[chainId] = { ...contractAddresses[chainId], NFTStaking: NFTStaking.address }

    fs.writeFileSync(fronEndContractsFile, JSON.stringify(contractAddresses))
}

module.exports.tags = ["all", "frontend"]


