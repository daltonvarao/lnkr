import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
`

export const Button = styled.button`
  background: transparent;

  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  transition: all 0.3s;

  :hover {
    border-color: #86b7fe;
    box-shadow: 0 0 0 3px rgba(38, 132, 255, 0.25);
    transition: box-shadow ease-in-out 0.15s, border-color ease-in-out 0.15s;
  }
`

export const QRContainer = styled.div`
  position: absolute;
  z-index: 125;

  display: flex;
  align-items: center;
  right: 0;
  top: 38px;
  padding: 1rem;
  background: #fff;
  border-radius: 0.5rem;
  border: 1px solid #bbb4;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
`
