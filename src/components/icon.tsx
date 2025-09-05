import { IconChecklist, IconLayoutDashboard, IconMessages, IconPackages, IconUsers } from "@tabler/icons-react";
import {
    FaBan,
    FaBolt,
    FaBook,
    FaCalendarAlt,
    FaCartArrowDown,
    FaCartPlus,
    FaChartLine,
    FaClipboardCheck,
    FaClock,
    FaCoins,
    FaCreditCard,
    FaExchangeAlt,
    FaFileExport,
    FaFileImport,
    FaFileInvoice, FaFileInvoiceDollar,
    FaGift,
    FaHandHolding,
    FaHandHoldingUsd,
    FaHome,
    FaIndustry,
    FaMoneyBill,
    FaMoneyBillWave,
    FaMoneyCheck,
    FaPercentage,
    FaPlusSquare,
    FaReceipt,
    FaRegCreditCard, FaRegMoneyBillAlt,
    FaShieldAlt,
    FaShoppingBag,
    FaStickyNote,
    FaTimesCircle,
    FaTrash,
    FaTruck,
    FaUndo,
    FaUsersCog, FaUserShield
} from "react-icons/fa";
type Props = {
    name: string
    size?: number
    className?: string
}
const IconBag: Record<string, React.ElementType> = {
    IconLayoutDashboard,
    IconChecklist,
    IconPackages,
    IconMessages,
    IconUsers,
    FaMoneyBill,
    FaMoneyCheck,
    FaRegMoneyBillAlt,
    FaRegCreditCard,
    FaCreditCard,
    FaFileInvoiceDollar,
    FaFileInvoice,
    FaBan,
    FaBolt,
    FaBook,
    FaCalendarAlt,
    FaCartArrowDown,
    FaCartPlus,
    FaChartLine,
    FaClipboardCheck,
    FaClock,
    FaCoins,
    FaExchangeAlt,
    FaFileExport,
    FaFileImport,
    FaGift,
    FaHandHolding,
    FaHandHoldingUsd,
    FaHome,
    FaIndustry,
    FaMoneyBillWave,
    FaPercentage,
    FaPlusSquare,
    FaReceipt,
    FaShieldAlt,
    FaShoppingBag,
    FaStickyNote,
    FaTimesCircle,
    FaTrash,
    FaTruck,
    FaUndo,
    FaUsersCog,
    FaUserShield


}


export const Icon = ({ name, size = 20, className }: Props) => {
    const IconComponent = IconBag[name] || IconChecklist
    return <IconComponent size={size} className={className} />
}


export default Icon