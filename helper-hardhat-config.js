const networkConfig = {
    31337: {
        name: "localhost",
        mintFee: "10000000000000000", // 0.01 ETH
        proxyRegisteryAdderss: "0xab43ba48c9edf4c2c4bb01237348d1d7b28ef168",
    },
    // Price Feed Address, values can be obtained at https://docs.chain.link/docs/reference-contracts
    // Default one is ETH/USD contract on Kovan
    5: {
        name: "goerli",
        mintFee: "10000000000000000", // 0.01 ETH
        proxyRegisteryAdderss: "0xab43ba48c9edf4c2c4bb01237348d1d7b28ef168",
    },
}

const DECIMALS = "18"
const developmentChains = ["hardhat", "localhost"]

module.exports = {
    networkConfig,
    developmentChains,
    DECIMALS,
}
