import styles from "../app/page.module.css";
import gstyles from "../app/globals.css";
import aStyles from "../styles/account.module.css";
import Header from "../components/Header";

export default function Account() {
  return (
    <>
    <Header/>
    <main className={aStyles.main}>
        <div className={aStyles['options-settings-container']}>
            <div className={aStyles['account-options']}>
                <ul>
                    <li>Personal Information</li>
                    <li>Wallet</li>
                </ul>
            </div>
            <div className={aStyles.settings}>
                <p>Here we have some mock settings Lorem ipsum </p>
            </div>
        </div>
    </main>
    </>
  );
}