import styled from './cross-icon.module.scss';

const CrossIcon = (props) => {
    function eventClick(e){
        e.stopPropagation();
        props.onDelete(props.index);
    }

    return (
        <div className={styled.CrossIcon} onClick={eventClick}>
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="Frame 2131326823">
                <g id="Group 1000002714">
                <path id="Vector 2244" d="M20 6L6 20" stroke="#007FFF" strokeWidth="2" strokeLinecap="round"/>
                <path id="Vector 2245" d="M6 6L20 20" stroke="#007FFF" strokeWidth="2" strokeLinecap="round"/>
                </g>
                </g>
            </svg>
        </div>
    )
}

export default CrossIcon;