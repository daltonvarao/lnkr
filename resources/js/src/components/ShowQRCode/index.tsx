import React, { useState } from 'react'
import QRCode from 'qrcode.react'

import { Button, Container, QRContainer } from './styles'

import * as Ai from 'react-icons/ai'

interface ShowQRCodeProps {
  value: string
}

const ShowQRCode: React.FC<ShowQRCodeProps> = ({ value }) => {
  const [showQr, setShowQr] = useState(false)
  return (
    <Container>
      <Button onClick={() => setShowQr((state) => !state)}>
        <Ai.AiOutlineQrcode size={30} />
      </Button>
      {showQr && (
        <QRContainer>
          <QRCode renderAs="svg" value={value} size={184} />
        </QRContainer>
      )}
    </Container>
  )
}

export default ShowQRCode
