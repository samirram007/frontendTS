import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import {
  fetchBomItemByIdService,
  fetchBomItemByStockItemIdService,
  fetchBomItemService,
  storeBomItemService,
  updateBomItemService,
} from './apibom'
import type { BomForm } from './schema'

const BASE_KEY = 'boms'

export const bomItemQueryOptions = (id?: number) => {
  return queryOptions({
    queryKey: id ? [BASE_KEY, id] : [BASE_KEY],
    queryFn: () => (id ? fetchBomItemByIdService(id) : fetchBomItemService()),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  })
}

export const bomItemByStockItemQueryOptions = (stockItemId: number) => {
  // console.log('called')

  return queryOptions({
    queryKey: [BASE_KEY, 'byStockItem', stockItemId],
    queryFn: () => fetchBomItemByStockItemIdService(stockItemId),
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1,
  })
}

export function useBomItemMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: BomForm & { id?: number }) => {
      if (data.id) {
        // Update if id exists
        return await updateBomItemService(data)
      }
      console.log('mutation heere')

      // Otherwise create
      return await storeBomItemService(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BASE_KEY] })
    },
    onError: (error) => {
      console.error('Stock Item mutation failed:', error)
    },
  })
}
