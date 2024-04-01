import { forwardRef, useRef, useContext } from "react";
import classes from "./contributePopup.module.scss";
import ThankyouPopup from "./thankyouPopup";
import balLogo from "../../assets/bal-logo.png";
import paperImage from "../../assets/paper-image.png";
import crossImage from "../../assets/cross.svg";

import { PersonalInfoContext } from "../../web3/PersonalInfo";

const ContributePopup = forwardRef<HTMLDialogElement>(function ContributePopup(
  props,
  ref
) {
  const thankyouPopupRef = useRef<HTMLDialogElement>(null);
  const { userBalance } = useContext(PersonalInfoContext);

  // console.log(userBalance);

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
            type="text"
            name="sol"
            id="sol"
            className={classes.contribute__input}
          />
        </div>
        <button
          className={`${classes.contribute__button} button`}
          onClick={() => thankyouPopupRef.current?.showModal()}
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
