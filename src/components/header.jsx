import styles from '../styles/header.css';
import {useAuthState} from 'react-firebase-hooks/auth'
import {auth} from '@/app/db.js'

const Header = () => {
    const [user] = useAuthState(auth);
    return(
        <header>
            <div className="header-container">
                <p id="tradek">Tradek</p>
                if (!user){
                    <button id="sign-btn">Sign in</button>
                }
            </div>
        </header>
    )
}

export default Header;