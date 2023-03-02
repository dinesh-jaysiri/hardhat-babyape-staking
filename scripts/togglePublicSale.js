const { ethers } = require("hardhat")

async function togglePublicSale() {
    const BabyApe = await ethers.getContract("BabyApe")
    const togglePublicSaleTx = await BabyApe.togglePublicSale()
    const togglePublicSaleTXReceipt = await togglePublicSaleTx.wait(1)

    console.log(togglePublicSaleTXReceipt)
}

togglePublicSale()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
