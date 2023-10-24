import styled from './btn-close.module.scss';

const BtnClose = (props) => {
    return (
        <button {...props} className={styled.BtnClose}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 1L1 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M1 1L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
        </button>
    )
}

export default BtnClose;