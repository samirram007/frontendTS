
import { Main } from '@/layouts/components/main'





import { ActionPages } from './components/action-page'
import { type Supplier } from './data/schema'


// Import the correct type for supplierListSchema



interface SupplierProps {
    data?: Supplier
}

export default function SupplierDetails(props: SupplierProps) {
    const { data } = props
    const keyName = 'companies'
    console.log("data");

    return (

        <>
            <Main>

                <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
                    <ActionPages currentRow={data}
                        key={`${keyName}-add`} />
                </div>
            </Main>

            {/* <Pages /> */}
        </>
    )
}
