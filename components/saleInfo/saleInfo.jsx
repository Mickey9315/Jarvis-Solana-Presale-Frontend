import Image from "next/image";
import classes from "./saleInfo.module.scss";

// sale info page image
import saleInfoBackgroundImage from "@/assets/paper-image.png";

export default function SaleInfo({ leftText, rightText }) {
  return (
    <div className={classes.sale__info}>
      <Image
        className={classes.sale__info__bg__image}
        src={saleInfoBackgroundImage}
        alt="antique paper"
      />
      <div className={classes.sale__info__left}>
        <p>{leftText}</p>
      </div>
      <div className={classes.sale__info__right}>
        <p>{rightText}</p>
      </div>
    </div>
  );
}
