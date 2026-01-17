import { Main } from "@/layouts/components/main";
import type { Floor } from "./data/schema";
import { ActionPages } from "./components/action-page";








interface FloorProps {
    data?: Floor
}


export default function FloorDetails(props: FloorProps) {
    const { data } = props;
    const keyName = "floors";

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