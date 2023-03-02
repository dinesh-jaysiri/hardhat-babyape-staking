## Baby Ape Staking Backend

This is a Solidity smart contract that allows users to stake Non-Fungible Tokens (NFTs) from the BabyApe NFT collection and earn rewards in the form of BAS tokens. The contract is compatible with the ERC-721 standard and imports the IERC721Receiver interface.

The contract keeps track of staked tokens by storing information about the owner, token ID, and the timestamp of the stake in a struct called Stake. The staked tokens are transferred from the user's wallet to the contract address using the transferFrom function from the BabyApe contract. Users can stake multiple tokens at once using the stake function.

The rewards are calculated based on the time the tokens have been staked and the amount of rewards earned is proportional to the time. Users can claim their rewards using the claim function and can also choose to unstake their tokens at the same time using the unstake function. The contract also provides functions for checking the amount of rewards earned by staked tokens and the balance and tokens of a specific user.

The contract is owned by the contract creator and is licensed under the MIT license

#### Installation

To install the Magic City Ape backend, clone the repository and run the following command to install the necessary dependencies:

```shell
npm install
```

#### Usage

To start a local development blockchain and deploy the Magic City Ape smart contract, run the following command:

```shell
npx hardhat deploy --network localhost
```

To run the tests for Magic City Ape, use the following command:

```shell
npx hardhat test --network localhost
```

#### Contributing

We welcome contributions to Magic City Ape! To contribute, please fork this repository and submit a pull request with your changes.

#### License

Magic City Ape is licensed under the MIT license. See LICENSE for more information.

#### Contact

For questions or inquiries about Magic City Ape, please contact us at [ywdinesh@gmail.com](ywdinesh@gmail.com).
