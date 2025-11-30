
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
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { students, seminars } from "@/lib/data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function SeminarsPage() {

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold tracking-tight">Seminários e Cursos</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Alunos Inscritos</CardTitle>
              <CardDescription>
                Lista de alunos inscritos nos próximos seminários e cursos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Aluno</TableHead>
                    <TableHead>Curso/Seminário</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Pagamento</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {seminars.map(seminar => {
                    const student = students.find(s => s.id === seminar.studentId);
                    return (
                      <TableRow key={seminar.id}>
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
                          <div className="font-medium">{seminar.seminarName}</div>
                        </TableCell>
                        <TableCell>
                          {new Date(seminar.seminarDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                           <Badge variant={seminar.payment.status === 'Pago' ? "default" : "destructive"}>{seminar.payment.status}</Badge>
                        </TableCell>
                         <TableCell className="text-right">
                          R$ {seminar.payment.value.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Inscrever em Curso</CardTitle>
              <CardDescription>
                Preencha os dados para inscrever um aluno em um seminário ou curso.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="student">Aluno</Label>
                  <Select>
                    <SelectTrigger id="student">
                      <SelectValue placeholder="Selecione o aluno" />
                    </SelectTrigger>
                    <SelectContent>
                      {students.filter(s => s.status === 'Active').map(student => (
                        <SelectItem key={student.id} value={student.id}>{student.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="seminar-name">Tema do Curso/Seminário</Label>
                    <Input id="seminar-name" placeholder="Ex: Defesa Pessoal Feminina" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="seminar-date">Data do Curso</Label>
                  <Input id="seminar-date" type="date" />
                </div>

                 <div className="space-y-2">
                    <Label htmlFor="seminar-value">Valor da Inscrição</Label>
                    <Input id="seminar-value" type="number" placeholder="ex: 150.00" />
                  </div>

                <div className="space-y-2">
                  <Label>Pagamento</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Status do pagamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pago">Pago</SelectItem>
                      <SelectItem value="Pendente">Pendente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                 <div className="space-y-2">
                  <Label>Forma de Pagamento</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a forma" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cartão de Crédito">Cartão de Crédito</SelectItem>
                      <SelectItem value="Transferência">Transferência</SelectItem>
                      <SelectItem value="Dinheiro">Dinheiro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Anotações</Label>
                  <Textarea id="notes" placeholder="Observações sobre o curso ou o aluno..." />
                </div>

                <Button className="w-full">Inscrever Aluno</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
