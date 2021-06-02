import styled from 'styled-components'
import colors from '../../styles/colors'

export const Container = styled.div`
  background: #fff;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column-reverse;
  align-self: center;
  justify-content: space-between;
  border-radius: 18px;
  overflow: hidden;

  box-shadow: 0 0 15px rgba(0, 0, 0, 0.07);

  @media screen and (min-width: 768px) {
    max-width: 820px;
    flex-direction: row;
    height: 500px;
  }
`

export const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;

  h1 {
    display: none;
  }

  @media screen and (min-width: 768px) {
    width: 50%;
    padding: 2rem;

    h1 {
      margin-bottom: 1rem;
      display: block;
    }
  }
`

export const IllustrationContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  justify-content: center;
  align-items: center;
  background-color: ${colors.primary};
  background-image: linear-gradient(135deg, #c850c0 0%, ${colors.primary} 73%);

  h1 {
    font-size: 68px;
    color: #fff;
  }

  p {
    max-width: 250px;
    color: #fff;
    display: none;
  }

  @media screen and (min-width: 768px) {
    width: 50%;

    p {
      display: block;
    }

    h1 {
      font-size: 88px;
      color: #fff;
    }
  }
`

export const RegisterLinkContainer = styled.div`
  padding: 1rem;
  text-align: center;
  width: 100%;
`

export const ErrorMessage = styled.div`
  padding: 0.5rem 0;
  width: 100%;
  font-size: 14px;
  font-weight: 500;
  color: tomato;
  border-radius: 12px;
`
