import styled from 'styled-components'
import colors from '../../styles/colors'

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 60px;
  z-index: 200;
  display: flex;

  flex-direction: column;
  justify-content: space-between;

  background-image: linear-gradient(135deg, #c850c0 0%, ${colors.primary} 23%);

  box-shadow: 0 0 15px rgba(0, 0, 0, 0.07);

  @media screen and (min-width: 768px) {
    width: 80px;
  }
`
export const Title = styled.h2`
  padding: 1rem 0.75rem;
  text-align: center;
  color: #fff;
  height: 60px;
  font-size: 16px;

  @media screen and (min-width: 768px) {
    padding: 1.5rem 1rem;
    font-size: 24px;
  }
`

export const Navigation = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ul {
    list-style-type: none;
    position: relative;
  }

  ul li {
    max-height: 82px;
    height: 82px;
  }

  ul li a,
  ul li span {
    display: block;
    padding: 1.5rem 1rem;
    text-align: center;
    color: #acaaff;
  }

  ul li.logout {
    align-self: flex-end;
  }

  ul li a:hover,
  ul li span:hover {
    cursor: pointer;
    color: #fff;
  }

  ul #active-item {
    position: absolute;
    right: 0;
    top: 0;
    width: 3px;
    height: 82px;
    background: #fff;
    transition: all 0.25s linear;
  }

  ul li a.active,
  ul li span.active {
    color: #fff;
  }
`
export const LogoutButton = styled.button`
  width: 100%;
  background: transparent;
  color: #fff;

  :hover {
    cursor: pointer;
    transform: scale(1.15);
    transition: transform 0.2s;
  }
`
