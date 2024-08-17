import React, { useState } from "react"
import { useAppDispatch } from "@shared/store"

import { AsyncThunk } from "@reduxjs/toolkit"

export const useSendData = <Params>(
  thunkFunction: AsyncThunk<any, Params, {}>,
) => {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useAppDispatch()

  const sendData = async (arg: Params) => {
    setIsLoading(true)
    setError(null)
    try {
      await dispatch(thunkFunction(arg))
      // Дальнейшие действия после успешного логина
    } catch (err) {
      setError(`sendData error: ${err}`)
    } finally {
      setIsLoading(false)
    }
  }

  return { sendData, error, isLoading }
}
