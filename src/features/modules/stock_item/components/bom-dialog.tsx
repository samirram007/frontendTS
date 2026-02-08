import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useState } from 'react'
import type { Bom, BomList } from '../data/schema'
import { NewBomModal } from './new-bom-dialog'
import BomItemsTable from './BomItemTable'
import { useForm } from 'react-hook-form'
import type {
  StockJournalEntryForm,
  StockJournalForm,
} from '../../voucher/data-schema/voucher-schema'

type BomDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  bom?: BomList
}

const BomDialog = ({ open, onOpenChange, bom }: BomDialogProps) => {
  const [selectedBom, setSelectedBom] = useState<Bom | null>(null)
  const [openAddBom, setOpenAddBom] = useState(false)
  const bomForm = useForm<StockJournalForm>({
    defaultValues: {
      stockJournalEntries: [],
    },
  })
  console.log(selectedBom)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-8xl p-0">
        <DialogHeader className="px-4 py-3 border-b">
          <DialogTitle className="text-center">BOM Manager</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-[260px_1fr] h-[450px]">
          {/* LEFT PANEL */}
          <div className="border-r bg-muted/20 p-3 flex flex-col gap-3">
            <Button
              size="sm"
              onClick={() => setOpenAddBom(true)}
              // onClose={() => setOpenAddBom(false)}
            >
              Add BOM
            </Button>
            <NewBomModal
              open={openAddBom}
              onClose={() => setOpenAddBom(false)}
            />
            <div className="flex-1 border rounded-md bg-background overflow-auto">
              {bom?.length === 0 ? (
                <div className="h-full flex items-center justify-center text-sm text-muted-foreground">
                  No BOMs created
                </div>
              ) : (
                bom?.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => setSelectedBom(b)}
                    className={`px-3 py-2 cursor-pointer border-b last:border-b-0 hover:bg-muted ${
                      selectedBom?.id === b.id ? 'bg-muted font-medium' : ''
                    }`}
                  >
                    {b.name}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="p-4">
            {selectedBom ? (
              <div>
                <h3 className="font-semibold mb-3">
                  {selectedBom.name} Details
                </h3>

                <div className="text-xs bg-muted p-2 rounded">
                  {/* Bom Details here */}
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-sm">
                          {selectedBom.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Finished Item: {selectedBom?.name}
                        </p>
                      </div>

                      <Button size="sm" variant="outline">
                        Edit BOM
                      </Button>
                    </div>

                    <div>
                      <div className="text-xs font-semibold mb-1">
                        Components (Consumption)
                      </div>

                      <BomItemsTable form={bomForm} />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
                Select a BOM to view details
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default BomDialog
