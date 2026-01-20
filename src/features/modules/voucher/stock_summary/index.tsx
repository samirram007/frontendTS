
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Main } from '@/layouts/components/main'







import { Outlet, useNavigate } from '@tanstack/react-router'
import { ChevronDown } from 'lucide-react'

import { useStockSummary } from './contexts/stock_summary-context'
import { toSentenceCase, capitalizeAllWords } from '../../../../utils/removeEmptyStrings';
import { IconCheck } from '@tabler/icons-react'
import { cn } from '@/lib/utils'





export default function StockSummary() {


    return (

        <Main className='min-w-full min-h-full!'>
            <div className='mb-2 flex flex-wrap items-center justify-between space-y-2 pr-8'>
                <div>
                    <h3 className='text-2xl font-bold tracking-tight'>Stock Summary</h3>
                    <p className='text-muted-foreground'>
                        Check stock summary....
                    </p>
                </div>
                <PrimaryButtons />
            </div>
            <div className='-mx-4 min-h-full flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
                <Outlet />
            </div>
        </Main>

    )
}

const PrimaryButtons = () => {

    const { currentReport } = useStockSummary();

    const reports = [
        { label: 'Stock Summary', link: 'stock-in-hand' },
        { label: 'Stock In Hand Item wise', link: 'stock-in-hand-item-in-details' },
    ]


    return (
        <div className='flex space-x-2'>
            {/* Add Dropdown  here */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className=' min-w-full'>
                        {capitalizeAllWords(toSentenceCase(currentReport)).replace(/_/g, ' ')}
                        <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="min-w-full">
                    {reports.map((report) => (
                        <DropdownItem
                            key={report.link}
                            label={report.label}
                            link={report.link}
                        />
                    ))}

                </DropdownMenuContent>
            </DropdownMenu>

        </div>
    )
}

const DropdownItem = ({ label, link }: { label: string, link: string }) => {
    const navigate = useNavigate();
    const { currentReport, setCurrentReport } = useStockSummary();
    const handleOnclick = () => {
        setCurrentReport(link);
        navigate({ to: `/reports/stock_summary/${link}` });
    }

    return (
        <DropdownMenuItem onClick={handleOnclick} className={currentReport === link ? 'bg-gray-200' : ''}>
            <IconCheck size={18} className={cn('mr-2 h-4 w-4', currentReport === link ? 'visible' : 'invisible')} />   {label}
        </DropdownMenuItem>
    )
}