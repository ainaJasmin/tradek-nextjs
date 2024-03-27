import styles from "../styles/pinfo.css";
import { useEffect, useState } from "react";
import Popup from "./pinfopopup";




export default function Pinfo(props){
    // const [data, setData] = useState('null')
   

    // useEffect(() => {

    //     setData(props.data);

    // }, [props.data]);

    // console.log(data)

    
    return(
        <>
            <div className="email">
                <p>Email: {props.data.email}</p> 
                {/* <button onClick={() => handleChangeInfo("changeEmail")}>Change email</button> */}
                <Popup option="email" data={props.data}/>
            </div>
            
            <div className="username">
                <p>Username: {props.data.username} </p>
                {/* <button>Change Username</button> */}
                <Popup option="username" data={props.data}/>
            </div>

            <div className="password">
                <p>Password: {props.data.password}</p>
                {/* <button>Change Password</button> */}
                <Popup option="password" data={props.data}/>
            </div>

        
        </>
    )
}