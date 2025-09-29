
type Props = {}

const ReceiptNote = (props: Props) => {
    return (
        <div className="w-full grid grid-rows-[100px_1fr_100px]  h-[calc(100dvh_-_200px)]">
            <HeaderComponent />
            <BodyComponent />
            <FooterComponent />
        </div>
    )
}

export default ReceiptNote


const HeaderComponent = () => {
    return (
        <div className="grid grid-rows-1 ">
            <div className="grid grid-cols-[350px_1fr_200px] border-amber-300 border-0">

                <div>
                    <div className="grid grid-cols-[120px_200px] gap-2">
                        <div className="bg-red-400 text-gray-100 px-2">Receipt Note</div>
                        <div>No: 1</div>
                    </div>
                    <div className="grid grid-cols-[40px_200px] gap-2">
                        <div>Ref. : </div>
                        <div>#1236</div>
                    </div>

                </div>
                <div></div>
                <div className="grid grid-rows-2 justify-end ">
                    <div className="text-right">28-09-2025</div>
                    <div className="text-right text-sm font-bold">Sunday</div>

                </div>
            </div>
            <div>
                <div className="grid grid-cols-[140px_1fr] justify-start ">
                    <div>Party's A/c Name</div>
                    <div>: Samir Ram</div>
                </div>
                <div className="grid grid-cols-[140px_1fr] justify-start ">
                    <div>Current Balance</div>
                    <div>: 50000 cr</div>
                </div>
            </div>
        </div>
    )
}

const BodyComponent = () => {

    return (
        <div className="bg-violet-400/20">
            <div className="items">
                <ItemsComponent />

            </div>
        </div>
    )
}
const ItemsComponent = () => {
    const itemsArray = [
        { id: 1, name: "PPC", quantity: 1, rate: 500, unit: "unit", totalAmount: 5000 },
        { id: 2, name: "PPC2", quantity: 2, rate: 700, unit: "unit", totalAmount: 14000 }
    ]

    return (
        <>
            <div className="items-header font-semibold text-sm border-y-2 border-slate-800 grid grid-cols-[70%_1fr]">
                <div className="px-2">Name of Item..</div>
                <div className="grid grid-cols-[100px_70px_50px_1fr] ">
                    <div className=" grid items-center justify-center">Quantity</div>
                    <div className="  grid  justify-end">Rate</div>
                    <div className="  pl-1">per</div>
                    <div className=" grid  justify-end px-1">Amount</div>
                </div>
            </div>
            {
                itemsArray.map(item => (
                    <div key={item.id} className="items-header font-stretch-normal text-sm 
                    border-y-2 border-slate-800/0 grid grid-cols-[70%_1fr]">
                        <div className="px-2">{item.name}</div>
                        <div className="grid grid-cols-[100px_70px_50px_1fr] ">
                            <div className=" grid items-center justify-center">{item.quantity}</div>
                            <div className="  grid  justify-end">{item.rate.toFixed(2)}</div>
                            <div className="  pl-1">{item.unit}</div>
                            <div className=" grid  justify-end px-1">{item.totalAmount.toFixed(2)}</div>
                        </div>
                    </div>
                ))
            }
            {
                <StockItemSelector />
            }
        </>
    )
}
const StockItemSelector = () => {
    return (
        <>
        </>
    )
}

const FooterComponent = () => {
    return (
        <div className="bg-red-300/20 grid grid-rows-[30px_1fr]">
            <div className="text-right">
                Total: 50000
            </div>
            <div className="grid grid-cols-2">
                <div>
                    <div className="text-sm">Narration:</div>
                    <div contentEditable className="narration caret-accent caret-underscore caret-unde justify-self-end bg-black text-gray-100 w-full h-full text-sm  font-semibold  "></div>
                </div>
                <div className="narration"></div>
            </div>
        </div>

    )
}