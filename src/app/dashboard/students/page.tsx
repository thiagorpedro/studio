import Link from "next/link"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PlusCircle, FileUp, FileDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { students, payments } from "@/lib/data"
import { isPast, parseISO, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function StudentsPage() {
  const activeStudents = students.filter(s => s.status === 'Active');
  const inactiveStudents = students.filter(s => s.status === 'Inactive');

  const getPlanStatus = (studentId: string) => {
    const lastPayment = payments
      .filter(p => p.studentId === studentId)
      .sort((a,b) => parseISO(b.date).getTime() - parseISO(a.date).getTime())[0];
    
    if (!lastPayment) return { text: "Sem Plano", variant: "secondary" as const, details: "" };

    const validUntil = parseISO(lastPayment.validUntil);
    const options = { locale: ptBR, addSuffix: true };
    if (isPast(validUntil)) {
      return { text: "Expirado", variant: "destructive" as const, details: `Expirou ${formatDistanceToNow(validUntil, options)}` };
    }
    return { text: "Ativo", variant: "default" as const, details: `Expira ${formatDistanceToNow(validUntil, options)}` };
  };

  const StudentTable = ({ studentList }: { studentList: typeof students }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[100px] sm:table-cell">
            <span className="sr-only">Imagem</span>
          </TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Faixa</TableHead>
          <TableHead className="hidden md:table-cell">Status do Plano</TableHead>
          <TableHead className="hidden md:table-cell">Data de Início</TableHead>
          <TableHead>
            <span className="sr-only">Ações</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {studentList.map(student => {
          const planStatus = getPlanStatus(student.id);
          return (
            <TableRow key={student.id}>
              <TableCell className="hidden sm:table-cell">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={student.avatarUrl} alt={student.name} data-ai-hint="person portrait" />
                  <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell className="font-medium">{student.name}</TableCell>
              <TableCell>
                <Badge variant="outline">{student.belt}</Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                 <Badge variant={planStatus.variant}>{planStatus.text}</Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">{new Date(student.startDate).toLocaleDateString()}</TableCell>
              <TableCell>
                <Button asChild size="sm" variant="outline">
                    <Link href={`/dashboard/students/${student.id}`}>Ver</Link>
                </Button>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Alunos</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm"><FileDown className="mr-2 h-4 w-4" /> Exportar</Button>
          <Button variant="outline" size="sm"><FileUp className="mr-2 h-4 w-4" /> Importar</Button>
          <Button asChild size="sm">
            <Link href="/onboarding"><PlusCircle className="mr-2 h-4 w-4" /> Adicionar Aluno</Link>
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Ativos</TabsTrigger>
          <TabsTrigger value="inactive">Inativos</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Alunos Ativos</CardTitle>
              <CardDescription>
                Lista de todos os alunos atualmente ativos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <StudentTable studentList={activeStudents} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="inactive">
          <Card>
            <CardHeader>
              <CardTitle>Alunos Inativos</CardTitle>
              <CardDescription>
                Lista de alunos que não estão treinando no momento.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <StudentTable studentList={inactiveStudents} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
