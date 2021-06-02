import styled, { keyframes } from 'styled-components'
import colors from '../../styles/colors'

export const Container = styled.div`
  width: 100%;
  position: fixed;
  display: flex;
  z-index: 200;
  padding: 1rem;
  flex-direction: column;
  align-items: flex-end;
`

export const AlertContainer = styled.div<{ type: 'success' | 'error' }>`
  position: relative;
  background: ${(props) => colors[props.type]};
  padding: 1rem;
  border-radius: 0.35rem;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  color: #fff;
  width: 250px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  margin-bottom: 1rem;
`
export const AlertContent = styled.div``

export const CloseAlert = styled.button`
  padding: 0;
  color: #fff;
  background: transparent;
  font-size: 18px;
  margin: 0;
  margin-left: 0.5rem;
  display: flex;
  align-items: center;
`

interface BaseAnimationProps {
  duration?: string
  timingFunction?: string
  delay?: string
  iterationCount?: string
  direction?: string
  fillMode?: string
  playState?: string
  display?: string
}

export const BaseAnimation = styled.div<BaseAnimationProps>`
  animation-duration: ${(props) => props.duration ?? '1s'};
  animation-timing-function: ${(props) => props.timingFunction ?? 'ease'};
  animation-delay: ${(props) => props.delay ?? '0s'};
  animation-iteration-count: ${(props) => props.iterationCount ?? '1'};
  animation-direction: ${(props) => props.direction ?? 'normal'};
  animation-fill-mode: ${(props) => props.fillMode ?? 'both'};
  animation-play-state: ${(props) => props.playState ?? 'running'};
  display: ${(props) => props.display ?? 'block'};
`

const fadein = keyframes`
  from {opacity: 0;}
  to {opacity: 1;}
`

export const FadeIn = styled(BaseAnimation)`
  animation-name: ${fadein};
`

export const FadeOut = styled(BaseAnimation)`
  animation-name: ${fadein};
  animation-direction: reverse;
  animation-fill-mode: forwards;
`

export const fillout = keyframes`
  from { width: 100%; }
  to { width: 0; }
`

export const FillOut = styled(BaseAnimation)`
  background: #ffffff7e;
  height: 4px;
  position: absolute;
  left: 0;
  bottom: 0;
  animation-name: ${fillout};
  animation-timing-function: linear;
`
