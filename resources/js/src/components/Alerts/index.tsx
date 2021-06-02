import React from 'react'
import * as Fi from 'react-icons/fi'

import { useAlert } from '../../providers/alerts'

import {
  AlertContainer,
  AlertContent,
  CloseAlert,
  Container,
  FadeIn,
  FadeOut,
  FillOut,
} from './styles'

const Alerts: React.FC = () => {
  const { alerts, remove } = useAlert()
  return (
    <Container>
      {alerts.map((alrt, index) => {
        return (
          <FadeIn key={index} duration=".4s">
            <FadeOut duration=".4s" delay={`${alrt.timeout - 400}ms`}>
              <AlertContainer type={alrt.type}>
                <AlertContent>{alrt.content}</AlertContent>
                <CloseAlert onClick={() => remove(alrt)}>
                  <Fi.FiX />
                </CloseAlert>
                <FillOut duration={`${alrt.timeout}ms`} />
              </AlertContainer>
            </FadeOut>
          </FadeIn>
        )
      })}
    </Container>
  )
}

export default Alerts
