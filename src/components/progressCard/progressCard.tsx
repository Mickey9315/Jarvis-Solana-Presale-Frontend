import { useRef, useContext } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
// import { useWalletModal } from "@solana/wallet-adapter-react-ui";

import { toast } from "react-toastify";

import classes from "./progressCard.module.scss";

import logoImage from "../../assets/logo-small.png";

import ConnectButton from "../button/connectButton";
import ProgressBar from "./progressBar";
import ContributePopup from "../popup/contributePopup";

import { PersonalInfoContext } from "../../web3/PersonalInfo";

// import WalletConnect from "../Wallet/connect";

export default function ProgressCard(): JSX.Element {
  const { poolState } = useContext(PersonalInfoContext);
  const { connected } = useWallet();
  // const { connected, select, wallets, wallet, publicKey, disconnect } = useWallet();
  // const { setVisible } = useWalletModal();

  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleClick = () => {
    if(connected) {
      dialogRef.current?.showModal();
    } else {
      // setVisible(true);
      toast.warn(`You should connect your wallet first!`, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  return (
    <>
      <ContributePopup ref={dialogRef} />
      <div className={classes.progress__meter__outer__wrapper}>
        <div className={classes.progress__meter}>
          <div className={classes.progress__total__wrapper}>
            <p className={classes.progress__total__title}>TOTAL RAISED</p>
            <div className={classes.progress__total__sol}>
              <img
                className={classes.progress__total__logo__image}
                src={logoImage}
                alt="logo"
              />
              <span className={classes.progress__total__amount}>{poolState.raised} SOL</span>
            </div>
          </div>
          <ProgressBar />
          <ConnectButton
            handleClick={handleClick}
            className={classes.progress__card__connect__button}
          >
            Deposit
          </ConnectButton>
          {/* <WalletConnect /> */}
        </div>
      </div>
    </>
  );
}
