import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { FileText, FolderUp } from "lucide-react";


interface IDataTableExportInterface {
    onPdfDownload?: () => void
}


const DataTableExports: React.FC<IDataTableExportInterface> = ({ onPdfDownload }) => {
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button>
                        Exports <FolderUp />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                        <Button onClick={onPdfDownload} className="w-full bg-transparent text-black dark:text-white">
                            PDF <FileText />
                        </Button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}


export default DataTableExports;