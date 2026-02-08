import { useForm, type Resolver } from 'react-hook-form'
import { bomSchema, type BomForm } from '../data/schema'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { StockItemCombobox } from './dropdown/stock-item-combobox'
import { useQuery } from '@tanstack/react-query'
import { fetchStockItemService } from '../data/api'
import { useBomItemMutation } from '../data/bomQueryOptions'
// import { zodResolver } from '@hookform/resolvers/zod'

type NewBomModalProps = {
  open: boolean
  onClose: () => void
}

export function NewBomModal({ open, onClose }: NewBomModalProps) {
  const stockItemsQuery = useQuery({
    queryKey: ['stockItems'],
    queryFn: fetchStockItemService,
  })

  const stockItems = stockItemsQuery.data?.data ?? []

  const { mutate: saveBom } = useBomItemMutation()

  const form = useForm<BomForm>({
    // resolver: zodResolver(Bom) as Resolver<BomForm>,
    defaultValues: {
      name: '',
      stockItemId: null,
    },
    shouldUnregister: true,
  })

  const { register, handleSubmit, reset } = form

  const onSubmit = (data: BomForm) => {
    console.log('new bom:', data)
    reset()
    saveBom(data, {
      onSuccess: () => {
        reset()
        onClose()
      },
    })
    // onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add BOM</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            placeholder="BOM Name"
            {...register('name', { required: true })}
          />

          <StockItemCombobox stockForm={form} stockItems={stockItems} />

          <Button type="submit" className="w-full">
            Save BOM
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
