import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import {
  fetchOrderBookService,
  storeOrderBookService,
  updateOrderBookService,
} from './api'
import type { orderBookForm } from './schema'
const Key = 'OrderBooks'
export const orderBookQueryOptions = (key: string = Key) => {
  return queryOptions({
    queryKey: [key],
    queryFn: fetchOrderBookService,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  })
}
export function useOrderBookMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: orderBookForm & { id?: number }) => {
      // console.log("mutation Data", data)
      if (data.id) {
        // Update if id exists
        return await updateOrderBookService(data)
      }
      // Otherwise create
      return await storeOrderBookService(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [Key] })
    },
    onError: (error) => {
      console.error('OrderBook mutation failed:', error)
    },
  })
}
