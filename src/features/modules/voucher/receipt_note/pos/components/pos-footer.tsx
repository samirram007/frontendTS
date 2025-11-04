import { Button } from '@/components/ui/button'

type Props = {}

const PosFooter = (props: Props) => {

    return (
        <div className="bg-red-300/20 grid grid-cols-[1fr_1fr]">
            <div className="grid ">
                <div>
                    <div className="text-sm">Narration:</div>
                    <div contentEditable className="narration caret-accent caret-underscore caret-unde justify-self-end bg-black text-gray-100 w-full h-full text-sm  font-semibold  "></div>
                </div>
                <div className="narration"></div>
            </div>
            <div className="grid grid-rows-2 justify-end">

                <div className="text-right">
                    Total: 50000
                </div>
                <div className="text-right">
                    <Button type="submit">Save....</Button>
                </div>
            </div>

        </div>


    )
}

export default PosFooter