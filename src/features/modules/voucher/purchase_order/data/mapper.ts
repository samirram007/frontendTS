import type { ReceiptNoteForm } from "../../receipt_note/data/schema";
import type { PurchaseOrderForm } from "./schema";

export function mapPurchaseOrderToReceipt(
    purchaseOrder:PurchaseOrderForm
):ReceiptNoteForm{
    return {
        ...purchaseOrder,
        isEdit:false,
        
    }
} 

// export function transformPOtoReceipt<T extends Record<string, any>>(data: T): T {

//   function walk(obj: any): any {

//     if (Array.isArray(obj)) {
//       return obj.map(walk)
//     }

//     if (obj && typeof obj === "object") {

//       const clone: any = {}

//       for (const key in obj) {
//         clone[key] = walk(obj[key])
//       }

//       // ==============================
//       // QUANTITY TRANSFORMATION
//       // ==============================
//       if ("orderQuantity" in clone) {
//         clone.actualQuantity = clone.orderQuantity
//         clone.billingQuantity = clone.orderQuantity
//       }

//       // ==============================
//       // GODOWN DEFAULT INSERT
//       // ==============================
//       if ("stockJournalGodownEntries" in clone) {

//         if (!Array.isArray(clone.stockJournalGodownEntries) ||
//             clone.stockJournalGodownEntries.length === 0) {

//           clone.stockJournalGodownEntries = [{
//             godownId: 1,
//             batchNo: "",
//             serialNo: "",
//             actualQuantity: clone.actualQuantity ?? 0,
//             billingQuantity: clone.billingQuantity ?? 0,
//             rate: clone.rate ?? 0,
//             discountPercentage: 0,
//             discount: 0,
//             amount: clone.amount ?? 0,
//             movementType: "in",
//             remarks: null
//           }]
//         }
//       }

//       return clone
//     }

//     return obj
//   }

//   return walk(data)
// }
