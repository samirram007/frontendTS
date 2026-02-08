import { useFieldArray } from 'react-hook-form'
import type { UseFormReturn } from 'react-hook-form'
import type { StockJournalForm } from '../../voucher/data-schema/voucher-schema'
import { StockJournalEntry } from '../../voucher/components/stock-journal/entry-test'

type BomItemsTableProps = {
  form: UseFormReturn<StockJournalForm>
}

const BomItemsTable = ({ form }: BomItemsTableProps) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'stockJournalEntries',
  })

  const handleAdd = () => {
    append({
      stockItemId: null,
      actualQuantity: 0,
      billingQuantity: 0,
      rate: 0,
      amount: 0,
      movementType: 'out',
      stockJournalGodownEntries: [],
    } as any)
  }

  return (
    <div className="border rounded-md overflow-hidden">
      {/* Header */}
      <div
        className="border-inside-all 
                   grid grid-cols-[1fr_300px_150px_80px_80px_200px_120px] 
                   bg-gray-300 text-center text-sm font-medium"
      >
        <div>Particulars</div>
        <div>Quantity</div>
        <div>Rate</div>
        <div>Per</div>
        <div>Disc%</div>
        <div>Amount</div>
        <div>Action</div>
      </div>

      {/* Rows */}
      {fields.map((field, index) => (
        <div key={field.id} className="border-b">
          <StockJournalEntry
            index={index}
            fieldsLength={fields.length}
            remove={remove}
            stockJournalForm={form}
            handleOnClickItemAddEntry={() => {}}
          />
        </div>
      ))}

      {/* Add Row */}
      <div className="p-2">
        <button
          type="button"
          onClick={handleAdd}
          className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          + Add Component
        </button>
      </div>
    </div>
  )
}

export default BomItemsTable
