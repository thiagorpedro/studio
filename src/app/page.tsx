import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle>Bem-vindo ao Krav Magá Ipiranga</CardTitle>
          <CardDescription>
            Gerencie sua academia com facilidade.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-6">
            Acesse o painel de controle para gerenciar alunos, finanças, exames de faixa e muito mais.
          </p>
          <Button asChild className="w-full">
            <Link href="/dashboard">Acessar Painel</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
