const { assert, expect } = require("chai")
const { deployments, ethers, getNamedAccounts, network } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")
const keccak256 = require("keccak256")
const { GenaratedMerkleTree } = require("../../utils/genarateMerkleTree")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("BabyApe", () => {
          let BabyApe, deployer, player_1, player_2, chainId, proof, player_1_proof,player_1_signer,player_2_proof,player_2_signer
          let root = ethers.utils.hexlify(GenaratedMerkleTree.getRoot()).toString("hex")
          const sendValue = ethers.utils.parseEther("0.1")
          beforeEach(async () => {
              deployer = (await getNamedAccounts()).deployer
              player_1 = (await getNamedAccounts()).player_1
              player_2 = (await getNamedAccounts()).player_2
              await deployments.fixture("all")

              BabyApe = await ethers.getContract("BabyApe", deployer)
              player_1_signer = await ethers.getSigner(player_1)
              player_2_signer = await ethers.getSigner(player_2)
              chainId = network.config.chainId
              const leaf = keccak256(deployer.toString("hex"))
              proof = GenaratedMerkleTree.getHexProof(leaf)
              const player_1_leaf = keccak256(player_1.toString("hex"))
              player_1_proof = GenaratedMerkleTree.getHexProof(player_1_leaf)
              const player_2_leaf = keccak256(player_2.toString("hex"))
              player_2_proof = GenaratedMerkleTree.getHexProof(player_2_leaf)
          })

          describe("Constructor", () => {
              it("passing constructor arguments correctly", async () => {
                  const BASE_URI = process.env.NFT_BASE_URI
                  const baseUriFromContract = await BabyApe.baseURI()
                  const rootFromContract = await BabyApe.root()
                  assert.equal(BASE_URI, baseUriFromContract)
                  assert.equal(rootFromContract, root)
              })
          })
          describe("setBaseUri", () => {
              it("setting BaseUri correctly", async () => {
                  const newBaseUri = "https://newbase.uri"

                  const transectionResponse = await BabyApe.setBaseURI(newBaseUri)
                  const transectionRisipt = await transectionResponse.wait(1)

                  const baseUriFromContract = await BabyApe.baseURI()

                  assert.equal(newBaseUri, baseUriFromContract)
              })
          })

          describe("Presalemint", async () => {
              it("minter and mint address shuold be same", async () => {
                  //presaleMint(address account, uint256 _amount, bytes32[] calldata _proof)
                  // const mintResponse = await BabyApe.PresaleMint(player_1, 1, root)
                  // const mintRisipt = await  mintResponse.wait(1)

                  await expect(BabyApe.presaleMint(player_1, 1, proof)).to.be.revertedWith(
                      "BabyApe: Not allowed"
                  )
              })

              it("not allow to do presalemint while Presale is OFF", async () => {
                  await expect(BabyApe.presaleMint(deployer, 1, proof)).to.be.revertedWith(
                      "BabyApe: Presale is OFF"
                  )
              })

              it("not allow to do presalmint while Contract is paused", async () => {
                  const enableResponse = await BabyApe.togglePresale()
                  const enableRisipt = await enableResponse.wait(1)
                  const presaleState = await BabyApe.presaleM()
                  assert.equal(presaleState, true)

                  const pauseResponse = await BabyApe.togglePause()
                  const pauseRisipt = await pauseResponse.wait(1)
                  const pausestate = await BabyApe.paused()

                  assert.equal(pausestate, true)

                  await expect(BabyApe.presaleMint(deployer, 1, proof)).to.be.revertedWith(
                      "BabyApe: Contract is paused"
                  )
              })

              describe("reach total supply", () => {
                  let pauseState, presaleState
                  beforeEach(async () => {
                      const enableResponse = await BabyApe.togglePresale()
                      await enableResponse.wait(1)
                      presaleState = await BabyApe.presaleM()
                      pauseState = await BabyApe.paused()
                  })

                  it("not allow to do presalemint when presale amount exceeding presaleLimit", async () => {
                      assert.equal(presaleState, true)
                      assert.equal(pauseState, false)
                      await expect(BabyApe.presaleMint(deployer, 7, proof)).to.be.revertedWith(
                          "BabyApe: You can't mint so much tokens"
                      )
                  })

                  it("Not allow to mint address not in the list", async () => {
                      const player2contract =await BabyApe.connect(player_2_signer)
                      await expect(player2contract.presaleMint(player_2, 1, player_2_proof)).to.be.revertedWith(
                          "Not allowed origin"
                      )
                  })

                  it("not allow to mint when max supply exceeded", async () => {
                      //before run this max supply shold set to 3

                      const firstmintResponse = await BabyApe.presaleMint(deployer, 2, proof, {
                          value: sendValue,
                      })
                      await firstmintResponse.wait(1)

                      const PlayerContract = await BabyApe.connect(player_1_signer)

                      await expect(
                          PlayerContract.presaleMint(player_1, 2, player_1_proof, {
                              value: sendValue,
                          })
                      ).to.be.revertedWith("BabyApe: max supply exceeded")
                  })
              })
          })
      })
