import Image from "next/image";
import styles from "./HomePage.module.css"; // Import CSS file
import cryptoBackg from "./cryptoBackg.png";

function HomePage() {
  return (
    <div className={styles.Homepage}>

      {/* header
      <div className={styles.HeaderHomePage}> 
        <div className={styles.TradekLogo}>Tradek</div>
        <div className={styles.signInContainer} />
        <div className={styles.SignIn}>Sign In</div>
      </div> */}
      header
      <br/>

      <hr className={styles.horizontalLine}/>

      {/* overview message */}
      <div className={styles.TradekTitle}>Trade Crypto</div>
      <div className={styles.TradekSlogan}>Tradek: Your Gateway to Crypto Trading.<br/></div>
      <div className={styles.Description}>Welcome to Tradek, your go-to crypto trading platform offering top cryptocurrencies and a vibrant community. With our user-friendly interface, you can effortlessly trade Bitcoin, Ethereum, Ripple, Litecoin, and more, while our dynamic forum keeps you connected and informed. Stay ahead with real-time market analysis and expert insights. Join Tradek today and experience the future of crypto trading.</div>

      {/* backgorund img */}
      <div className={styles.backImg}></div>
      
      {/* market & forum container */}
      <div className={styles.MarketForumContainer}>

        <div className={styles.Market}>
          <div className={styles.Market}>
            Market
            <br/>
            <span className={styles.DescriptionMarket}>Explore our comprehensive market analysis tools, providing real-time trends</span>
          </div>
          <div className={styles.MoreMarket}>More: Market</div>
        </div>

        <div className={styles.Forum}>
          <div className={styles.Forum}>
            24/7 Forum
            <br/>
            <span className={styles.DescriptionForum}>Join our vibrant forum to engage with fellow enthusiasts, share insights in the crypto world</span>
          </div>
          <div className={styles.MoreForum}>More: Forum</div>
        </div>
      
      </div>
    </div>    
  );
}

export default HomePage;
