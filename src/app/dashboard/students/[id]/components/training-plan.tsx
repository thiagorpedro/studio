'use client';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { personalizedTrainingRecommendations, PersonalizedTrainingRecommendationsOutput } from "@/ai/flows/personalized-training-recommendations";
import type { Student } from "@/lib/types";
import { Loader2, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  rank: z.string().min(1, { message: "A faixa é obrigatória." }),
  medicalHistory: z.string().min(1, { message: "O histórico médico é obrigatório." }),
  performanceData: z.string().min(1, { message: "Os dados de desempenho são obrigatórios." }),
});

export function TrainingPlan({ student }: { student: Student }) {
  const [recommendation, setRecommendation] = useState<PersonalizedTrainingRecommendationsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rank: student.belt,
      medicalHistory: student.medicalHistory,
      performanceData: student.performanceData || " ",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setRecommendation(null);
    try {
      const result = await personalizedTrainingRecommendations({
        studentName: student.name,
        ...values,
      });
      setRecommendation(result);
    } catch (error) {
      console.error("Falha ao obter recomendações", error);
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Falha ao gerar recomendações de treino. Por favor, tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Gerar Plano de Treino</CardTitle>
          <CardDescription>
            Use a IA para gerar um plano de treino personalizado com base nos dados do aluno.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="rank"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Faixa</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                       <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a faixa" />
                          </SelectTrigger>
                       </FormControl>
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="medicalHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Histórico Médico</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Ex: Asma, lesão anterior no joelho" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="performanceData"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dados de Desempenho e Anotações</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Ex: Excelente em sparring, precisa melhorar no chão" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-4 w-4" />
                )}
                Gerar Plano
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Recomendação da IA</CardTitle>
          <CardDescription>
            O plano de treino gerado aparecerá aqui.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          {isLoading && (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          )}
          {recommendation && (
            <div className="space-y-6 text-sm">
              <div>
                <h3 className="font-semibold text-lg mb-2">Treino Recomendado</h3>
                <p className="whitespace-pre-wrap leading-relaxed">{recommendation.trainingRecommendations}</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Justificativa</h3>
                <p className="whitespace-pre-wrap leading-relaxed text-muted-foreground">{recommendation.reasoning}</p>
              </div>
            </div>
          )}
           {!isLoading && !recommendation && (
            <div className="flex items-center justify-center h-full text-center text-muted-foreground">
                <p>Seu plano gerado será exibido aqui assim que for gerado.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
