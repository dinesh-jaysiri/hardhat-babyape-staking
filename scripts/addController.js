const { getNamedAccounts, ethers } = require("hardhat")
const keccak256 = require("keccak256")
const { GenaratedMerkleTree } = require("../utils/genarateMerkleTree")

async function main() {
    const deployer = (await getNamedAccounts()).deployer
    const proof = GenaratedMerkleTree.getProof(keccak256(deployer.toString("hex")))

    const BabyApe = await ethers.getContract("BabyApe")
    const NFTStaking = await ethers.getContract("NFTStaking")
    const BASRewards = await ethers.getContract("BASRewards")

    const addControlerResponse = await BASRewards.addController(NFTStaking.address)
    const addControlerRecipt = await addControlerResponse.wait(1)
}

main()
    .then(() => process.exit(0))
    .catch((e) => {
        console.log(e)
        process.exit(1)
    })
