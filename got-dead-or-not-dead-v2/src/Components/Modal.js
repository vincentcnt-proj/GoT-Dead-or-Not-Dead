import React from 'react'

//Set possible characterStatuses 
const charStatusList = ["alive", "dead", "unknown"]

//Get flavor text for an Alive character
function getAliveMessage(){
    let aliveMessages = ["Your hero lives on...", "They avoid death for now..."];
    let aliveMessagesLength = aliveMessages.length;

    let randomNum = Math.floor(Math.random()*aliveMessagesLength);

    return aliveMessages[randomNum]
}

//Get flavor text for a Dead character
function getDeadMessage(){
    let deadMessages = ["Your hero is dead...", "They have met death..."];
    let deadMessagesLength = deadMessages.length;

    let randomNum = Math.floor(Math.random()*deadMessagesLength);

    return deadMessages[randomNum]
}

//Get flavor text for an Unknown character
function getUnknownMessage(){
    let unknownMessages = ["We do not have the answer you seek...", "Their fate is unknown even to us..."];
    let unknownMessagesLength = unknownMessages.length;

    let randomNum = Math.floor(Math.random()*unknownMessagesLength);

    return unknownMessages[randomNum]
}

//Get the correct message type to display based on characterStatus
function getStatusMessage(charStatus){
    switch (charStatus){
        case charStatusList[0]:
            return getAliveMessage();
        case charStatusList[1]:
            return getDeadMessage();
        default:
            return getUnknownMessage();
    };
}

//Modal is a card-like element that displays available information based on available character data
export default function Modal({characterName, characterStatus, deathYear}) {
    return (
        <div className="_modal">
            <div><h2>{characterName ? characterName : null}</h2></div>
            <div><h1>{getStatusMessage(characterStatus)}</h1></div>
            <div><h2>{deathYear ? deathYear : null}</h2></div>
            <div><h6>Navigate the darkness to search another fate</h6></div>
        </div>
    )
}
