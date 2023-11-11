import React from 'react'
import styles from './delete-button.module.scss'

export default function DeleteButton({ handleButtonClick }) {


  return (
    <button className={styles.DeleteButton} onClick={ handleButtonClick }>
        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
            <path d="M20 6L6 20" stroke="#007FFF" strokeWidth="2" strokeLinecap="round"/>
            <path d="M6 6L20 20" stroke="#007FFF" strokeWidth="2" strokeLinecap="round"/>
        </svg>
    </button>
  )
}
