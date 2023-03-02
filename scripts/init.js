const { getNamedAccounts, ethers } = require("hardhat")

async function init() {
    const togglePublicSale = async () => {
        const BabyApe = await ethers.getContract("BabyApe")
        const togglePublicSaleTx = await BabyApe.togglePublicSale()
        const togglePublicSaleTXReceipt = await togglePublicSaleTx.wait(1)

        console.log("---------- Toggle PublicSale Success -------------")
    }

    const mintNft = async () => {
        const value = ethers.utils.parseEther("0.1")
        const BabyApe = await ethers.getContract("BabyApe")
        const mintResponse = await BabyApe.publicSaleMint(1, { value })
        const minntRecipt = await mintResponse.wait(1)
        console.log("---------- nft Mint Success -------------")
    }

    const reveal = async () => {
        const BabyApe = await ethers.getContract("BabyApe")
        const revelTx = await BabyApe.reveal()
        const revelTXReceipt = await revelTx.wait(1)

        console.log("---------- reveal Success -------------")
    }

    const addController = async () => {
        const NFTStaking = await ethers.getContract("NFTStaking")
        const BASRewards = await ethers.getContract("BASRewards")

        const addControlerResponse = await BASRewards.addController(NFTStaking.address)
        const addControlerRecipt = await addControlerResponse.wait(1)
        console.log("---------- add controller Success -------------")
    }

    const setApprovalForAll = async () => {
        const BabyApe = await ethers.getContract("BabyApe")
        const NFTStaking = await ethers.getContract("NFTStaking")
        const setApprovalForAllResponse = await BabyApe.setApprovalForAll(NFTStaking.address, true)
        const setApprovalForAllRecipt = await setApprovalForAllResponse.wait(1)
        console.log("---------- setApprovalForAll Success -------------")
    }

    const stake = async () => {
        const NFTStaking = await ethers.getContract("NFTStaking")
        const stakengResponse = await NFTStaking.stake([1])
        const stakingRecipt = await stakengResponse.wait(1)

        console.log("---------- stakeNft Success -------------")
    }

    await togglePublicSale()
    await mintNft()
    await mintNft()
    await reveal()
    await addController()
    await setApprovalForAll()
    await stake()
}

init()
    .then(() => process.exit(0))
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
