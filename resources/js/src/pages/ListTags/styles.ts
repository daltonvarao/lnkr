import styled from 'styled-components'
import colors from '../../styles/colors'

export const Container = styled.div`
  width: 100%;
`

export const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  a {
    padding: 0.5rem 1rem;
    border-radius: 10px;
    background: ${colors.primary};
    color: #fff;
    display: flex;
    align-items: center;
    transition: box-shadow ease-in-out 0.15s, border-color ease-in-out 0.15s;

    svg {
      margin-left: 0.5rem;
    }

    :hover {
      border-color: #86b7fe;
      box-shadow: 0 0 0 3px rgba(38, 132, 255, 0.25);
    }
  }
`

export const ListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  @media screen and (min-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media screen and (min-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`

export const ItemContainer = styled.div`
  padding: 2rem;
  width: 100%;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.07);
  display: flex;
  flex-direction: column;
  position: relative;

  ::before {
    content: '';
    width: 12px;
    height: 60%;
    position: absolute;
    top: 20%;
    left: 0;
    background: ${(props) => props.color};
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`

export const ItemHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`

export const ItemTitle = styled.h3``

export const FooterActions = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-end;

  a {
    background: transparent;
    padding: 0;
    font-size: 22px;
    display: flex;

    color: ${(props) => props.color};
  }
`

export const FooterAction = styled.button`
  background: transparent;
  padding: 0;
  font-size: 22px;
  display: flex;

  color: ${(props) => props.color};

  + a {
    margin-left: 0.5rem;
  }
`
