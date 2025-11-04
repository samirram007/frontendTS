
import { Main } from '@/layouts/components/main'





import { ActionPages } from './components/action-page'
import { type Company } from './data/schema'


// Import the correct type for companyListSchema



interface CompanyProps {
    data?: Company
}

export default function CompanyDetails(props: CompanyProps) {
    const { data } = props
    const keyName = 'companies'


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
