import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { fetchGodownService } from '@/features/modules/godown/data/api'
import { fetchStockItemService } from '@/features/modules/stock_item/data/api'
import { useQueries } from '@tanstack/react-query'
import {
  useFieldArray,
  useFormContext,
  type FieldValues,
} from 'react-hook-form'
import { RHFSelect } from './RHFSelect'
import { ItemDialog } from './item-dialog'

type StockJournalComponentProps = {
  namePrefix: 'source' | 'destination'
}

const stockUnits = [
  { name: 'KG', id: 1 },
  { name: 'PCS', id: 2 },
]

export function StockJournalComponent({
  namePrefix,
}: StockJournalComponentProps) {
  return (
    <div className="items">
      <div className="items-header font-semibold text-sm border-y-2 border-slate-800 grid grid-cols-[70%_1fr]">
        <div className="px-2">Name of Item..</div>
        <div className="grid grid-cols-[100px_70px_50px_1fr]">
          <div className="grid items-center justify-center">Quantity</div>
          <div className="grid justify-end">Rate</div>
          <div className="pl-1">per</div>
          <div className="grid justify-end px-1">Amount</div>
        </div>
      </div>

      <StockJournalEntries namePrefix={namePrefix} />
    </div>
  )
}

type EntriesProps = {
  namePrefix: 'source' | 'destination'
}

const StockJournalEntries = ({ namePrefix }: EntriesProps) => {
  const { control, register } = useFormContext<FieldValues>()

  const basePath = `${namePrefix}.stockJournalEntries`

  const results = useQueries({
    queries: [
      {
        queryKey: ['stockItems'],
        queryFn: fetchStockItemService,
      },
      {
        queryKey: ['godowns'],
        queryFn: fetchGodownService,
      },
    ],
  })

  const stockItems = results[0].data || []
  const godowns = results[1].data || []
  const isLoading = results.some((r) => r.isLoading)

  const { fields, remove } = useFieldArray({
    control,
    name: basePath,
  })

  if (isLoading) return <div>Loading...</div>

  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <div key={field.id} className="grid grid-cols-[70%_1fr] items-center">
          <RHFSelect
            name={`${basePath}.${index}.stockItemId`}
            options={stockItems?.data}
            placeholder="Item"
          />

          <div className="grid grid-cols-[100px_70px_50px_1fr]">
            <RHFSelect
              name={`${basePath}.${index}.godownId`}
              options={godowns?.data}
              placeholder="Godown"
            />

            <Input
              type="number"
              {...register(`${basePath}.${index}.rate`)}
              placeholder="Rate"
            />
          </div>

          <RHFSelect
            name={`${basePath}.${index}.stockUnitId`}
            options={stockUnits}
            placeholder="Unit"
          />

          <Button
            type="button"
            variant="destructive"
            onClick={() => remove(index)}
          >
            Remove
          </Button>
        </div>
      ))}

      <ItemAdd />
    </div>
  )
}

const ItemAdd = () => {
  return (
    <div className="space-y-4 grid justify-center w-full bg-amber-400">
      <ItemDialog />
    </div>
  )
}
