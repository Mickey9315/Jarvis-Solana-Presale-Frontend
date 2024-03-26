import Image from "next/image";
import classes from "./page.module.scss";

// components
import SaleInfo from "@/components/saleInfo/saleInfo";
import Counter from "@/components/counter/counter";
import ProgressCard from "@/components/progressCard/progressCard";
import ContributePopup from "@/components/popup/contributePopup";

// images
import heroImage from "@/assets/sale-hero-image.png";
import roundImage from "@/assets/round-section-image.png";
import roundBackgroundImage from "@/assets/round-background-image.png";
import counterBg from "@/assets/counter-bg.png";

// home page hero section
function HeroSection() {
  return (
    <section className={classes.home__hero__section} id="hero">
      <div className={classes.home__hero__image__wrapper}>
        <Image src={heroImage} alt="cowboy infront of sunset" priority />
      </div>
      <h1 className={classes.home__hero__heading}>PRIVATE SALE</h1>
    </section>
  );
}

// home page round sale section
function RoundSection() {
  return (
    <section className={classes.home__round__section} id="round">
      <Image
        className={classes.round__section__background__image}
        src={roundBackgroundImage}
        alt="background image"
      />
      <div className={classes.home__round__section__content__wrapper}>
        <Image
          className={`${classes.round__section__sale__image} ${classes.mobile}`}
          src={roundImage}
          alt="game enviroment image"
        />
        <h2 className={classes.home__round__heading}>$JUDGE</h2>
        <h2>Private Sale Round</h2>
        <div className={classes.round__section__sale__wrapper}>
          <Image
            className={classes.round__section__sale__image}
            src={roundImage}
            alt="game enviroment image"
          />
          <div className={classes.round__section__sale__info__wrapper}>
            <SaleInfo leftText="Hardcap" rightText="1000 SOL" />
            <SaleInfo leftText="Fixed Price" rightText="1 SOL= 10,000 $JUDGE" />
            <SaleInfo leftText="Max Contribution" rightText="50 SOL" />
            <SaleInfo
              leftText="Purchased tokens subject to vesting 
schedule - 25% at DEX listing, 75% 
6 month stream."
              rightText=""
            />
            <p className={classes.sale__info__para}>
              Claiming of <span className="inline__light__text">$JUDGE</span>{" "}
              tokens will be available after completion of the public sale and
              liquidity event.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// counter section
function CounterSection() {
  return (
    <section className={classes.home__counter__section}>
      <Image
        className={classes.counter__section__background__image}
        src={counterBg}
        alt="coins laying on a table"
      />
      <ProgressCard />
      <Counter targetDate="2024-04-14T00:00:00" />
    </section>
  );
}

// home page
export default function Home() {
  return (
    <main className={classes.main}>
      <HeroSection />
      <RoundSection />
      <CounterSection />
    </main>
  );
}
