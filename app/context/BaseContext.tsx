"use client"
// context/LoadingContext.tsx
import React, { createContext, ReactNode, useContext, useState } from "react"

// Define the context interface
interface LoadingContextProps {
  isLoading: boolean
  setLoading: (status: boolean) => void
}

export const LoadingContext = createContext<LoadingContextProps | undefined>(undefined)

// Custom hook to use the loading context
export const useLoading = () => {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider")
  }
  return context
}

// Provider component to wrap the app
export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false)

  const setLoading = (status: boolean) => setIsLoading(status)

  return <LoadingContext.Provider value={{ isLoading, setLoading }}>{children}</LoadingContext.Provider>
}
