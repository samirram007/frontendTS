import { Route as DayBookRoute } from '@/routes/_protected/reports/day_book/_layout/index'
import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import {
  fetchTransferVoucherByIdService,
  fetchTransferVoucherService,
  storeTransferVoucherService,
  updateTransferVoucherService,
} from './api'
import type { TransferVoucherForm } from './schema'
const BASE_KEY = 'transferVoucher'

export const transferVoucherQueryOptions = (id?: number) => {
  return queryOptions({
    queryKey: id ? [BASE_KEY, id] : [BASE_KEY],
    queryFn: () =>
      id ? fetchTransferVoucherByIdService(id) : fetchTransferVoucherService(),
    staleTime: 1000 * 60 * 1, // 1 minute
    retry: 1,
  })
}

export function useTransferVoucherMutation() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const Key = 'DayBooks'
  return useMutation({
    mutationFn: async (data: TransferVoucherForm & { id?: number }) => {
      console.log('Saveable Data', data)
      if (data.id) {
        // Update if id exists
        return await updateTransferVoucherService(data)
      }
      // Otherwise create
      return await storeTransferVoucherService(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Key] })
      queryClient.invalidateQueries({ queryKey: ['godownItemStocks'] })
      queryClient.invalidateQueries({ queryKey: ['stockItems'] })
      queryClient.invalidateQueries({ queryKey: ['batches'] })
      navigate({ to: DayBookRoute.to })
    },
    onError: (error) => {
      console.error('TransferVoucher mutation failed:', error)
    },
  })
}
