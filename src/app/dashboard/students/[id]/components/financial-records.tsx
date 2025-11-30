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
            <CardTitle>Histórico de Pagamentos</CardTitle>
            <CardDescription>
              Um registro de todos os pagamentos feitos pelo aluno.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data do Pagamento</TableHead>
                  <TableHead>Tipo de Plano</TableHead>
                  <TableHead>Válido Até</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map(payment => (
                  <TableRow key={payment.id}>
                    <TableCell>{format(parseISO(payment.date), 'dd/MM/yyyy')}</TableCell>
                    <TableCell>{payment.plan.type}</TableCell>
                    <TableCell>{format(parseISO(payment.validUntil), 'dd/MM/yyyy')}</TableCell>
                    <TableCell className="text-right">R$ {payment.plan.value.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
                 {payments.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center h-24">Nenhum pagamento encontrado.</TableCell>
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
            <CardTitle>Registrar Novo Pagamento</CardTitle>
            <CardDescription>
              Registre um novo pagamento para este aluno.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="payment-date">Data do Pagamento</Label>
                <Input id="payment-date" type="date" defaultValue={new Date().toISOString().substring(0, 10)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="plan-type">Tipo de Plano</Label>
                <Select>
                  <SelectTrigger id="plan-type">
                    <SelectValue placeholder="Selecione o plano" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Monthly">Mensal</SelectItem>
                    <SelectItem value="Quarterly">Trimestral</SelectItem>
                    <SelectItem value="Annual">Anual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="value">Valor</Label>
                <Input id="value" type="number" placeholder="ex: 150.00" />
              </div>
               <div className="space-y-2">
                <Label htmlFor="valid-until">Válido Até</Label>
                <Input id="valid-until" type="date" />
              </div>
              <Button className="w-full">Salvar Pagamento</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
