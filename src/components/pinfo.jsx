import styles from "../styles/pinfo.css";




export default function Pinfo(){
    
    return(
        <>
            <div className="email">
                <p>Email: testemail@gmail.com</p>
                <button>Change email</button>
            </div>
            
            <div className="username">
                <p>Username: Placeholder Username</p>
                <button>Change Username</button>
            </div>

            <div className="password">
                <p>Password: *********</p>
                <button>Change Password</button>
            </div>

            
        </>
    )
}