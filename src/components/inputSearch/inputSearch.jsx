import { Fragment, useState } from 'react';
import Image from 'next/image';
import styled from './inputSearch.module.scss';

const InputSearch = ({ onSearch }) => {
  const [isFilled, setIsFilled] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const inputHandler = (evt) => {
    setInputValue(evt.target.value);
    if (evt.target.value.length > 0) {
      setIsFilled(true);
    } else {
      setIsFilled(false);
    }
    onSearch(evt.target.value);
  };

  const iconStyle = isFilled
    ? styled.InputSearch__iconHidden
    : styled.InputSearch__icon;

  return (
    <Fragment>
      <label className={styled.InputSearch__label}>
        <input
          className={styled.InputSearch}
          type="search"
          placeholder="Поиск"
          onChange={inputHandler}
          value={inputValue}
        />
        <Image
          className={iconStyle}
          src="/search.svg"
          width={24}
          height={24}
          alt="Search icon"
        />
      </label>
    </Fragment>
  );
};

export default InputSearch;
