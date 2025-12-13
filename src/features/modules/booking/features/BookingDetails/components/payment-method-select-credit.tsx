import { usePayment } from "../../../contexts/payment-context"

export default function CreditPayment() {

    const { setTransactionNo } = usePayment();

    const handleChangeTransaction = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTransactionNo(e.target.value);
    }

    return (
        <div className="grid grid-rows-1 gap-5">
            <div className="flex flex-col items-start">
                <h1 className="text-app-small font-semibold my-2">Transaction No:</h1>
                <input
                    type="text"
                    onChange={(e) => handleChangeTransaction(e)}
                    className="placeholder:text-app-small px-2 border-[1px] border-gray-400 w-full text-app-base rounded py-2"
                    placeholder="Enter Transaction no"
                />
            </div>
        </div>
    )
}

