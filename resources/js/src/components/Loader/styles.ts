import styled, { keyframes } from 'styled-components'

export const Container = styled.div<{ inline?: boolean }>`
  align-self: center;
  display: ${(props) => (props.inline ? 'inline-flex' : 'flex')};
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 0 ${(props) => (props.inline ? '0' : 'auto')};
  justify-self: flex-end;
`

const spinner = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const ActivityIndicator = styled.div<{ size?: number }>`
  width: ${(props) => (props.size ? props.size : '20')}px;
  height: ${(props) => (props.size ? props.size : '20')}px;
  border: 2px solid #f0f0fdaf;
  border-left: 2px solid ${(props) => props.color ?? '#fff'};
  border-radius: 50%;
  animation: ${spinner} 1s linear infinite;
  margin: 0;
`

export const LoaderMessage = styled.p`
  text-align: center;
  width: 100%;
  margin-top: 1rem;
  color: #565656;
`
