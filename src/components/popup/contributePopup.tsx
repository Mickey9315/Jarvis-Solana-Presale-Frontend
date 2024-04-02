import { forwardRef, useRef, useContext, useState, useEffect } from "react";
import classes from "./contributePopup.module.scss";
import ThankyouPopup from "./thankyouPopup";
import balLogo from "../../assets/bal-logo.png";
import paperImage from "../../assets/paper-image.png";
import crossImage from "../../assets/cross.svg";

import { toast } from "react-toastify";

import { PersonalInfoContext } from "../../web3/PersonalInfo";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
// import { stat } from "fs";
// import { LAMPORTS_PER_SOL } from "@solana/web3.js";

let contributeAmount = 0;

export interface ContributePopupProps {
  // ref?: RefObject<HTMLDialogElement>,
  closeContributePopupChild: () => void,
}

const ContributePopup = forwardRef<HTMLDialogElement, ContributePopupProps>(function ContributePopup(
  props,
  ref
) {
  
  const thankyouPopupRef = useRef<HTMLDialogElement>(null);
  const { userBalance, depositSol, contributeInfo, poolState } = useContext(PersonalInfoContext);
  const [contributeSol, setContributeSol] = useState<string>(poolState.minsol.toString());

  const getContributeSol = () => {
    if( contributeSol.length == 0 ) return 0;
    return Number(parseFloat(contributeSol).toFixed(2));
  }
  const validateInput = (contributeSol: number) => {
    let msg_str = "";
    let flag = true;
    // if(!contributeSol) {
    //   msg_str = `Please input contribute amount!`;
    //   flag = false;
    // }
    if(contributeSol + poolState.raised > poolState.hardcap) {
      msg_str = `Cannot overflow hardcap!`;
      flag = false;
    }

    // console.log(contributeInfo);
    if(contributeInfo.amount / LAMPORTS_PER_SOL + contributeSol > poolState.maxsol) {
      msg_str = `Overflow max contribute amount!`;
      flag = false;
    }

    if(userBalance < contributeSol) {
      msg_str = `Insufficient funds!`;
      flag = false;
    }

    if(poolState.pause == true) {
      msg_str = `Presale has paused!`;
      flag = false;
    }

    if(flag == false) {
      props.closeContributePopupChild();
      toast.warn(msg_str, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return false;
    }
    return true;
  }
 
  // console.log(userBalance);
  const depositButtonClick = async () => {
    // console.log("contribute sol", contributeSol);
    let err_str = "";

    if(!validateInput(getContributeSol())) {
      return;
    }

    contributeAmount = getContributeSol();
    
    const status = await depositSol(getContributeSol());
    // console.log(status);
    if(!status.error) {
      thankyouPopupRef.current?.showModal();
    } else {
      if(!status.error) {
        err_str = "Unknown Issue";
      } else {
        err_str = status.error.msg;
      }
      props.closeContributePopupChild();
      toast.warn(err_str, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }

  const closeThankyouDlg = () => {
    thankyouPopupRef.current?.close();
    props.closeContributePopupChild();
  }

  useEffect(() => {
    setContributeSol(poolState.minsol.toString());
  }, [poolState])

  return (
    <>
      <ThankyouPopup ref={thankyouPopupRef} closeThankyouPopupChild={closeThankyouDlg} purchase_amount={contributeAmount}/>
      <dialog className={classes.popup} ref={ref}>
        <div className={classes.balance__wrapper}>
          <div className={classes.balance__heading__wrapper}>
            <img
              className={classes.popup__logo}
              src={balLogo}
              alt="judgement logo"
            />
            <p>WALLET BALANCE</p>
          </div>
          <div className={classes.balance}>
            <p>WALLET BALANCE</p>
            <p className={classes.balance__amount}>{userBalance} SOL</p>
            <img
              className={classes.balance__paper__image}
              src={paperImage}
              alt="paper image"
            />
          </div>
        </div>
        <div className={classes.contribute__wrapper}>
          <div className={classes.balance__heading__wrapper}>
            <img
              className={classes.popup__logo}
              src={balLogo}
              alt="judgement logo"
            />
            <p>CONTRIBUTION BOX</p>
          </div>
          <input
            type="number"
            name="sol"
            id="sol"
            min={poolState.minsol}
            max={poolState.maxsol}
            step={0.01}
            placeholder={poolState.minsol + " ~ " + poolState.maxsol + " sol"}
            value={getContributeSol()}
            onChange={(e) => {setContributeSol(e.target.value)}}
            className={classes.contribute__input + ' no-spin'}
          />
        </div>
        <button
          className={`${classes.contribute__button} button`}
          onClick={depositButtonClick}
        >
          CONTRIBUTE
        </button>
        <form method="dialog" className={classes.popup__form}>
          <button>
            <img
              className={classes.close__button}
              src={crossImage}
              alt="close popup"
            />
          </button>
        </form>
      </dialog>
    </>
  );
});

export default ContributePopup;
