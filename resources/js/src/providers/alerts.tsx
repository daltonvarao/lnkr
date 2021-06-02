import React, { createContext, useContext, useState } from 'react'

interface Alert {
  content: string
  type: 'success' | 'error'
  timeout: number
}

interface InitialState {
  push: (message: string, type?: Alert['type'], timeout?: number) => void
  remove: (alert: Alert) => void
  alerts: Alert[]
}

export const AlertContext = createContext({} as InitialState)

const AlertProvider: React.FC = ({ children }) => {
  const [alerts, setAlerts] = useState<Alert[]>([])

  function remove(alert: Alert) {
    setAlerts((state) => {
      const newState = [...state]

      newState.splice(newState.indexOf(alert), 1)

      return newState
    })
  }

  const push = (content: string, type: Alert['type'] = 'success', timeout = 5000) => {
    setAlerts((state) => {
      return [...state, { content, type, timeout }]
    })

    setTimeout(() => {
      setAlerts((state) => {
        const newState = [...state]
        newState.splice(newState.indexOf({ content, type, timeout }), 1)

        return newState
      })
    }, timeout)
  }

  return (
    <AlertContext.Provider
      value={{
        alerts,
        push,
        remove,
      }}
    >
      {children}
    </AlertContext.Provider>
  )
}

export default AlertProvider

export const useAlert = () => useContext(AlertContext)
