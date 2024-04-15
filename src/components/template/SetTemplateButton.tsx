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
import { Template, scales } from "@/types/forms";
import { useState } from "react";
import Combobox from "@/components/ui/combobox";

const FormSchema = z.object({
  title: z.string().min(1, 'A seleção é obrigatória'),
  type: z.string().min(1, 'A seleção é obrigatória'),
  quantity_of_options: z.number().min(5, 'A seleção é obrigatória').max(9, 'A seleção é obrigatória'),
  description: z.string().optional(),
});

const quantity_of_options = [
  {
    value: 5,
    label: "5",
  },
  {
    value: 7,
    label: "7",
  },
  {
    value: 9,
    label: "9",
  },
];

const SetTemplateButton = ({specialistId}: {specialistId: string}) => {
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
            description: "O template foi adicionado.",
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
          <p className="font-bold text-xl group-hover:text-primary duration-300">Criar novo template</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar template</DialogTitle>
          <DialogDescription>Inicie a criação de um template para ser usado em avaliações</DialogDescription>
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
              name='type'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Escala</FormLabel>
                  <FormControl>
                    <Combobox
                      onSelect={(value) => field.onChange(value)}
                      options={scales}
                      placeholder="Selecione uma opção"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='quantity_of_options'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantidade de opções</FormLabel>
                  <FormControl>
                    <Combobox
                      onSelect={(value) => field.onChange(value)}
                      options={quantity_of_options}
                      placeholder="Selecione uma opção"
                    />
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

export default SetTemplateButton;