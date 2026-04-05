import type { FreightVoucherListSchema } from "../data/schema";

import { columns } from "./columns";
import { Main } from "@/layouts/components/main";
import { GridTable } from "./grid-table";
import { useMemo } from "react";

interface FreightVoucherWiseProps {
  data: FreightVoucherListSchema
}

export default function FreightVoucherWise({ data: freightVoucherListSchema }: FreightVoucherWiseProps) {
  const prepareData = useMemo(() => {
    return freightVoucherListSchema.map(item => ({
      ...item,
      partyName: item?.partyLedger?.name || 'Unknown',
    }));
  }, [freightVoucherListSchema]);
  console.log("PD:", prepareData);

  return (
    <>
      <Main className='min-w-full'>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <GridTable
            data={prepareData}
            columns={columns}
            pagination={false}
          />
        </div>
      </Main>
    </>
  );
}