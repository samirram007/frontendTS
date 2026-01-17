import { Main } from "@/layouts/components/main";
import type { Bed } from "./data/schema";
import { ActionPages } from "./components/action-page";








interface BedProps {
    data?: Bed
}


export default function BedDetails(props: BedProps) {
    const { data } = props;
    const keyName = "beds";

    return (
        <>
            <Main>
                <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
                    <ActionPages currentRow={data}
                        key={`${keyName}-add`} />
                </div>
            </Main>
        </>
    )
}