import type { FreightVoucherListSchema } from "../data/schema";
import { GridTable } from "../components/grid-table";
import { columns } from "./columns";
import { Main } from "@/layouts/components/main";

interface FreightVoucherWiseProps {
    data: FreightVoucherListSchema
}

export default function FreightVoucherWise({ data: freightVoucherListSchema }: FreightVoucherWiseProps) {
    return (
        <>
            <Main className='min-w-full'>
                <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
                    <GridTable
                        data={freightVoucherListSchema}
                        columns={columns}
                        pagination={false}
                    />
                </div>
            </Main>
        </>
    );
}