'use client';
import { useTransition } from "react";
import { Loader2, BookCheck  } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const PublishTemplateButton = ({ id }: { id: string }) => {
  const [loading, startTransition] = useTransition();
  const router = useRouter();
  const toast = useToast();

   const publishTemplate = async () => {
    try {
      //TODO: Conexão com o banco
      toast({
        title: "Sucesso",
        description: "Seu template agora está disponível para ser usado em avaliações",
      });
      router.refresh();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu algum problema",
        variant: "destructive",
      });
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400">
          <BookCheck  className="h-4 w-4" />
          Publicar
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa modificação não pode ser desfeita. Após publicação um template não pode ser modificado<br />
            <br />
            <span className="font-medium">
             Ao publicar este template, você será capaz de usá-lo como instrumento em avaliações de usuários.
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              startTransition(publishTemplate);
            }}
          >
            Confirmar {loading && <Loader2 className="animate-spin" />}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default PublishTemplateButton;