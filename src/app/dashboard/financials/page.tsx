
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { payments, students } from "@/lib/data"
import { parseISO, isPast } from 'date-fns'
import { DollarSign, AlertCircle } from "lucide-react"

export default function FinancialsPage() {
  const totalRevenue = payments.reduce((acc, p) => acc + p.plan.value, 0)
  const overduePayments = payments.filter(p => isPast(parseISO(p.validUntil)) && students.find(s => s.id === p.studentId)?.status === 'Active')

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Financeiro</h1>
      </div>

       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Receita Total
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Receita de todos os pagamentos registrados.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pagamentos Atrasados
            </CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overduePayments.length}</div>
            <p className="text-xs text-muted-foreground">
              Alunos com mensalidades vencidas.
            </p>
          </CardContent>
        </Card>
      </div>


      <Card>
        <CardHeader>
          <CardTitle>Histórico de Pagamentos</CardTitle>
          <CardDescription>
            Um registro de todos os pagamentos recebidos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Aluno</TableHead>
                <TableHead>Plano</TableHead>
                <TableHead className="hidden md:table-cell">Data Pag.</TableHead>
                <TableHead className="hidden md:table-cell">Vencimento</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.sort((a,b) => parseISO(b.date).getTime() - parseISO(a.date).getTime()).map(payment => {
                 const student = students.find(s => s.id === payment.studentId);
                 const isOverdue = isPast(parseISO(payment.validUntil)) && student?.status === 'Active';
                return (
                  <TableRow key={payment.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="hidden h-9 w-9 sm:flex">
                          <AvatarImage src={student?.avatarUrl} alt={student?.name} data-ai-hint="person portrait"/>
                          <AvatarFallback>{student?.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">{student?.name}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={isOverdue ? "destructive" : "outline"}>{payment.plan.type}</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(payment.date).toLocaleDateString()}
                    </TableCell>
                     <TableCell className="hidden md:table-cell">
                      {new Date(payment.validUntil).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      R$ {payment.plan.value.toFixed(2)}
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
