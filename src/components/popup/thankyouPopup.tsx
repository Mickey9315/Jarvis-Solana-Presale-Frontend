import { forwardRef, ForwardedRef } from "react";

import classes from "./thankyouPopup.module.scss";
import logo from "../../assets/logo.png";

const ThankyouPopup = forwardRef<HTMLDialogElement>(function ThankyouPopup(
  props,
  ref: ForwardedRef<HTMLDialogElement>
) {
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
        <button className={`${classes.thankyou__close__button} button`}>
          CLOSE
        </button>
      </form>
    </dialog>
  );
});

export default ThankyouPopup;
