import styled from 'styled-components'
import colors from '../../styles/colors'

export const Container = styled.div`
  width: 100%;
  flex: 1;

  h2 {
    margin-bottom: 1.5rem;
    position: sticky;
    top: 7.5rem;
    z-index: 135;
  }
`

export const SearchContainer = styled.div`
  margin-bottom: 1.5rem;
  z-index: 180;

  position: sticky;
  top: 2rem;
  display: flex;
  flex: 1;
  background: #fff;
  border-radius: 12px;
  padding: 0.25rem;

  box-shadow: 0 0 15px rgba(0, 0, 0, 0.04);
`

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  position: relative;

  svg {
    position: absolute;
    left: 1rem;
  }
`

export const Loading = styled.div`
  position: absolute;
  right: 8px;

  top: calc(50% - 20px);

  border-radius: 50%;

  width: 25px;
  height: 25px;
  border: 3px solid #f0f0fd;
  border-right-color: ${colors.primary};
  animation: spin 1s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`

export const Input = styled.input`
  padding: 0.5rem 2.5rem;
  border: 0;
  width: 100%;
  display: block;
  background: transparent;
  position: relative;
  font-weight: 500;
  border-radius: 0;
  border-right: 1px solid rgba(0, 0, 0, 0.07);

  :focus {
    outline: none;
    border-radius: 0;
    box-shadow: none;
    border-color: rgba(0, 0, 0, 0.07);
  }
`

export const SearchByContainer = styled.div`
  display: flex;
  padding: 1rem;

  align-items: center;
  justify-content: space-between;
`

export const SearchByGroup = styled.div`
  display: flex;
  align-items: center;

  + div {
    margin-left: 1rem;
  }
`

export const SearchBy = styled.input`
  border: 0;
  background: transparent;

  :focus {
    outline: none;
  }
`

export const Label = styled.label`
  margin-left: 0.25rem;
  font-size: 14px;
`

export const ContentContainer = styled.div`
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

export const Content = styled.div`
  background: #fff;
  padding: 1.5rem 1.5rem;
  border-radius: 16px;
  width: 100%;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.07);
  display: flex;
  flex-direction: column;
`

export const ContentHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`

export const ContentTitle = styled.h3`
  margin-bottom: 1rem;
  max-width: 80%;
`

export const ContentDescription = styled.p`
  text-align: justify;
  line-height: 28px;
  color: #676767;
  font-size: 14px;
  flex-grow: 1;
`

export const ContentTags = styled.div`
  margin-bottom: 0.75rem;
  display: flex;
  flex-wrap: wrap;
`

export const ContentTag = styled.a`
  padding: 0.25rem 0.5rem;
  background: ${(props) => props.color};
  border-radius: 5px;
  font-size: 12px;
  font-weight: 500;
  color: #fff;
  margin-bottom: 0.25rem;

  :first-child {
    margin-right: 0.25rem;
  }

  + a {
    margin-right: 0.25rem;
  }
`

export const ActionsContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  justify-content: space-evenly;

  a {
    font-size: 22px;
    width: fit-content;
    display: flex;
    align-items: center;
    align-self: flex-end;
    justify-self: flex-end;
  }
`

export const AnchorLink = styled.a`
  font-size: 22px;
  width: fit-content;
  display: flex;
  align-items: center;
  align-self: flex-end;
  justify-self: flex-end;
`

export const ButtonLink = styled.button`
  font-size: 22px;
  padding: 0;
  background: transparent;
  display: flex;
  align-items: center;
  color: ${colors.primary};
`
