import styled from './search-form.module.scss';
import Image from 'next/image';
import searchIcon from '../../../public/images/search_icon.svg';
import { useState } from 'react';

const SearchForm = ({ placeholder, submit }) => {
  const [request, setRequest] = useState('');
  const onChange = (evt) => {
    setRequest(evt.target.value);
  };
  const formSubmit = (evt) => {
    evt.preventDefault();
    submit(request);
  };
  return (
    <form
      onSubmit={formSubmit}
      className={styled.SearchForm}
    >
      <input
        onChange={onChange}
        value={request || ''}
        className={styled.input}
        type="text"
        placeholder={placeholder}
      />
      <button
        className={styled.submit}
        type="submit"
      >
        <Image
          className={styled.searchIcon}
          width={24}
          height={24}
          src={searchIcon}
          alt="кнопка поиска"
        />{' '}
      </button>
    </form>
  );
};

export default SearchForm;
