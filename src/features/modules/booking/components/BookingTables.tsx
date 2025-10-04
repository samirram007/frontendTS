import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BookingData from "../data/booking-data.json";
import { useContext } from "react";
import { PathoContext } from "../contexts/PathoContext";


export function BookingTable() {

  const {searchBooking} = useContext(PathoContext);

  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Booking ID</TableHead>
           <TableHead>Booking Date</TableHead>
          <TableHead>Patient Name</TableHead>
          <TableHead>Test Type</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Booking status</TableHead>
          <TableHead>Reporting status</TableHead>
          <TableHead>Payment status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {BookingData.filter(data =>  data.patient_name.toLowerCase().includes(searchBooking.toLowerCase()) || data.booking_id.toLowerCase().includes(searchBooking.toLowerCase()) ).map((invoice) => (
          <TableRow key={invoice.booking_id}>
            <TableCell className="font-medium">{invoice.booking_id}</TableCell>
            <TableCell>{invoice.booking_date}</TableCell>
            <TableCell>{invoice.patient_name}</TableCell>
            <TableCell>{invoice.test_type}</TableCell>
            <TableCell>{invoice.price}</TableCell>
            <TableCell>{invoice.booking_status}</TableCell>
            <TableCell>{'Ongoing'}</TableCell>
            <TableCell>{invoice.payment_status}</TableCell>
            <TableCell>
              {/* <Link to="/view">
                <View size={20} />
              </Link> */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
