import React, { useState, useEffect } from "react";
import Web3 from "web3";
import { QRCode } from "react-qrcode-logo"; // Make sure to install 'react-qrcode-logo'
import IdentityRegistryABI from "./abi/contract_abi.json";

const CONTRACT_ADDRESS = "0x2b60d7f0d18d1793dc06df79230d1a91adf4ee55"; // replace with your deployed contract address

export default function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

  const [addressToCheck, setAddressToCheck] = useState("");
  const [verificationResult, setVerificationResult] = useState(null);
  const [activityLog, setActivityLog] = useState([]);

  // Connect wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const w3 = new Web3(window.ethereum);
        setWeb3(w3);

        const accounts = await w3.eth.getAccounts();
        setAccount(accounts[0]);

        const c = new w3.eth.Contract(IdentityRegistryABI, CONTRACT_ADDRESS);
        setContract(c);
        loadActivityLog(c);
      } catch (err) {
        console.error("Wallet connection error:", err);
      }
    } else {
      alert("MetaMask not detected!");
    }
  };

  // Normalize address: returns checksum if valid, null otherwise
  const normalizeAddress = (raw) => {
    if (!raw) return null;
    const s = raw.trim();
    if (s.length !== 42 || !/^0x[0-9a-fA-F]{40}$/.test(s)) return null;
    try {
      return web3.utils.toChecksumAddress(s);
    } catch {
      return null;
    }
  };

  // Check verification
  const checkVerification = async () => {
    if (!contract || !web3) {
      alert("Wallet not connected or contract not initialized");
      return;
    }

    const normalized = normalizeAddress(addressToCheck);
    if (!normalized) {
      setVerificationResult("invalid");
      return;
    }

    try {
      const isVerified = await contract.methods.verified(normalized).call();
      setVerificationResult(isVerified ? "true" : "false");
    } catch (err) {
      console.error("Contract call failed:", err);
      setVerificationResult("error");
    }
  };

  // Set verified status
  const setVerifiedStatus = async (addr, status) => {
    if (!contract || !web3) {
      alert("Wallet not connected or contract not initialized");
      return;
    }

    const normalized = normalizeAddress(addr);
    if (!normalized) {
      alert("Enter a valid address");
      return;
    }

    try {
      await contract.methods.setVerified(normalized, status).send({ from: account });
      alert(`Address ${normalized} set to ${status}`);
      loadActivityLog(contract); // refresh activity log
    } catch (err) {
      console.error("Failed to set verified:", err);
      alert(`Transaction failed: ${err.message}`);
    }
  };

  // Load activity log from events
  const loadActivityLog = async (c) => {
    if (!c) return;

    try {
      const events = await c.getPastEvents("Verified", {
        fromBlock: 0,
        toBlock: "latest",
      });

      const log = events.map((e) => ({
        address: e.returnValues.user,
        status: e.returnValues.status,
        txHash: e.transactionHash,
      })).reverse(); // most recent first

      setActivityLog(log);
    } catch (err) {
      console.error("Failed to load activity log:", err);
    }
  };

  // Copy wallet to clipboard
  const copyWallet = () => {
    if (account) {
      navigator.clipboard.writeText(account);
      alert("Wallet address copied!");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#2c3e50" }}>TrustFi Identity Verification</h1>

      {!account ? (
        <button
          onClick={connectWallet}
          style={{
            padding: "0.6rem 1.2rem",
            backgroundColor: "#3498db",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Connect Wallet
        </button>
      ) : (
        <div style={{ marginBottom: "1rem" }}>
          <p>
            Connected: <b>{account}</b>{" "}
            <button
              onClick={copyWallet}
              style={{
                marginLeft: "0.5rem",
                padding: "0.2rem 0.5rem",
                cursor: "pointer",
              }}
            >
              Copy
            </button>
          </p>
          <QRCode value={account} size={128} fgColor="#2c3e50" bgColor="#ecf0f1" />
        </div>
      )}

      <div style={{ marginTop: "2rem" }}>
        <h2>Check Verification</h2>
        <input
          type="text"
          placeholder="Enter address"
          value={addressToCheck}
          onChange={(e) => setAddressToCheck(e.target.value)}
          style={{ width: "400px", padding: "0.5rem" }}
        />
        <button
          onClick={checkVerification}
          style={{
            marginLeft: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#27ae60",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Check
        </button>
        {verificationResult && (
          <p style={{ marginTop: "1rem" }}>
            Result:{" "}
            <b
              style={{
                color:
                  verificationResult === "true"
                    ? "green"
                    : verificationResult === "false"
                    ? "red"
                    : "orange",
              }}
            >
              {verificationResult}
            </b>
          </p>
        )}
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h2>Set Verified Status</h2>
        <input
          type="text"
          placeholder="Enter address"
          onChange={(e) => setAddressToCheck(e.target.value)}
          style={{ width: "300px", padding: "0.5rem" }}
        />
        <button
          onClick={() => setVerifiedStatus(addressToCheck, true)}
          style={{ marginLeft: "0.5rem", padding: "0.5rem 1rem", cursor: "pointer" }}
        >
          Verify
        </button>
        <button
          onClick={() => setVerifiedStatus(addressToCheck, false)}
          style={{
            marginLeft: "0.5rem",
            padding: "0.5rem 1rem",
            cursor: "pointer",
            backgroundColor: "#e74c3c",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Unverify
        </button>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h2>Activity Log</h2>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#bdc3c7" }}>
              <th style={{ padding: "0.5rem" }}>Address</th>
              <th style={{ padding: "0.5rem" }}>Status</th>
              <th style={{ padding: "0.5rem" }}>Tx Hash</th>
            </tr>
          </thead>
          <tbody>
            {activityLog.map((entry, idx) => (
              <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? "#ecf0f1" : "#fff" }}>
                <td style={{ padding: "0.5rem" }}>{entry.address}</td>
                <td
                  style={{
                    padding: "0.5rem",
                    color: entry.status ? "green" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {entry.status ? "Verified" : "Unverified"}
                </td>
                <td style={{ padding: "0.5rem", fontSize: "0.8rem" }}>{entry.txHash}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
