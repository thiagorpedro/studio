import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
      <Card>
        <CardHeader>
          <CardTitle>Em Breve</CardTitle>
          <CardDescription>
            Esta seção está em construção.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>As configurações para gerenciar sua academia, faturamento e integrações estarão disponíveis aqui em uma atualização futura.</p>
        </CardContent>
      </Card>
    </div>
  );
}
