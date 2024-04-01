import { forwardRef, useRef, useContext, useState, useEffect } from "react";
import classes from "./contributePopup.module.scss";
import ThankyouPopup from "./thankyouPopup";
import balLogo from "../../assets/bal-logo.png";
import paperImage from "../../assets/paper-image.png";
import crossImage from "../../assets/cross.svg";

import { toast } from "react-toastify";

import { PersonalInfoContext } from "../../web3/PersonalInfo";

const ContributePopup = forwardRef<HTMLDialogElement>(function ContributePopup(
  props,
  ref
) {
  const thankyouPopupRef = useRef<HTMLDialogElement>(null);
  const { userBalance, depositSol, poolState } = useContext(PersonalInfoContext);
  const [contributeSol, setContributeSol] = useState<number>(poolState.minsol);

  // console.log(userBalance);
  const depositButtonClick = async () => {
    // console.log("contribute sol", contributeSol);
    if(!contributeSol) {
      // console.log("false");
      toast.warn(`Please input contribute amount!`, {
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
    const status = await depositSol(contributeSol);
    if(status.status == true) {
      thankyouPopupRef.current?.showModal();
    } else {
      console.log(false);
    }
    console.log("deposit status", status);
    // thankyouPopupRef.current?.showModal()
  }

  const onChangeContribute = (e: any) => {
    setContributeSol(e.target.value);
    // console.log(poolState);
  }

  useEffect(() => {
    setContributeSol(poolState.minsol);
  }, [poolState])

  return (
    <>
      <ThankyouPopup ref={thankyouPopupRef} />
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
            value={contributeSol}
            onChange={(e) => {onChangeContribute(e)}}
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
