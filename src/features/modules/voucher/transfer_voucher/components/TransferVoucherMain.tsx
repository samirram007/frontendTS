import DestinationPanel from './DestinationPanel'
import SourcePanel from './SourcePanel'

export default function TransferVoucherMain() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Transfer of Materials</h2>

      <div className="grid grid-cols-2 gap-4 border rounded-md p-4">
        <SourcePanel />
        <DestinationPanel />
      </div>
    </div>
  )
}
