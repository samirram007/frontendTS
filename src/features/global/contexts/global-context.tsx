import type { DeliveryVehicle } from '@/features/modules/delivery_vehicle/data/schema'
import { useState, type ReactNode } from 'react'

import React, { createContext } from 'react'

export type GType = {
  id?: number
  name?: string
  code?: string
}
interface GlobalContextType {
  transporter: GType | null
  setTransporter: (value: GType | null) => void
  deliveryVehicle: DeliveryVehicle | null
  setDeliveryVehicle: (value: DeliveryVehicle | null) => void
  distributor: GType | null
  setDistributor: (value: GType | null) => void
  supplier: GType | null
  setSupplier: (value: GType | null) => void
}
const globalContext = createContext<GlobalContextType | undefined>(undefined)

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [transporter, setTransporter] = useState<GType | null>(null)
  const [deliveryVehicle, setDeliveryVehicle] =
    useState<DeliveryVehicle | null>(null)
  const [distributor, setDistributor] = useState<GType | null>(null)
  const [supplier, setSupplier] = useState<GType | null>(null)

  return (
    <globalContext.Provider
      value={{
        transporter,
        setTransporter,
        deliveryVehicle,
        setDeliveryVehicle,
        distributor,
        setDistributor,
        supplier,
        setSupplier,
      }}
    >
      {children}
    </globalContext.Provider>
  )
}

export const useGlobalContext = () => {
  const context = React.useContext(globalContext)
  if (context === undefined) {
    throw new Error(
      'useGlobalContext must be used within a GlobalContextProvider',
    )
  }
  return context
}
