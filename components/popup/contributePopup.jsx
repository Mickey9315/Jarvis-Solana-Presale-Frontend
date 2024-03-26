"use client";

import { forwardRef, useRef } from "react";
import classes from "./contributePopup.module.scss";
import Image from "next/image";

// components
import ThankyouPopup from "./thankyouPopup";

// images
import balLogo from "@/assets/bal-logo.png";
import paperImage from "@/assets/paper-image.png";
import crossImage from "@/assets/cross.svg";

const ContributePopup = forwardRef(function ContributePopup(props, ref) {
  const thankyouPopupRef = useRef();

  return (
    <>
      <ThankyouPopup ref={thankyouPopupRef} />
      <dialog className={classes.popup} ref={ref}>
        <div className={classes.balance__wrapper}>
          <div className={classes.balance__heading__wrapper}>
            <Image
              className={classes.popup__logo}
              src={balLogo}
              alt="judgement logo"
            />
            <p>WALLET BALANCE</p>
          </div>
          <div className={classes.balance}>
            <p>WALLET BALANCE</p>
            <p className={classes.balance__amount}>800 SOL</p>
            <Image
              className={classes.balance__paper__image}
              src={paperImage}
              alt="paper image"
            />
          </div>
        </div>
        <div className={classes.contribute__wrapper}>
          <div className={classes.balance__heading__wrapper}>
            <Image
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
          onClick={() => thankyouPopupRef.current.showModal()}
        >
          CONTRIBUTE
        </button>
        <form method="dialog" className={classes.popup__form}>
          <button>
            <Image
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
