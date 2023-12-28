import styled from './example-button.module.scss';
import {useState} from "react";

export const ExampleButton = (props) => {
    const [count, setCount] = useState(props.initialValue || 0);

    const handleClick = () => {
        setCount(count + 1);
    }

    return (
        <button
            className={styled.ExampleButton}
            onClick={handleClick}
        >
            <span className={styled.ExampleButton__text}>Clicked {count} times</span>
        </button>
    )
}
