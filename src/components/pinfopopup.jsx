import React, {useEffect, useState} from "react";
import { doc, updateDoc} from 'firebase/firestore';
import {firestore} from "../app/db.js";
import '../styles/popup.css';


async function changeSubmit(option, dbData, input){
        
    
    try{
        const dbDoc = doc(firestore, 'User Info', dbData.docID)
            
        if  (input != ""){  
            switch (option.toLowerCase()){
                case "email":
                    await updateDoc(dbDoc, {"email": input}); 
                    console.log("Email changed to: ",input);
                    break;
                case "username":
                    await updateDoc(dbDoc, {"username": input}); 
                    console.log("Username changed to: ",input);
                    break;
                case "password":
                    await updateDoc(dbDoc, {"password": input}); 
                    console.log("Password changed to: ",input);
                    break;
                default:
                    return null;
                }

            } else {
                alert('Please make sure all fields are filled out correctly!')
            }

    } catch(e){console.error(e)}
}


export default function Popup(props){
    const [pop, setPopup] = useState(false);
    const [option, setOption] = useState('null');
    const [placeholder, setPlaceholder] = useState('');
    const [inputType, setInputType] = useState('');
    const [inputValue, setInputValue] = useState('');

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    const togglePopup = () =>{
        setPopup(p => !p);
    }

    useEffect(() =>{
        switch (props.option){
            case "email":
                setOption('Email');
                setPlaceholder('example@email.com');
                setInputType('email');
                break;
            case "username":
                setOption('Username');
                setPlaceholder('Username');
                setInputType('text');
                break;
            case "password":
                setOption("Password");
                setPlaceholder('Password');
                setInputType('password');
                break;
            default:
                return null;
            }
        }, [props.option]);
    



    return(
        <>
            <button className="pop-btn" onClick={togglePopup}>Change {option}</button>

            {pop && (
                <div className="popup">
                    
                    <div className="overlay" onClick={togglePopup}></div>
                    <div className="pop-container">
                        <div className="form">
                            <h1>Change {option}</h1>
                            <div className="new-input">
                                <div className="input-container">
                                    <label>Please enter your new {option.toLowerCase()}: </label>
                                    <input type={inputType} value={inputValue} onChange={handleChange} placeholder={placeholder}/>
                                </div>
                                <div className="submitbtn-container">
                                    <button id="submit" onClick={() => changeSubmit(option, props.data, inputValue)}>Submit</button>
                                </div>
                            </div>
                        </div>     


                        <button className="close-btn" onClick={togglePopup}>&times;</button>
                    </div>
                    
                </div>
                )}
                
        </>
    )
}