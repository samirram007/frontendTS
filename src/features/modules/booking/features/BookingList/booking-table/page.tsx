import { columns } from "./columns";
import { BookingListDataTable } from "./data-table";


const testData = [
  {
    "id": 1,
    "bookingDate": "2025-09-20T09:00:00.000Z",
    "paitentName": "Rahul Sharma",
    "testType": "Blood Test",
    "amount": 500,
    "bookingStatus": "Confirmed",
    "reportingStatus": "Pending",
    "paymentStatus": "Paid"
  },
  {
    "id": 2,
    "bookingDate": "2025-09-21T10:30:00.000Z",
    "paitentName": "Priya Mehta",
    "testType": "Urine Test",
    "amount": 300,
    "bookingStatus": "Pending",
    "reportingStatus": "Not Collected",
    "paymentStatus": "Unpaid"
  },
  {
    "id": 3,
    "bookingDate": "2025-09-22T08:45:00.000Z",
    "paitentName": "Amit Verma",
    "testType": "X-Ray Chest",
    "amount": 1000,
    "bookingStatus": "Confirmed",
    "reportingStatus": "Completed",
    "paymentStatus": "Paid"
  },
  {
    "id": 4,
    "bookingDate": "2025-09-23T11:15:00.000Z",
    "paitentName": "Sneha Kapoor",
    "testType": "Liver Function Test",
    "amount": 1200,
    "bookingStatus": "Cancelled",
    "reportingStatus": "N/A",
    "paymentStatus": "Refunded"
  },
  {
    "id": 5,
    "bookingDate": "2025-09-25T14:00:00.000Z",
    "paitentName": "Arjun Nair",
    "testType": "COVID-19 RT-PCR",
    "amount": 1500,
    "bookingStatus": "Confirmed",
    "reportingStatus": "In Progress",
    "paymentStatus": "Paid"
  }
]





export function BookingListTable(){
    return(
        <div className="mx-auto py-10">
            <BookingListDataTable columns={columns} data={testData}  />
        </div>
    )
}