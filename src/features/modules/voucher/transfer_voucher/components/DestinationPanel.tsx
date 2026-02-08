import { StockJournalComponent } from '../../receipt_note/components/stock-journal/stock-journal-component'

export default function DestinationPanel() {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-sm border-b pb-1">
        Destination (Production)
      </h3>

      <StockJournalComponent />
    </div>
  )
}
