"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, File } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

import { useRouter } from "next/navigation";
import { createRegistration } from "@/lib/firebase";
import { Template } from "@/types/forms";
import { useState } from "react";

const FormSchema = z.object({
  title: z.string().min(1, 'A seleção é obrigatória'),
  description: z.string().optional(),
});

const SetTemplateForm = ({specialistId}: {specialistId: string}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [open, setOpen] = useState(false);

  const onSubmit = async(values: z.infer<typeof FormSchema>) => {
    try {
      let data = values as Template;
      data.specialist = specialistId;
      createRegistration(data, "template").then(() => {
        toast({
            title: "Socilitação registrada!",
            description: "O modelo foi adicionado.",
        });
        form.reset();
        setOpen(false);
      });
      //router.push(`/builder/${formId}`);
    } catch (error) {
      toast({
        title: "Erro!",
        description: "Algo deu errado. Por favor, tente novamente mais tarde",
        variant: "destructive",
      });
      setOpen(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"default"}
          className="group text-content shadow-2xl shadow-shadow_color bg-primary-background border-2 border-content border-dashed h-[190px] items-center justify-center flex flex-col gap-4 hover:cursor-pointer hover:border-primary duration-300"
        >
          <File className="h-8 w-8 group-hover:text-primary duration-300" />
          <p className="font-bold text-xl group-hover:text-primary duration-300">Criar novo modelo</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar modelo</DialogTitle>
          <DialogDescription>Inicie a criação de um modelo para ser usado em avaliações</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea rows={5} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type='submit' disabled={form.formState.isSubmitting} className="w-full mt-4">
                {!form.formState.isSubmitting && <span>Salvar</span>}
                {form.formState.isSubmitting && <Loader2 className="animate-spin" />}
              </Button>
            </DialogFooter>
          </form>
        </Form>  
      </DialogContent>
    </Dialog>
  );
}

export default SetTemplateForm;