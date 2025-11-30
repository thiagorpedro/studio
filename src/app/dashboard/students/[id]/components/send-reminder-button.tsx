
'use client'
import { Button } from "@/components/ui/button"
import { BellRing } from "lucide-react"
import type { Student, Payment } from "@/lib/types"
import { format } from "date-fns"

export function SendReminderButton({ student, isOverdue, lastPayment }: { student: Student, isOverdue: boolean, lastPayment?: Payment }) {
  
  const handleSendReminder = () => {
    if (!lastPayment) return;

    const subject = "Lembrete de Pagamento - Academia de Krav Maga"
    const expirationDate = format(new Date(lastPayment.validUntil), 'dd/MM/yyyy')
    const body = `Olá ${student.name},\n\nEste é um lembrete de que seu plano de pagamento venceu em ${expirationDate}. \n\nPara continuar treinando, por favor, realize a renovação do seu plano. \n\nValor: R$ ${lastPayment.plan.value.toFixed(2)}\n\nVocê pode pagar diretamente na academia ou entrar em contato para mais opções.\n\nAtenciosamente,\nEquipe da Academia`
    
    const mailtoLink = `mailto:${student.contactInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    
    window.location.href = mailtoLink
  }

  return (
    <Button variant="outline" onClick={handleSendReminder} disabled={!isOverdue}>
        <BellRing className="mr-2 h-4 w-4" />
        Enviar Lembrete
    </Button>
  )
}
