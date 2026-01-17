import { Main } from "@/layouts/components/main";
import type { Room } from "./data/schema";
import { ActionPages } from "./components/action-page";








interface RoomProps {
    data?: Room
}


export default function RoomDetails(props: RoomProps) {
    const { data } = props;
    const keyName = "rooms";

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