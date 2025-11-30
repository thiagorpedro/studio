
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
import { students, beltExams } from "@/lib/data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function BeltExamsPage() {

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-bold tracking-tight">Exames de Faixa</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Alunos Inscritos</CardTitle>
              <CardDescription>
                Lista de alunos inscritos para os próximos exames de faixa.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Aluno</TableHead>
                    <TableHead>Data do Exame</TableHead>
                    <TableHead>Faixa Alvo</TableHead>
                    <TableHead>Pagamento</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {beltExams.map(exam => {
                    const student = students.find(s => s.id === exam.studentId);
                    return (
                      <TableRow key={exam.id}>
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
                          {new Date(exam.examDate).toLocaleDateString()} às {exam.examTime}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{exam.targetBelt}</Badge>
                        </TableCell>
                        <TableCell>
                           <Badge variant={exam.payment.status === 'Pago' ? "default" : "destructive"}>{exam.payment.status}</Badge>
                        </TableCell>
                         <TableCell className="text-right">
                          R$ {exam.payment.value.toFixed(2)}
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
              <CardTitle>Inscrever Aluno</CardTitle>
              <CardDescription>
                Preencha os dados para inscrever um aluno em um exame.
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

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="exam-date">Data do Exame</Label>
                    <Input id="exam-date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="exam-time">Horário</Label>
                    <Input id="exam-time" type="time" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="target-belt">Faixa Alvo</Label>
                  <Select>
                    <SelectTrigger id="target-belt">
                      <SelectValue placeholder="Selecione a faixa" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Amarela">Amarela</SelectItem>
                      <SelectItem value="Laranja">Laranja</SelectItem>
                      <SelectItem value="Verde">Verde</SelectItem>
                      <SelectItem value="Azul">Azul</SelectItem>
                      <SelectItem value="Marrom">Marrom</SelectItem>
                      <SelectItem value="Preta">Preta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                 <div className="space-y-2">
                    <Label htmlFor="exam-value">Valor do Exame</Label>
                    <Input id="exam-value" type="number" placeholder="ex: 200.00" />
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

                {/* Campos condicionais para pagamento */}
                <div className="space-y-2">
                    <Label htmlFor="payment-date">Data do Pagamento</Label>
                    <Input id="payment-date" type="date" />
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


                <Button className="w-full">Inscrever Aluno</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
