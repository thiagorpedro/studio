

import { getStudentById, getPaymentsByStudentId } from "@/lib/data"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
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
        </div>
      </div>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="financials">Financeiro</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <ProfileForm student={student} />
        </TabsContent>
        <TabsContent value="financials">
          <FinancialRecords student={student} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
