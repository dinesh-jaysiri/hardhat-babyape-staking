const { ethers } = require("hardhat")

async function main() {
    const BabyApe = await ethers.getContract("BabyApe")
    const NFTStaking = await ethers.getContract("NFTStaking")
    const setApprovalForAllResponse = await BabyApe.setApprovalForAll(NFTStaking.address, true)
    const setApprovalForAllRecipt = await setApprovalForAllResponse.wait(1)

    console.log("setapprovalRecipt", setApprovalForAllRecipt)
}

main()
    .then(() => process.exit(0))
    .catch((e) => {
        console.log(e)
        process.exit(1)
    })
