import styled from "./list.module.scss";

const List = ({ list, renderItem }) => {
  return (
    <div className={styled.List}>
      <ul className={styled.List__ul}>
        {list.map((item) => renderItem(item))}
      </ul>
    </div>
  );
};

export default List;
