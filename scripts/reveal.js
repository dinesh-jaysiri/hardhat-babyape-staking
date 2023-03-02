const { ethers } = require("hardhat")

async function reveal() {
    const BabyApe = await ethers.getContract("BabyApe")
    const revelTx = await BabyApe.reveal()
    const revelTXReceipt = await revelTx.wait(1)

    console.log("Contract reveal successfully")
}

reveal()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
