import styled from 'styled-components'
import colors from '../../styles/colors'

export const Container = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-self: center;

  a {
    padding: 0.75rem 1rem;
    background: ${colors.primary};
    color: #fff;
    border-radius: 0.5rem;
    font-weight: 600;
    text-align: center;
    background-size: 200% auto;
    background-image: linear-gradient(to right, #c850c0 0%, ${colors.primary} 51%, #c850c0 100%);
    transition: 0.5s;

    :hover {
      background-position: right center;
    }

    :focus {
      border-color: #86b7fe;
      box-shadow: 0 0 0 3px rgba(38, 132, 255, 0.25);
      transition: box-shadow ease-in-out 0.15s, border-color ease-in-out 0.15s;
    }
  }

  h2 {
    text-align: center;
    margin-bottom: 0.5rem;
  }
`

export const Code = styled.h1`
  text-align: center;
  font-size: 120px;
`

export const ErrorMessage = styled.p`
  text-align: center;
  font-weight: 600;
  font-size: 18px;
  color: #787878;
  margin-bottom: 2rem;
`
