import { Form } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useEffect, useMemo } from 'react'
import { useForm, type Resolver } from 'react-hook-form'

import StockJournal from '../../../components/stock-journal'
import isEqual from 'lodash/isEqual'

import {
  stockJournalSchema,
  type StockJournalEntryForm,
  type StockJournalForm,
} from '../../../data-schema/voucher-schema'
import type { TransferVoucherForm } from '../../data/schema'

type PosBodyProps = {
  mainForm: ReturnType<typeof useForm<TransferVoucherForm>>
}

const PosBody = ({ mainForm: transferVoucherForm }: PosBodyProps) => {
  // const transferVoucherForm = useFormContext<TransferVoucherForm>();

  const stockJournal = transferVoucherForm.watch('stockJournal')
  const stockJournalForm = useForm<StockJournalForm>({
    resolver: zodResolver(stockJournalSchema) as Resolver<StockJournalForm>,
    defaultValues: {
      ...stockJournal,
      stockJournalEntries: stockJournal?.stockJournalEntries ?? [],
    },
  })
  const stockJournalTotal = useMemo(() => {
    const entries = (
      stockJournalForm.watch('stockJournalEntries') || []
    ).filter(
      (entry): entry is StockJournalEntryForm =>
        entry !== undefined && entry !== null,
    )
    const totalAmount = entries.reduce(
      (acc: number, entry: StockJournalEntryForm) => {
        const amount = Number(entry.amount) || 0
        acc += amount
        return acc
      },
      0,
    )
    return {
      totalAmount,
    }
  }, [stockJournalForm.watch('stockJournalEntries')])

  useEffect(() => {
    // when parent changes, update child
    const parentValue = transferVoucherForm.getValues('stockJournal')
    if (parentValue && !isEqual(parentValue, stockJournalForm.getValues())) {
      stockJournalForm.reset(parentValue)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transferVoucherForm.watch('stockJournal')])

  useEffect(() => {
    // when child changes, update parent
    const subscription = stockJournalForm.watch((value) => {
      const currentParent = transferVoucherForm.getValues('stockJournal')
      if (!isEqual(currentParent, value)) {
        transferVoucherForm.setValue(
          'stockJournal',
          value as StockJournalForm,
          {
            shouldValidate: false,
          },
        )
      }
    })

    return () => subscription.unsubscribe()
  }, [transferVoucherForm, stockJournalForm])

  return (
    <div className="flex flex-col w-full gap-6 px-2 pb-32">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="border rounded">
          <div className="font-bold text-center py-1 bg-gray-100">
            Source (Consumption)
          </div>

          <div className="overflow-x-auto">
            <Form {...stockJournalForm}>
              <StockJournal
                stockJournalForm={stockJournalForm}
                movementType="out"
              />
            </Form>
          </div>
        </div>{' '}
        <div className="border rounded">
          <div className="font-bold text-center py-1 bg-gray-100">
            Destination (Production)
          </div>

          <div className="overflow-x-auto">
            <Form {...stockJournalForm}>
              <StockJournal
                stockJournalForm={stockJournalForm}
                movementType="in"
              />
            </Form>
          </div>
        </div>
      </div>

      {/* TOTAL */}
      <div className="flex justify-end font-bold pr-4">
        Total: {stockJournalTotal.totalAmount.toFixed(2)}
      </div>
    </div>
  )
}

export default PosBody
