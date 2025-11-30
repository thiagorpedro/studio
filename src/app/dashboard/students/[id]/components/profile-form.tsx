'use client';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Student } from "@/lib/types"

export function ProfileForm({ student }: { student: Student }) {
  return (
    <form className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" defaultValue={student.name} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dob">Date of Birth</Label>
          <Input id="dob" type="date" defaultValue={student.dob} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cpf">CPF</Label>
          <Input id="cpf" defaultValue={student.cpf} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" defaultValue={student.contactInfo.email} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="tel" defaultValue={student.contactInfo.phone} />
        </div>
         <div className="space-y-2">
          <Label htmlFor="start-date">Start Date</Label>
          <Input id="start-date" type="date" defaultValue={student.startDate} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last-grading">Last Grading</Label>
          <Input id="last-grading" type="date" defaultValue={student.lastGradingDate} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="belt">Belt</Label>
          <Select defaultValue={student.belt}>
            <SelectTrigger id="belt">
              <SelectValue placeholder="Select belt" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="White">White</SelectItem>
              <SelectItem value="Yellow">Yellow</SelectItem>
              <SelectItem value="Orange">Orange</SelectItem>
              <SelectItem value="Green">Green</SelectItem>
              <SelectItem value="Blue">Blue</SelectItem>
              <SelectItem value="Brown">Brown</SelectItem>
              <SelectItem value="Black">Black</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
           <Select defaultValue={student.status}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="medical-history">Medical History</Label>
          <Textarea id="medical-history" rows={4} defaultValue={student.medicalHistory} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="notes">General Notes</Label>
          <Textarea id="notes" rows={4} defaultValue={student.notes} />
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="fikm-fee" defaultChecked={student.fikmFeePaid} />
        <Label htmlFor="fikm-fee">FIKM annual fee paid</Label>
      </div>
      <div className="flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </form>
  )
}
