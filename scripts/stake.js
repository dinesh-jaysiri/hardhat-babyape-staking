const { getNamedAccounts, ethers } = require("hardhat")
const keccak256 = require("keccak256")
const { GenaratedMerkleTree } = require("../utils/genarateMerkleTree")

async function main() {
    const NFTStaking = await ethers.getContract("NFTStaking")
    const stakengResponse = await NFTStaking.stake([3])
    const stakingRecipt = await stakengResponse.wait(1)

    console.log("stakingRecipt", stakingRecipt)
}

main()
    .then(() => process.exit(0))
    .catch((e) => {
        console.log(e)
        process.exit(1)
    })
