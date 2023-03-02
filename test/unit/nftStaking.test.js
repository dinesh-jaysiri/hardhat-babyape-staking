const { assert, expect } = require("chai")
const { deployments, ethers, getNamedAccounts, network } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")
const keccak256 = require("keccak256")
const { GenaratedMerkleTree } = require("../../utils/genarateMerkleTree")

!developmentChains.includes(network.name)
    ? describe.skip()
    : describe("NFTStaking", () => {
          let BabyApe, NFTStaking, deployer, player, playerSign, proof, BASRewards
          const mintingValue = ethers.utils.parseEther("0.1")
          beforeEach(async () => {
              deployer = (await getNamedAccounts()).deployer
              player = (await getNamedAccounts()).player_1
              await deployments.fixture("all")

              playerSign = await ethers.getSigner(player)

              const deployer_leaf = keccak256(deployer.toString("hex"))
              proof = GenaratedMerkleTree.getHexProof(deployer_leaf)

              BabyApe = await ethers.getContract("BabyApe", deployer)
              const presaleToggleResponse = await BabyApe.togglePresale()
              await presaleToggleResponse.wait(1)

              // const mintResponse = BabyApe.presaleMint(deployer, 2, proof)
              // const mintRecipt = mintResponse.wait(1)

              NFTStaking = await ethers.getContract("NFTStaking")
              BASRewards = await ethers.getContract("BASRewards")

              // const approveResponse = BabyApe.isApprovedForAll(deployer,NFTStaking.address)
          })

          describe("stake", () => {
              it("not allow to stake not minted nft's", async () => {
                  await expect(NFTStaking.stake([1])).to.be.revertedWith("ERC721: invalid token ID")
              })

              it("not allow to mint another's token ", async () => {
                  const mintResponse = await BabyApe.presaleMint(deployer, 1, proof, {
                      value: mintingValue,
                  })
                  await mintResponse.wait(1)

                  const playerNftStaking = await NFTStaking.connect(playerSign)

                  await expect(playerNftStaking.stake([1])).to.be.revertedWith(
                      "NFTStaking: not your token"
                  )
              })

              it("not allow to stake without nft colloction approvel", async () => {
                  const mintResponse = await BabyApe.presaleMint(deployer, 1, proof, {
                      value: mintingValue,
                  })
                  await mintResponse.wait(1)

                  await expect(NFTStaking.stake([1])).to.be.reverted
              })

              it("emit evetn after staking nft's", async () => {
                  const approvelRespone = await BabyApe.setApprovalForAll(NFTStaking.address, true)
                  await approvelRespone.wait(1)

                  const addControlerResponse = await BASRewards.addController(NFTStaking.address)

                  await addControlerResponse.wait(1)

                  const mintResponse = await BabyApe.presaleMint(deployer, 1, proof, {
                      value: mintingValue,
                  })
                  await mintResponse.wait(1)

                  const stakingResponse = await NFTStaking.stake([1])
                  await stakingResponse.wait(1)

                  expect(stakingResponse).to.emit("NFTStaked")
              })
          })
      })
