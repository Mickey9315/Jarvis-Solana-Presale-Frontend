// import { useEffect } from "react";
import classes from "./navigation.module.scss";
// import ConnectButton from "../button/connectButton";
import logo from "../../assets/logo.png";
import xLogo from "../../assets/x-logo.svg";

import WalletConnect from "../Wallet/connect";

export default function Navigation() {

  // const { connected } = useWallet();
  // const { connected, select, wallets, wallet, publicKey, disconnect } = useWallet();
  // const { setVisible } = useWalletModal();

  // useEffect(() => {
  //   console.log("wallet selected");
  //   if(wallet) {
  //     console.log("wallet select");
  //     if(wallet.readyState == "NotDetected") {

  //       // select(wallet.adapter.name);
  //       // navigate(wallet.adapter.url);
  //       openInNewTab(wallet.adapter.url);
  //     }
  //   }
  // }, [wallet])

  // useEffect(() => {
  // }, [])


  return (
    <nav className={classes.nav}>
      <div className={classes.nav__container}>
        <a href="/">
          <img className={classes.nav__logo} src={logo} alt="navigation logo" />
        </a>
        <div className={classes.nav__links__wrapper}>
          <a href="https://x.com/JudgeToken?t=Ojg-ZNxG8IQxcjfuB4gdNw&s=08">
            <img src={xLogo} className={classes.nav__x__logo} alt="X link" />
          </a>
          {/* {connected == false? 
            <ConnectButton handleClick={handleClick} className={classes.nav__connect__button}>
              CONNECT
            </ConnectButton>  
            :
            <WalletConnect />
          } */}
          <WalletConnect />
        </div>
      </div>
    </nav>
  );
}
