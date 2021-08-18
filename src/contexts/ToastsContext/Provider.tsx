import React, { createContext, ReactNode, useCallback, useState } from 'react'
import { kebabCase } from 'lodash'
import { Toast, toastTypes} from '@pancakeswap-libs/uikit'
import { ToastContextApi } from './types'

export const ToastsContext = createContext<ToastContextApi>(undefined)
export interface ToastAction {
  text: string;
  url: string;
}
export const ToastsProvider: React.FC = ({ children }) => {
  const [toasts, setToasts] = useState<ToastContextApi['toasts']>([])

  const toast = useCallback(
    ({ title, description, type, action }: Omit<Toast, 'id'>) => {
      setToasts((prevToasts) => {
        const id = kebabCase(title)
        // Remove any existing toasts with the same id
        const currentToasts = prevToasts.filter((prevToast) => prevToast.id !== id)

        return [
          {
            id,
            title,
            description,
            type,
            action
          },
          ...currentToasts,
        ]
      })
    },
    [setToasts],
  )

  const toastError = (title: string, description?: string) => {
    return toast({ title, description, type: toastTypes.DANGER })
  }
  const toastInfo = (title: string, description?: string, act?: ToastAction) => {
    return toast({ title, description, type: toastTypes.INFO, action:act})
  }

  const toastSuccess = (title: string, description?: string, act?: ToastAction) => {
    return toast({ title, description, type: toastTypes.SUCCESS, action:act})
  }
  const toastWarning = (title: string, description?: string) => {
    return toast({ title, description, type: toastTypes.WARNING })
  }
  const clear = () => setToasts([])
  const remove = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((prevToast) => prevToast.id !== id))
  }

  return (
    <ToastsContext.Provider value={{ toasts, clear, remove, toastError, toastInfo, toastSuccess, toastWarning}}>
      {children}
    </ToastsContext.Provider>
  )
}
