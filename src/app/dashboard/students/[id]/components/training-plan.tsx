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
  rank: z.string().min(1, { message: "Rank is required." }),
  medicalHistory: z.string().min(1, { message: "Medical history is required." }),
  performanceData: z.string().min(1, { message: "Performance data is required." }),
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
      console.error("Failed to get recommendations", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to generate training recommendations. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Generate Training Plan</CardTitle>
          <CardDescription>
            Use AI to generate a personalized training plan based on the student's data.
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
                    <FormLabel>Rank / Belt</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                       <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select belt" />
                          </SelectTrigger>
                       </FormControl>
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="medicalHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Medical History</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Asthma, previous knee injury" {...field} />
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
                    <FormLabel>Performance Data & Notes</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Excellent sparring, needs ground work improvement" {...field} />
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
                Generate Plan
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>AI Recommendation</CardTitle>
          <CardDescription>
            The generated training plan will appear here.
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
                <h3 className="font-semibold text-lg mb-2">Recommended Training</h3>
                <p className="whitespace-pre-wrap leading-relaxed">{recommendation.trainingRecommendations}</p>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Reasoning</h3>
                <p className="whitespace-pre-wrap leading-relaxed text-muted-foreground">{recommendation.reasoning}</p>
              </div>
            </div>
          )}
           {!isLoading && !recommendation && (
            <div className="flex items-center justify-center h-full text-center text-muted-foreground">
                <p>Your generated plan will be displayed here once generated.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
