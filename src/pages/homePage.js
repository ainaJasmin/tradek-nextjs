import styles from "../styles/homePage.module.css"; 
// import Header from "../components/header.jsx";

function HomePage() {
  return (
    <div>
      <hr className={styles.horizontalLine} />

      <div className={styles.Homepage}>

        {/* overview message */}
        <div className={styles.TradekTitle}>Trade Crypto</div>
        <div className={styles.TradekSlogan}>Tradek: Your Gateway to Crypto Trading.<br /></div>
        <br />
        <div className={styles.Description}>Welcome to Tradek, your go-to crypto trading platform offering top cryptocurrencies and a vibrant community. With our user-friendly interface, you can effortlessly trade Bitcoin, Ethereum, Ripple, Litecoin, and more, while our dynamic forum keeps you connected and informed. Stay ahead with real-time market analysis and expert insights. Join Tradek today and experience the future of crypto trading.</div>

        
        {/* market & forum container */}
        <div className={styles.MarketForumContainer}>

          <div className={styles.Market}>
            <div className={styles.MarketTitle}>Market</div>
            <br />
            <span className={styles.DescriptionMarket}>Explore our comprehensive market analysis tools, providing real-time trends</span>
            <div className={styles.MoreMarket}>More: Market</div>
          </div>

          <div className={styles.Forum}>
            <div className={styles.ForumTitle}>24/7 Forum</div>
            <br />
            <span className={styles.DescriptionForum}>Join our vibrant forum to engage with fellow enthusiasts, share insights in the crypto world</span>
            <div className={styles.MoreForum}>More: Forum</div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default HomePage;
