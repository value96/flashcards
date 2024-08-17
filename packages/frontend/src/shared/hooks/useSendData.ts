import React, { useCallback, useState } from "react"
import { useAppDispatch } from "@shared/store"

import { AsyncThunk } from "@reduxjs/toolkit"

export const useSendData = <Params>(
  thunkFunction: AsyncThunk<any, Params, {}>,
) => {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useAppDispatch()

  const sendData = useCallback(
    async (arg: Params) => {
      setIsLoading(true)
      setError(null)
      try {
        await dispatch(thunkFunction(arg)).unwrap()
      } catch (err: any) {
        setError(`${err.message}`)
      } finally {
        console.log(`finally in useSendData`)
        setIsLoading(false)
      }
    },
    [dispatch, thunkFunction],
  )

  return { sendData, error, isLoading }
}
