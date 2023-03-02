const { ethers } = require("hardhat")

async function getmaxSupply() {
    const BabyApe = await ethers.getContract("BabyApe")
    const maxSupply = await BabyApe.maxSupply()
    // const getmaxSupplyTXReceipt = await getmaxSupplyTX.wait(1)

    console.log(maxSupply.toString())
}

getmaxSupply()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
