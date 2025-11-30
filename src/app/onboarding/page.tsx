
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Shield } from "lucide-react"
import Link from "next/link"

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-secondary/50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="flex justify-center items-center gap-3 mb-6">
            <Shield className="h-10 w-10 text-primary" />
            <h1 className="text-3xl font-bold tracking-tight">Krav Manager</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Cadastro de Novo Aluno</CardTitle>
            <CardDescription>
              Bem-vindo! Por favor, preencha o formulário abaixo para iniciar sua jornada de treinamento.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input id="name" placeholder="Seu nome completo" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cpf">CPF</Label>
                  <Input id="cpf" placeholder="000.000.000-00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Endereço de Email</Label>
                  <Input id="email" type="email" placeholder="voce@exemplo.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Número de Telefone</Label>
                  <Input id="phone" type="tel" placeholder="(00) 00000-0000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Data de Nascimento</Label>
                  <Input id="dob" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shirt-size">Tamanho da Camiseta</Label>
                  <Select>
                    <SelectTrigger id="shirt-size">
                      <SelectValue placeholder="Selecione um tamanho" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="s">Pequeno (P)</SelectItem>
                      <SelectItem value="m">Médio (M)</SelectItem>
                      <SelectItem value="l">Grande (G)</SelectItem>
                      <SelectItem value="xl">Extra Grande (GG)</SelectItem>
                      <SelectItem value="xxl">XXG</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                 <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="pants-size">Tamanho da Calça (Numérico)</Label>
                  <Input id="pants-size" type="number" placeholder="Ex: 42" />
                </div>
              </div>
              
              <div className="flex justify-end gap-4 pt-4">
                <Button variant="outline" asChild>
                  <Link href="/dashboard">Cancelar</Link>
                </Button>
                <Button type="submit">Enviar Cadastro</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
