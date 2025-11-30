import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PlusCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { sales, students } from "@/lib/data"

export default function SalesPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Sales</h1>
        <Button size="sm">
          <PlusCircle className="mr-2 h-4 w-4" /> Add Sale
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sales History</CardTitle>
          <CardDescription>
            A record of all merchandise and other sales.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Item</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="text-right">Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.map(sale => {
                 const student = students.find(s => s.id === sale.studentId);
                return (
                  <TableRow key={sale.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="hidden h-9 w-9 sm:flex">
                          <AvatarImage src={student?.avatarUrl} alt={sale.studentName} data-ai-hint="person portrait"/>
                          <AvatarFallback>{sale.studentName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">{sale.studentName}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {sale.item}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(sale.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      R$ {sale.value.toFixed(2)}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
