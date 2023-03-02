const { ethers } = require("hardhat")

async function togglePause() {
    const BabyApe = await ethers.getContract("BabyApe")
    const togglePauseTx = await BabyApe.togglePause()
    const togglePauseTXReceipt = await togglePauseTx.wait(1)

    console.log("Contract Pause toggled successfully")
}

togglePause()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
