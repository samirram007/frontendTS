import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import {
  fetchPatientByIdService,
  fetchPatientService,
  storePatientService,
  updatePatientService,
} from './api'
import type { PatientForm } from './schema'

const BASE_KEY = 'patient'

export const patientQueryOptions = (id?: number) => {
  return queryOptions({
    queryKey: id ? [BASE_KEY, id] : [BASE_KEY],
    queryFn: () => (id ? fetchPatientByIdService(id) : fetchPatientService()),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  })
}

export function usePatientMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: PatientForm & { id?: number }) => {
      if (data.id) {
        // Update if id exists
        return await updatePatientService(data)
      }
      // Otherwise create
      return await storePatientService(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BASE_KEY] })
    },
    onError: (error) => {
      console.error('Patient mutation failed:', error)
    },
  })
}
