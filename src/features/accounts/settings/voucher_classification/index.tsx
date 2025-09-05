
import { Main } from '@/layouts/components/main'





import { columns } from './components/voucher_classifications-columns'
import { VoucherClassificationsDialogs } from './components/voucher_classifications-dialogs'
import { VoucherClassificationsPrimaryButtons } from './components/voucher_classifications-primary-buttons'
import { VoucherClassificationsTable } from './components/voucher_classifications-table'
import VoucherClassificationProvider from './contexts/voucher-classification-context'
import { voucherClassificationListSchema, type VoucherClassificationList } from './data/schema'



interface VoucherClassificationProps {
    data: VoucherClassificationList
}

export default function VoucherClassification({ data }: VoucherClassificationProps) {


    return (
        <VoucherClassificationProvider>

            <Main>
                <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
                    <div>
                        <h2 className='text-2xl font-bold tracking-tight'>Voucher Classification List</h2>
                        <p className='text-muted-foreground'>
                            Manage your voucher classifications here.
                        </p>
                    </div>
                    <VoucherClassificationsPrimaryButtons />
                </div>
                <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
                    <VoucherClassificationsTable
                        data={voucherClassificationListSchema.parse(data ?? [])}
                        columns={columns} />
                </div>
            </Main>

            <VoucherClassificationsDialogs />
        </VoucherClassificationProvider>
    )
}
