import useDialogState from '@/core/hooks/use-dialog-state'
import React, { useState } from 'react'
import type { Vehicle } from '../data/schema'



type VehicleDialogType = 'invite' | 'add' | 'edit' | 'delete'

interface VehicleContextType {
  open: VehicleDialogType | null
  setOpen: (str: VehicleDialogType | null) => void
  currentRow: Vehicle | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Vehicle | null>>
  keyName: string
}

const VehicleContext = React.createContext<VehicleContextType | null>(null)
interface Props {
  children: React.ReactNode
}

export default function VehicleProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<VehicleDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Vehicle | null>(null)


  return (
    <VehicleContext value={{ open, setOpen, currentRow, setCurrentRow, keyName: "account_nature" }}>
      {children}
    </VehicleContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useVehicle = () => {
  const vehicleContext = React.useContext(VehicleContext)

  if (!vehicleContext) {
    throw new Error('useVehicle has to be used within <VehicleContext>')
  }

  return vehicleContext
}
