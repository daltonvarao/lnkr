import styled from 'styled-components'
import colors from '../../styles/colors'

export const Container = styled.div`
  width: 100%;
  align-self: center;
  background: #fff;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  max-width: 720px;
  padding: 2rem;
  padding-top: 3rem;
  overflow: hidden;
  margin: 0 auto;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.07);

  position: relative;

  ::before {
    content: '';
    top: 0;
    left: 0;
    height: 25%;
    width: 100%;
    position: absolute;
    background-image: linear-gradient(to right, #c850c0, ${colors.primary});
  }

  @media screen and (min-width: 768px) {
    padding: 4rem 3rem;
    padding-top: 5rem;
    ::before {
      height: 30%;
    }
  }
`

export const ProfileContainer = styled.div`
  width: 100%;
  position: relative;
`

export const ProfileHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const ProfilePic = styled.h1`
  font-weight: bold;
  background: #fff;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 52px;
  color: #333;
`

export const ProfileName = styled.h1`
  font-size: 32px;
`

export const ProfileInfoContainer = styled.form`
  width: 100%;

  input {
    width: 100%;
  }

  button + a {
    display: block;
    margin-top: 1rem;
  }
`
