import React from 'react'
import Modal from './Modal'

//ModalList will take an array of modals and process them individually
//ModalList is expected to only display 1 Modal at a time
export default function ModalList({modals}) {
    return (
        modals.map(modal=>{
            return <Modal key={modal.id} characterName = {modal.characterName} characterStatus={modal.characterStatus} deathYear = {modal.deathYear} />
        })
    )
}
