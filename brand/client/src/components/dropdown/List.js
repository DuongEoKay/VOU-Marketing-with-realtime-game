import React from "react";
import { useDropdown } from "./dropdown-context";
import styled from "styled-components";

const ListStyles = styled.div`
  .list {
    max-height: 300px;
    overflow-y: auto;
    z-index: 9999;
  }
`;

const List = ({ children }) => {
  const { show } = useDropdown();
  return (
    <ListStyles>
      {show && (
        <div className="top-100 absolute left-0 w-full bg-white shadow-sm top-full list">
          {children}
        </div>
      )}
    </ListStyles>
  );
};

export default List;
