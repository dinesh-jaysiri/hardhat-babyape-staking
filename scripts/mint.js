const { getNamedAccounts, ethers } = require("hardhat")
const keccak256 = require("keccak256")
const { GenaratedMerkleTree } = require("../utils/genarateMerkleTree")

async function main() {
    const value = ethers.utils.parseEther("0.1")
    const deployer = (await getNamedAccounts()).deployer
    const proof = GenaratedMerkleTree.getHexProof(keccak256(deployer.toString("hex")))

    const BabyApe = await ethers.getContract("BabyApe")
    const NFTStaking = await ethers.getContract("NFTStaking")
    const BASRewards = await ethers.getContract("BASRewards")

    const mintResponse = await BabyApe.publicSaleMint(1, { value })
    const minntRecipt = await mintResponse.wait(1)
    console.log("mint success .....")
    console.log("mintRecipt", minntRecipt)
}

main()
    .then(() => process.exit(0))
    .catch((e) => {
        console.log(e)
        process.exit(1)
    })
