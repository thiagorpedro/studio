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
          <Label htmlFor="name">Nome Completo</Label>
          <Input id="name" defaultValue={student.name} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="dob">Data de Nascimento</Label>
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
          <Label htmlFor="phone">Telefone</Label>
          <Input id="phone" type="tel" defaultValue={student.contactInfo.phone} />
        </div>
         <div className="space-y-2">
          <Label htmlFor="start-date">Data de Início</Label>
          <Input id="start-date" type="date" defaultValue={student.startDate} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="last-grading">Última Graduação</Label>
          <Input id="last-grading" type="date" defaultValue={student.lastGradingDate} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="belt">Faixa</Label>
          <Select defaultValue={student.belt}>
            <SelectTrigger id="belt">
              <SelectValue placeholder="Selecione a faixa" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="White">Branca</SelectItem>
              <SelectItem value="Yellow">Amarela</SelectItem>
              <SelectItem value="Orange">Laranja</SelectItem>
              <SelectItem value="Green">Verde</SelectItem>
              <SelectItem value="Blue">Azul</SelectItem>
              <SelectItem value="Brown">Marrom</SelectItem>
              <SelectItem value="Black">Preta</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
           <Select defaultValue={student.status}>
            <SelectTrigger id="status">
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Ativo</SelectItem>
              <SelectItem value="Inactive">Inativo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="medical-history">Histórico Médico</Label>
          <Textarea id="medical-history" rows={4} defaultValue={student.medicalHistory} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="notes">Anotações Gerais</Label>
          <Textarea id="notes" rows={4} defaultValue={student.notes} />
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Switch id="fikm-fee" defaultChecked={student.fikmFeePaid} />
        <Label htmlFor="fikm-fee">Taxa anual FIKM paga</Label>
      </div>
      <div className="flex justify-end">
        <Button>Salvar Alterações</Button>
      </div>
    </form>
  )
}
