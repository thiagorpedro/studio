import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getStudentById } from "@/lib/data"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, BellRing } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ProfileForm } from "./components/profile-form"
import { FinancialRecords } from "./components/financial-records"
import { TrainingPlan } from "./components/training-plan"

export default function StudentDetailPage({ params }: { params: { id: string } }) {
  const student = getStudentById(params.id)

  if (!student) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" size="icon">
          <Link href="/dashboard/students">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
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
            <Button variant="outline">
                <BellRing className="mr-2 h-4 w-4" />
                Send Reminder
            </Button>
        </div>
      </div>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
          <TabsTrigger value="training">Training Plan</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Student Profile</CardTitle>
              <CardDescription>
                Detailed information about the student.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProfileForm student={student} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="financials">
          <FinancialRecords student={student} />
        </TabsContent>
        <TabsContent value="training">
          <TrainingPlan student={student} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
