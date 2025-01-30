//import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import idl from "./idl.json"
import {
  Program,
  AnchorProvider,
  web3,
  utils,
  BN,
  getProvider,
} from "@project-serum/anchor";
import { clusterApiUrl, PublicKey } from '@solana/web3.js';

const programID = new PublicKey(idl.address);
const network = clusterApiUrl("devnet");
const opts = {
  preflightCommitment: "processed",
};

const { SystemProgram } = web3



const App = () => {

  const [walletAddress, setWalletAddress] = useState(null);

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;
      if (solana) {
        if (solana.isPhantom) {
          console.log("Phantom wallet found");
          const response = await solana.connect({
            onlyIfTrusted: true,
          });
          console.log(
            "Connected wit public key: ",
            response.publicKey.toString()
          );
          setWalletAddress(response.publicKey.toString);
        }
      } else {
        alert("Solana object not found! Get a wallet Phantom")
      }
    } catch (error) {
      console.log(error)
    }
  };

  const connectWallet = async () => {
    const { solana } = window;
    if (solana) {
      const response = await solana.connect();
      console.log("Connectes with  public key", response.publicKey.toString());
      setWalletAddress(response.publicKey.toString())
    }
  };

  const createCampaign = async () => {
    try {
      const provider = getProvider();
      const program = new Program(idl, programID, provider);
      const [campaign] = await PublicKey.findProgramAddressSync(
        [
          utils.bytes.utf8.encode("CAMPAIGN_DEMO"),
          provider.wallet.publicKey.toBuffer(),
        ],
        program.programId
      );
      await program.rpc.create('campaign name', 'campaign description', {
        accounts: {
          campaign,
          user: provider.wallet.publicKey,
          SystemProgram: SystemProgram.programId
        }
      });
      console.log(
        "Created a new campaign account", campaign.toString()
      );
    } catch (error) {
      console.log(error);
    }
  }

  const renderNotConnectedContainer = () => {
    return <button onClick={connectWallet}> Connect to Wallet </button>
  }

  const renderConnectedContainer = () => {
    return <button onClick={createCampaign}> Create a campaign  </button>
  }

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };

    window.addEventListener("load", onLoad);

    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <div className="App">
      {!walletAddress && renderNotConnectedContainer()}
      {walletAddress && renderConnectedContainer()}
    </div>
  )
};

export default App;
