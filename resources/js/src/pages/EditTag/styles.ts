import styled from 'styled-components'

export const Container = styled.div`
  background: #fff;
  margin: 0 auto;
  width: 100%;
  padding: 3rem 2rem;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.07);
  align-self: center;

  @media screen and (min-width: 768px) {
    max-width: 720px;
    padding: 3rem 2.5rem;
  }

  form h4 {
    margin: 1rem 0;
  }
`

export const Title = styled.h2`
  margin-bottom: 2rem;
`

export const ColorContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  display: grid;
  justify-content: space-between;
  gap: 1rem;
  align-content: center;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, 50px);
  }

  @media screen and (min-width: 768px) {
    grid-auto-flow: column;
  }
`

export const ColorGroup = styled.div``

export const Color = styled.input`
  display: none;

  :checked + label {
    box-shadow: 0 0 0 5px ${(props) => props.color + '6f'};
  }
`

export const ColorLabel = styled.label`
  display: block;
  position: relative;
  width: 50px;
  height: 50px;
  background: #f0f0fd;

  border-radius: 50%;
  transition: all 0.2s linear;

  :hover {
    cursor: pointer;
    opacity: 0.6;
  }
`
