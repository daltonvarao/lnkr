import styled from 'styled-components'

export const Container = styled.div`
  background: #fff;
  margin: 0 auto;
  align-self: center;
  padding: 3rem 2rem;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.07);

  @media screen and (min-width: 768px) {
    max-width: 720px;
    padding: 3rem 2.5rem;
  }
`

export const Title = styled.h2`
  margin-bottom: 2rem;
`
