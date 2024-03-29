import styles from '../styles/header.css';


const Header = () => {
    return(
        <header>
            <div className="header-container">
                <p id="tradek">Tradek</p>
                <button id="sign-btn">Sign in</button>
            </div>
        </header>
    )
}

export default Header;