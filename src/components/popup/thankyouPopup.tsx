import { forwardRef } from "react";

import classes from "./thankyouPopup.module.scss";
import logo from "../../assets/logo.png";

// import { PersonalInfoContext } from "../../web3/PersonalInfo";

export interface ThankyouPopupProps {
  // ref?: RefObject<HTMLDialogElement>,
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

  return (
    <dialog id="dialog2" ref={ref} className={classes.thank__you__popup}>
      <img className={classes.thankyou__logo} src={logo} alt="judgement logo" />
      <p className={classes.thankyou__text}>
        You have purchased 100,000 $JUDGE
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
