import styled from 'styled-components'

export const Container = styled.div``

export const InputContainer = styled.div`
  position: relative;
  display: flex;

  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;
  padding: 0.25rem;
  border-radius: 0.35rem;
  height: 44px;

  &.focused {
    border-color: #86b7fe;
    box-shadow: 0 0 0 3px rgba(38, 132, 255, 0.25);
    transition: box-shadow ease-in-out 0.15s, border-color ease-in-out 0.15s;
  }
`

export const SelectedTags = styled.div`
  display: flex;
`

export const SelectedTag = styled.div`
  padding-left: 1rem;
  padding-right: 5px;
  border-radius: 30px;
  background: ${(props) => (props.color ? props.color + '29' : '#f0f0fd')};
  color: ${(props) => (props.color ? props.color : '#676767')};

  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 500;

  span {
    color: #676767;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
    border-radius: 50%;
    height: 24px;
    width: 24px;
    margin-left: 0.5rem;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.08);

    svg {
      color: tomato;
    }
  }

  span:hover {
    box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.08);
    cursor: pointer;
  }

  + div {
    margin-left: 0.25rem;
  }
`
export const Input = styled.input`
  border: 0;
  padding: 0 0.5rem;
  width: 100%;

  :focus {
    outline: none;
  }

  + div {
    margin: 0;
  }
`

export const SelectContainer = styled.div`
  display: flex;
  width: 100%;
  position: relative;
`

export const SelectList = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  top: 0.5rem;
  padding: 0.5rem 0;
  flex-direction: column;
  background: #fff;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  border-radius: 0.35rem;

  max-height: 160px;
  overflow-y: scroll;
  border: 1px solid rgba(0, 0, 0, 0.1);
`

export const SelectItem = styled.div`
  display: flex;
  padding: 0.5rem 1rem;
  font-weight: 500;

  color: ${(props) => props.color};

  :hover {
    background: ${(props) => (props.color ? props.color + '27' : '#abc9febf')};
    cursor: pointer;

    transition: background 0.15s linear;
  }
`
