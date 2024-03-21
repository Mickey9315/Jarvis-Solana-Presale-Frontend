import Image from "next/image";
import classes from "./footer.module.scss";

// images
import footerLogo from "@/assets/footer-logo.png";
import xLogo from "@/assets/x-logo.svg";

export default function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.footer__container}>
        <div className={classes.footer__logo__wrapper}>
          <Image
            className={classes.footer__logo}
            src={footerLogo}
            alt="footer logo"
          />
          <p className={classes.footer__logo__title}>Judgement</p>
        </div>
        <div className={classes.footer__links}>
          <div className={classes.footer__links__wrapper}>
            <a className={classes.footer__link} href="/">
              The Crypto Court
            </a>
            <a className={classes.footer__link} href="/">
              Blockchain
            </a>
            <a className={classes.footer__link} href="/">
              Token Utility & Revenue Streams
            </a>
            <a className={classes.footer__link} href="/">
              Token Tax
            </a>
            <a className={classes.footer__link} href="/">
              Staking Mechanism & Fees
            </a>
          </div>
          <div className={classes.footer__links__wrapper}>
            <a className={classes.footer__link} href="/">
              Tokenomics
            </a>
            <a className={classes.footer__link} href="/">
              Community Building Incentives
            </a>
            <a className={classes.footer__link} href="/">
              Judgements & NFT Auctions
            </a>
            <a className={classes.footer__link} href="/">
              Vision Map
            </a>
          </div>
        </div>
        <a href="" className={classes.footer__x__logo}>
          <Image src={xLogo} alt="x/twitter logo" />
        </a>
      </div>
    </footer>
  );
}
