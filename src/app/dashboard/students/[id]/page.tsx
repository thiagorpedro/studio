

import { getStudentById, getPaymentsByStudentId } from "@/lib/data"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Award, Trash2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProfileForm } from "./components/profile-form"
import { FinancialRecords } from "./components/financial-records"
import { SendReminderButton } from "./components/send-reminder-button"
import { isPast, parseISO } from "date-fns"
import { DeleteStudentDialog } from "./components/delete-student-dialog"

export default function StudentDetailPage({ params }: { params: { id: string } }) {
  const student = getStudentById(params.id)

  if (!student) {
    notFound()
  }

  const payments = getPaymentsByStudentId(student.id)
  const lastPayment = payments.sort((a,b) => parseISO(b.date).getTime() - parseISO(a.date).getTime())[0]
  const isOverdue = lastPayment ? isPast(parseISO(lastPayment.validUntil)) : true;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" size="icon">
          <Link href="/dashboard/students">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Voltar</span>
          </Link>
        </Button>
        <Avatar className="h-12 w-12">
            <AvatarImage src={student.avatarUrl} alt={student.name} data-ai-hint="person portrait" />
            <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
            <h1 className="text-2xl font-bold">{student.name}</h1>
            <p className="text-sm text-muted-foreground">{student.contactInfo.email}</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
            <SendReminderButton student={student} isOverdue={isOverdue} lastPayment={lastPayment}/>
            <DeleteStudentDialog studentId={student.id} />
        </div>
      </div>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="financials">Financeiro</TabsTrigger>
          <TabsTrigger value="training">Plano de Treino</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <ProfileForm student={student} />
        </TabsContent>
        <TabsContent value="financials">
          <FinancialRecords student={student} />
        </TabsContent>
         <TabsContent value="training">
          <Card>
            <CardHeader>
                <CardTitle>Em breve</CardTitle>
                <CardDescription>Funcionalidades de treino personalizado com IA serão adicionadas aqui.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-48">
                    <Award className="h-12 w-12 mb-4" />
                    <p>Acompanhe o progresso e receba recomendações de treino personalizadas no futuro.</p>
                </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
