import React from "react";
import styled from "styled-components";
import { useController } from "react-hook-form";

const TextAreaStyles = styled.div`
  position: relative;
  width: 100%;
  textarea {
    width: 100%;
    height: 200px;
    padding: ${(props) =>
      props.hasIcon ? "16px 60px 16px 20px" : "16px 20px"};
    background-color: ${(props) => props.theme.grayLight};
    border: 1px solid transparent;
    border-radius: 8px;
    transition: all 0.2s linear;
    color: ${(props) => props.theme.black};
    font-size: 14px;
    &:focus {
      border-color: ${(props) => props.theme.primary};
      background-color: transparent;
    }
  }
  input::-webkit-input-placeholder {
    color: #b2b3bd;
    position: absolute;
    top: 20px;
  }
  input::-moz-input-placeholder {
    color: #b2b3bd;
    position: absolute;
    top: 20px;
  }
  /* .input-icon {
    position: absolute;
    color: orange;
    left: 20px;
    top: 20px;
    cursor: pointer;
  } */
`;
/**
 *
 * @param {*} placeholder(optional) - Placeholder of input
 * @param {*} name(optional) - name of input
 * @param {*} control - control from react hook form
 * @returns Input
 */
const TextArea = ({
  name = "",
  type = "text",
  children,
  control,
  ...props
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <TextAreaStyles hasIcon={children ? true : false}>
      <textarea id={name} type={type} {...field} {...props} />
      {children ? <div className="input-icon">{children}</div> : null}
    </TextAreaStyles>
  );
};

export default TextArea;
