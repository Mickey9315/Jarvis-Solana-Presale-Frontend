import classes from "./saleInfo.module.scss";

type SaleInfoProps = {
  leftText: string;
  rightText: string;
};

// sale info page image
import saleInfoBackgroundImage from "../../assets/paper-image.png";

export default function SaleInfo({ leftText, rightText }: SaleInfoProps) {
  return (
    <div className={classes.sale__info}>
      <img
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
