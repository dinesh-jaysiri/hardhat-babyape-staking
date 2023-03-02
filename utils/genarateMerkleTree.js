//Calcualte merkle root form wihtelist arry

const { MerkleTree } = require("merkletreejs")
const keccak256 = require("keccak256")

const whiteList = [
    "0x19c0c310F1Bf9BB55452a1D4DA540D3005F2f445", //goerli network
    "0x8aA50Fd50beCA814AAF03D01A396854C0096B0f3",
    "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266", // hardht network
    "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4", //remix ide
    "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",
]

const leafNodes = whiteList.map((address) => keccak256(address))


const GenaratedMerkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true })

module.exports = { GenaratedMerkleTree }
