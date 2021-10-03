import styled from 'styled-components'
import colors from '../../styles/colors'

export const Input = styled.input`
  display: none;

  :checked + label {
    background-image: linear-gradient(to right, #c850c0, ${colors.primary});
  }

  :checked + label::after {
    left: 24px;
  }
`

export const Button = styled.label`
  background: #ccc;
  width: 56px;
  padding: 0;
  height: 22px;
  border-radius: 10px;
  position: relative;
  display: flex !important;
  align-items: center;
  margin: 0 !important;
  cursor: pointer;

  ::after {
    content: '';
    position: absolute;
    width: 22px;
    height: 10px;
    background: #fff;
    left: 8px;
    border-radius: 6px;
    transition: all 0.2s linear;
    box-shadow: 3px 2px 15px 4px rgba(0, 0, 0, 0.1);
  }
`
