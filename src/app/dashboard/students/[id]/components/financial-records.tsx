'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Student, PaymentPlanType } from "@/lib/types"
import { getPaymentsByStudentId } from "@/lib/data"
import { parseISO, format } from 'date-fns'

export function FinancialRecords({ student }: { student: Student }) {
  const payments = getPaymentsByStudentId(student.id)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>
              A log of all payments made by the student.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payment Date</TableHead>
                  <TableHead>Plan Type</TableHead>
                  <TableHead>Valid Until</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map(payment => (
                  <TableRow key={payment.id}>
                    <TableCell>{format(parseISO(payment.date), 'MM/dd/yyyy')}</TableCell>
                    <TableCell>{payment.plan.type}</TableCell>
                    <TableCell>{format(parseISO(payment.validUntil), 'MM/dd/yyyy')}</TableCell>
                    <TableCell className="text-right">R$ {payment.plan.value.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
                 {payments.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center h-24">No payments found.</TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Log New Payment</CardTitle>
            <CardDescription>
              Record a new payment for this student.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="payment-date">Payment Date</Label>
                <Input id="payment-date" type="date" defaultValue={new Date().toISOString().substring(0, 10)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="plan-type">Plan Type</Label>
                <Select>
                  <SelectTrigger id="plan-type">
                    <SelectValue placeholder="Select plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                    <SelectItem value="Quarterly">Quarterly</SelectItem>
                    <SelectItem value="Annual">Annual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="value">Value</Label>
                <Input id="value" type="number" placeholder="e.g. 150.00" />
              </div>
               <div className="space-y-2">
                <Label htmlFor="valid-until">Valid Until</Label>
                <Input id="valid-until" type="date" />
              </div>
              <Button className="w-full">Save Payment</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
