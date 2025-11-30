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

export default function StudentsPage() {
  const activeStudents = students.filter(s => s.status === 'Active');
  const inactiveStudents = students.filter(s => s.status === 'Inactive');

  const getPlanStatus = (studentId: string) => {
    const lastPayment = payments
      .filter(p => p.studentId === studentId)
      .sort((a,b) => parseISO(b.date).getTime() - parseISO(a.date).getTime())[0];
    
    if (!lastPayment) return { text: "No Plan", variant: "secondary" as const, details: "" };

    const validUntil = parseISO(lastPayment.validUntil);
    if (isPast(validUntil)) {
      return { text: "Expired", variant: "destructive" as const, details: `Expired ${formatDistanceToNow(validUntil)} ago` };
    }
    return { text: "Active", variant: "default" as const, details: `Expires in ${formatDistanceToNow(validUntil)}` };
  };

  const StudentTable = ({ studentList }: { studentList: typeof students }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[100px] sm:table-cell">
            <span className="sr-only">Image</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Belt</TableHead>
          <TableHead className="hidden md:table-cell">Plan Status</TableHead>
          <TableHead className="hidden md:table-cell">Start Date</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
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
                    <Link href={`/dashboard/students/${student.id}`}>View</Link>
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
        <h1 className="text-3xl font-bold tracking-tight">Students</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm"><FileDown className="mr-2 h-4 w-4" /> Export</Button>
          <Button variant="outline" size="sm"><FileUp className="mr-2 h-4 w-4" /> Import</Button>
          <Button asChild size="sm">
            <Link href="/onboarding"><PlusCircle className="mr-2 h-4 w-4" /> Add Student</Link>
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Students</CardTitle>
              <CardDescription>
                List of all currently active students.
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
              <CardTitle>Inactive Students</CardTitle>
              <CardDescription>
                List of students who are not currently training.
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
