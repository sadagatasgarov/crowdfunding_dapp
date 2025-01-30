//import logo from './logo.svg';
import { useEffect } from 'react';
import './App.css';

const App = () => {
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
        }
      } else {
        alert("Solana object not found! Get a wallet Phantom")
      }
    } catch (error) {
      console.log(error)
    }
  };

  const connectWallet = async () => {

      

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

  return <div className="App"> {renderNotConnectedContainer()}</div>

};

export default App;
