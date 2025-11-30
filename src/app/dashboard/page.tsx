import Link from "next/link";
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
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DollarSign, Users, Activity, AlertTriangle, PlusCircle } from "lucide-react"
import { students, payments } from "@/lib/data"
import { differenceInDays, isPast, parseISO } from "date-fns"

export default function DashboardPage() {
  const activeStudents = students.filter(s => s.status === 'Active').length;
  const totalStudents = students.length;
  const monthlyRevenue = payments
    .filter(p => parseISO(p.date).getMonth() === new Date().getMonth() -1)
    .reduce((acc, p) => acc + p.plan.value, 0);

  const overduePayments = payments.filter(p => isPast(parseISO(p.validUntil)) && students.find(s => s.id === p.studentId)?.status === 'Active');

  const recentActivity = [...payments, ...students.filter(s => differenceInDays(new Date(), parseISO(s.startDate)) <= 30)]
    .sort((a, b) => new Date(isPayment(a) ? a.date : a.startDate).getTime() - new Date(isPayment(b) ? b.date : b.startDate).getTime())
    .reverse()
    .slice(0, 5);

  function isPayment(activity: any): activity is (typeof payments)[0] {
    return 'plan' in activity;
  }
  
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Painel</h1>
        <div className="flex items-center gap-2">
            <Button asChild size="sm">
                <Link href="/onboarding"><PlusCircle className="mr-2 h-4 w-4" /> Adicionar Aluno</Link>
            </Button>
            <Button asChild size="sm" variant="outline">
                 <Link href="/dashboard/sales"><PlusCircle className="mr-2 h-4 w-4" /> Adicionar Venda</Link>
            </Button>
            <Button asChild size="sm" variant="outline">
                <Link href="/dashboard/students"><PlusCircle className="mr-2 h-4 w-4" /> Adicionar Pagamento</Link>
            </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Receita Mensal
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {monthlyRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% em relação ao mês passado
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Alunos Ativos
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeStudents}</div>
            <p className="text-xs text-muted-foreground">
              de {totalStudents} alunos no total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pagamentos Atrasados</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overduePayments.length}</div>
            <p className="text-xs text-muted-foreground">
              alunos com pagamentos pendentes
            </p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Atividade Recente
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{recentActivity.length}</div>
            <p className="text-xs text-muted-foreground">
              novas atividades este mês
            </p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Atividade Recente</CardTitle>
          <CardDescription>
            Pagamentos recentes e novas matrículas de alunos.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Aluno</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-right">Valor</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActivity.map((activity, index) => {
                const student = students.find(s => s.id === (isPayment(activity) ? activity.studentId : activity.id));
                return (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="font-medium">{student?.name}</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {student?.contactInfo.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      {isPayment(activity) ? (
                        <Badge variant="outline">Pagamento</Badge>
                      ) : (
                        <Badge variant="secondary">Novo Aluno</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                       {new Date(isPayment(activity) ? activity.date : activity.startDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      {isPayment(activity) ? `R$ ${activity.plan.value.toFixed(2)}` : '-'}
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
