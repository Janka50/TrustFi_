from web3 import Web3
import json
import os

# 🔗 Connect to BlockDAG node
w3 = Web3(Web3.HTTPProvider("https://rpc.primordial.bdagscan.com"))

# ✅ Check basic connection
if w3.is_connected():
    print("✅ Connected to BlockDAG")
else:
    print("❌ Failed to connect")
    exit()

# 🔎 Test simple RPC calls
try:
    latest_block = w3.eth.block_number
    print(f"📦 Latest block number on this network: {latest_block}")
    print(f"🌐 Chain ID: {w3.eth.chain_id}")
except Exception as e:
    print(f"❌ Error accessing blockchain info: {e}")
    exit()

# 📌 Replace with your deployed contract address
try:
    contract_address = w3.to_checksum_address("0x47d4060b25c2bcf5b73c77aa6f6d3b27db46fe2e")
    print(f"✅ Using contract address: {contract_address}")
except Exception as e:
    print(f"❌ Invalid contract address: {e}")
    exit()

# 📁 Load ABI from JSON file relative to this script
base_dir = os.path.dirname(os.path.abspath(__file__))
abi_path = os.path.join(base_dir, "contract_abi.json")

try:
    with open(abi_path, 'r') as file:
        contract_abi = json.load(file)
    print("✅ ABI loaded successfully from file")
except FileNotFoundError:
    print(f"❌ contract_abi.json file not found at {abi_path}")
    exit()
except json.JSONDecodeError as e:
    print(f"❌ Error parsing JSON file: {e}")
    exit()

# 🎯 Initialize contract object with error handling
try:
    contract = w3.eth.contract(address=contract_address, abi=contract_abi)
    print("✅ Contract initialized successfully!")
except Exception as e:
    print(f"❌ Error initializing contract: {e}")
    exit()

# 🧪 Test functions
def test_contract_functions():
    try:
        # Get contract owner
        owner = contract.functions.owner().call()
        print(f"📋 Contract owner: {owner}")
        
        # Check verification status of a test address
        test_address = w3.to_checksum_address("0x742d35Cc6634C0532925a3b8D2B2B5C7d4D6F8eF")
        is_verified = contract.functions.verified(test_address).call()
        print(f"📋 Test address {test_address} verified: {is_verified}")
        
    except Exception as e:
        print(f"❌ Error calling contract functions: {e}")

# Run tests
if __name__ == "__main__":
    test_contract_functions()
