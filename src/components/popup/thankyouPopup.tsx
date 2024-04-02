import { forwardRef } from "react";

import classes from "./thankyouPopup.module.scss";
import logo from "../../assets/logo.png";

// import { PersonalInfoContext } from "../../web3/PersonalInfo";

const judge_rate = import.meta.env.VITE_APP_JUGE_RATE;

export interface ThankyouPopupProps {
  // ref?: RefObject<HTMLDialogElement>,
  purchase_amount: number,
  closeThankyouPopupChild: () => void,
}

const ThankyouPopup = forwardRef<HTMLDialogElement, ThankyouPopupProps>(function ThankyouPopup(
  props,
  ref
) {
  // const { depositSol } = useContext(PersonalInfoContext);

  const closeButtonClick = () => {
    props.closeThankyouPopupChild();
  }

  console.log(props.purchase_amount)
  return (
    <dialog id="dialog2" ref={ref} className={classes.thank__you__popup}>
      <img className={classes.thankyou__logo} src={logo} alt="judgement logo" />
      <p className={classes.thankyou__text}>
        You have purchased {Number(judge_rate) * Number(props.purchase_amount)} $JUDGE
      </p>
      <div className={classes.thankyou__divider}></div>
      <p className={classes.thankyou__text__white}>
        Get ready for Jury service soon!
      </p>
      <form method="dialog" className={classes.popup__form}>
        <button onClick={closeButtonClick} className={`${classes.thankyou__close__button} button`}>
          CLOSE
        </button>
      </form>
    </dialog>
  );
});

export default ThankyouPopup;
