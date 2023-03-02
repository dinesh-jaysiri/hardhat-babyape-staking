const { ethers } = require("hardhat")

async function getContractState() {
    const BabyApe = await ethers.getContract("BabyApe")

    const publicM = await BabyApe.publicM()
    const revealed = await BabyApe.revealed()
    const paused = await BabyApe.paused()

    console.log({ publicM, revealed, paused })
}

getContractState()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log("eroor from here ...........")
        console.log(error)
        process.exit(1)
    })
