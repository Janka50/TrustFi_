

````markdown
 TrustFi – Decentralized Identity Verification DApp

**TrustFi** is a blockchain-based identity verification web application designed to enhance trust, transparency, and accountability in decentralized communities. Built on React and Web3.js, it integrates seamlessly with **BlockDAG EVM-compatible networks**. This project was developed for hackathon purposes to demonstrate a functional decentralized identity verification system.



 🚀 Features

- ⚡ React 18 + Vite for fast development
- 🎨 TailwindCSS for styling
- 🖼️ Lucide React Icons for UI enhancements
- 🔗 Web3.js for blockchain interaction
- 🦊 MetaMask integration as the primary wallet
- 📄 IdentityRegistry smart contract integration
- 📊 Activity log and trust scoring for verified addresses
- 🖨️ QR code generation for wallet sharing
- 📋 Copy wallet address functionality



 📦 Prerequisites

Before starting, ensure you have:

- [Node.js](https://nodejs.org/) (>= 18.x recommended)
- [MetaMask](https://metamask.io/) browser extension
- A BlockDAG **testnet RPC endpoint** (provided by organizers)



 🛠️ Getting Started

 1. Clone this repo

```bash
git clone https://github.com/<your-username>/TrustFi.git
cd TrustFi/frontend
````

 2. Install dependencies

```bash
npm install
```

 3. Configure environment variables

Create a `.env` file in the root directory and add:

```env
VITE_CONTRACT_ADDRESS="0x2b60d7f0d18d1793dc06df79230d1a91adf4ee55"
VITE_NETWORK_ID=1234 # Optional: BlockDAG Chain ID
VITE_RPC_URL=https://blockdag-testnet-rpc-url
```



 🖥️ Running the App

Start the local development server:

```bash
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

Connect your wallet via MetaMask and interact with TrustFi.



 📌 Usage Flow

1. Connect your wallet (MetaMask)
2. View your wallet QR code for easy sharing
3. Check if an address is verified
4. Set an address as verified/unverified (authorized users only)
5. Monitor the on-chain activity log
6. View trust score badges based on verification status and activity



 📄 How It Works

* The **IdentityRegistry smart contract** stores verified addresses on-chain.
* Users’ trust scores are computed using:

  * Verified status (strong boost)
  * Historical activity (up to a max score of 100)
* QR codes are generated from wallet addresses for sharing and identification.
* Activity logs are fetched from smart contract events and displayed in the UI.

This approach ensures a **decentralized, auditable verification system** that does not rely on central authorities.



🌐 Project Structure

```
src/
 ├─ components/
 │   └─ ConnectWalletButton.jsx  # Wallet connection component
 ├─ contracts/
 │   └─ IdentityRegistryABI.json # ABI for smart contract
 ├─ App.jsx                       # Main application component
 ├─ main.jsx                      # Entry point
 └─ index.css                     # Tailwind + global styles
```

 Component Details

* App.jsx: Manages wallet connection, verification, QR code generation, activity log, and trust score badge.
* **ConnectWalletButton.jsx**: Reusable wallet connection component with copy address functionality.



🎯 Challenges & TrustFi Solutions

| Challenge                       | TrustFi Solution                                                  |
| ------------------------------- | ----------------------------------------------------------------- |
| Anonymous users causing fraud   | On-chain verification ensures only verified addresses are trusted |
| Lack of reputation tracking     | Trust scores reflect verification status + historical activity    |
| Non-transparent identity checks | Activity logs are stored on-chain and publicly auditable          |


 💡 Use Cases & Benefits

* Prevent fraudulent activity and Sybil attacks in blockchain communities
* Provide transparent reputation systems for decentralized governance
* Enable easy wallet sharing through QR codes
* Support integration into larger BlockDAG-based DApps



 🔮 Future Enhancements

* On-chain **certificates** for verified achievements
* Escrow payments and **group savings pools** for DeFi applications
* Multi-chain support for cross-chain identity verification



 📚 Resources

* [BlockDAG Documentation](https://docs.blockdag.network)
* [Web3.js Documentation](https://web3js.readthedocs.io/)
* [React Documentation](https://react.dev/)
* [TailwindCSS Documentation](https://tailwindcss.com/docs)
* [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/)



 📝 License

MIT



