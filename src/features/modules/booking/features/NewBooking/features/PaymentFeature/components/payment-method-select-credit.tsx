export default function CreditPayment(){
    return(
        <div className="grid grid-rows-1 gap-5">
            <div className="grid grid-cols-[110px_1fr] items-center">
                <h1 className="text-app-small font-semibold">TID:</h1>
                <input 
                    type="text" 
                    className="placeholder:text-app-small px-2 border-[1px] border-gray-400 w-full text-app-base rounded py-2" 
                    placeholder="Enter TID no"
                />
            </div>

            <div className="grid grid-cols-[110px_1fr] items-center">
                <h1 className="text-app-small font-semibold">Card No:</h1>
                <input 
                    type="text" 
                    className="placeholder:text-app-small px-2 border-[1px] border-gray-400 w-full text-app-base rounded py-2" 
                    placeholder="Enter Card no"
                />
            </div>

            <div className="grid grid-cols-[110px_1fr] items-center">
                <h1 className="text-app-small font-semibold">Transaction No:</h1>
                <input 
                    type="text" 
                    className="placeholder:text-app-small px-2 border-[1px] border-gray-400 w-full text-app-base rounded py-2" 
                    placeholder="Enter Transaction no"
                />
            </div>
        </div>
    )
}

