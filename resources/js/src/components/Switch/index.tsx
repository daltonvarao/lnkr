import React from 'react'

import { Input, Button } from './styles'

const Switch: React.FC<{
  id: string
  checked: boolean
  onChange: (ev: React.ChangeEvent<HTMLInputElement>) => void
}> = ({ id, checked, onChange }) => {
  return (
    <React.Fragment>
      <Input type="checkbox" defaultChecked={checked} id={id} onChange={onChange} />
      <Button htmlFor={id} />
    </React.Fragment>
  )
}

export default Switch
