import { Button } from '@/components/ui/button'
import { useFocusArea } from '@/core/hooks/useFocusArea'
import { useRef, useState } from 'react'
import { type UseFormReturn } from 'react-hook-form'

import type { TransferVoucherForm } from '../../data/schema'
import NarrationBox from './special/narration-box'
import SaveDialog from './special/save-dialog'

type PosFooterProps = {
  mainForm: UseFormReturn<TransferVoucherForm>
}

const PosFooter = ({ mainForm }: PosFooterProps) => {
  const footerRef = useRef<HTMLDivElement>(null)
  const [isSaving, setSaving] = useState(false)

  useFocusArea(footerRef as React.RefObject<HTMLElement>)
  // useRestrictFocusToRef(footerRef as React.RefObject<HTMLElement>);
  const { watch } = mainForm
  const total =
    watch('stockJournal.stockJournalEntries')?.reduce(
      (acc, entry) => acc + (entry?.amount || 0),
      0,
    ) || 0

  return (
    <div
      ref={footerRef}
      className="bg-green-600/20 grid grid-cols-[1fr_1fr] px-8"
    >
      <div className="grid ">
        <NarrationBox
          type="textarea"
          form={mainForm}
          gapClass={''}
          className="text-gray-200 "
          name="remarks"
        />
      </div>
      <div className="grid grid-rows-[1fr_1fr]  items-start  justify-end">
        <div className="grid grid-cols-[1fr_140px] pt-2">
          <div className="text-right font-bold  ">
            Total: {total ? Number(total).toFixed(2) : 0}
          </div>
          <div></div>
        </div>

        <div className="text-left pl-2">
          {isSaving ? (
            <SaveDialog
              mainForm={mainForm}
              isSaving={isSaving}
              setSaving={setSaving}
            />
          ) : (
            <Button
              type="button"
              variant="default"
              className="h-8 w-full focus:bg-black focus:text-white"
              size="lg"
              disabled={isSaving}
              onClick={() => setSaving(true)}
            >
              Save....
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default PosFooter
