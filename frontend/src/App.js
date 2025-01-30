//import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';

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
    const {solana} = window;
    if (solana) {
      const response = await solana.connect();
      console.log("Connectes with  public key", response.publicKey.toString());
      setWalletAddress(response.publicKey.toString())
    }
  };

  const renderNotConnectedContainer = () => {
    return <button onClick={connectWallet}> Connect to Wallet </button>
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
  </div>
  )
};

export default App;
