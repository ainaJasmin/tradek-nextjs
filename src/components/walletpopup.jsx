import React, {useEffect, useState} from "react";
import { doc, updateDoc} from 'firebase/firestore';
import {firestore} from "../app/db.js";
import { collection, getDocs, getDoc, query, where } from 'firebase/firestore';
import '../styles/pinfopopup.css';
import '../styles/wpopup.css';



async function changeSubmit(option, dbData, amount, recipient, setData, setAmount, setErrors, togglePopup, setRecipient){
    try{
        const dbDoc = doc(firestore, 'User Info', dbData.docID)
        const dummy = {...dbData}
        let newbalance = 0;
        if  (amount != ""){  
            switch (option.toLowerCase()){
                case "deposit":   
                    newbalance = parseFloat(dummy.balance) + parseFloat(amount);
                    dummy.balance = newbalance;
                    await updateDoc(dbDoc, {"balance": newbalance});  
                    setData(dummy);
                    console.log("New balance:", newbalance);
                    togglePopup();
                    break;
                case "withdraw":
                    newbalance = parseFloat(dummy.balance) - parseFloat(amount);
                    if (newbalance < 0) {
                        setErrors(p => ({...p, amountError: true}));
                    }
                    else {
                        dummy.balance = newbalance;
                        await updateDoc(dbDoc, {"balance": newbalance});  
                        setData(dummy);
                        console.log("New balance:", newbalance);
                        togglePopup();
                    }
                    break;
                case "transfer":
                    newbalance = parseFloat(dummy.balance) - parseFloat(amount);
                    if (newbalance < 0) {
                        setErrors(p => ({...p, amountError: true}));
                        return;
                    }
                    if (recipient===null || recipient===""){
                        setErrors(p => ({...p, usernameError: true}));
                        return;
                    }
                    else {
                        // Update senders details
                        dummy.balance = newbalance;
                        await updateDoc(dbDoc, {"balance": newbalance});  
                        setData(dummy);
                        console.log("New balance:", newbalance);

                        // Update recipient details
                        const q = query(collection(firestore, 'User Info'), where ('username','==',recipient));
                        const result = await getDocs(q);
                        if (result.empty){
                            setErrors(p => ({...p, usernameError: true}));
                            return;
                        }
;
                        const recipientDBRef = result.docs[0].ref;
                        const recipientDoc = await getDoc(recipientDBRef);
                        const recipientData = recipientDoc.data();
                        newbalance = parseFloat(recipientData.balance) + parseFloat(amount);
                        await updateDoc(recipientDBRef, {balance: newbalance});
                        console.log(`Successfully transferred ${amount} from ${dummy.username} to ${recipientData.username}`);
                        togglePopup();
                        
                        

                    }
                    break;
                case "convert":
                    break;
                default:
                    return null;
                }
                setAmount("");
                setRecipient("");

            } else {
                setErrors(p => ({ ...p, amountError0: true }));
                if (!recipient) {
                    setErrors(p => ({ ...p, usernameError: true }));
                }
            }

    } catch(e){console.error(e)}
}


export default function Popup(props){
    const [pop, setPopup] = useState(false);
    const [option, setOption] = useState('null');
    const [placeholder, setPlaceholder] = useState('0');
    const [inputType, setInputType] = useState('number');
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');
    const [errors, setErrors] = useState(null);



    const handleChange = (e) => {
        setAmount(e.target.value);
    }

    const handleRChange = (e) => {
        setRecipient(e.target.value);
    }

    const togglePopup = () =>{
        setPopup(p => !p);
        setErrors({});

    }

    

    useEffect(() =>{
        switch (props.option){
            case "deposit":
                setOption('Deposit');
    
                break;
            case "withdraw":
                setOption('Withdraw');
            
                break;
            case "transfer":
                setOption("Transfer");
                break;
            case "convert":
                setOption("Convert");
                
                break;
            default:
                return null;
            }
        }, [props.option]);
    



    return(
        <>
            <button className={`pop-btn-${option.toLowerCase()}`} onClick={togglePopup}>{option}</button>

            {pop && (
                <div className="popup">
                    
                    <div className="overlay" onClick={togglePopup}></div>
                    <div className="pop-container">
                        <div className="form">
                            <h1>{option}</h1>
                            <div className={`new-input`}>
                                <div className={`input-container ${option.toLowerCase()=='transfer' ? `-transfer` : ""} ${Object.keys(errors).length ? '-error' : ""}`}>
                                    <label>Please enter an amount to {option.toLowerCase()}: </label>
                                    $<input type={inputType} value={amount} onChange={handleChange} placeholder={placeholder} min="0"/>
                                    
                                </div>
                                {errors.amountError && <div className="error">You cannot withdraw/transfer more than you have in your account</div>}
                                {errors.amountError0 && <div className="error">You cannot withdraw/transfer $0</div>}
                                {option.toLowerCase() == 'transfer' && (
                                        <>
                                        
                                            <div className={`input-recipient ${option.toLowerCase()=='transfer' ? `-transfer` : ""}`}>
                                                <label>Please enter the username of the recipient:</label>
                                                <input type='text' value={recipient} onChange={handleRChange} placeholder='Recipient Username'/>
                                            </div>
                                            {errors.usernameError && <div className="error">User does not exist</div>}
                                        </>
                                    )}
                                <div className="submitbtn-container">
                                    <button id="submit" onClick={() => {changeSubmit(option, props.data, amount, recipient, props.setData, setAmount, setErrors, togglePopup, setRecipient)}}>Submit</button>
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