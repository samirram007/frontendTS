import { Main } from "@/layouts/components/main";
import type { Building } from "./data/schema";
import { ActionPages } from "./components/action-page";








interface BuildingProps {
    data?: Building
}


export default function BuildingDetails(props: BuildingProps) {
    const { data } = props;
    const keyName = "buildings";

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