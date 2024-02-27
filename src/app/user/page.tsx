import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { search } from "@/lib/firebase";
import { Search } from "@/types/firebase";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { instruments } from "@/types/forms";

//Resolve o problema de cache após atualização
export const dynamic = "force-dynamic";
export const revalidate = 0;

const User = async () => {
  const session: any = await getServerSession(authOptions);

  const parameters: Search = {
    col: "evaluation",
    field: "users",
    operation: "array-contains",
    value: session?.user.uid!,
  };
  const data = await search(parameters);

  const evaluations = data
    .filter((evaluation) => (
        evaluation.date == new Date().toLocaleDateString("pt-BR") &&
        !(evaluation.answered && evaluation?.answered.includes(session?.user.uid!))
    ))
    .sort((a, b) =>
      a.identification
        .toLowerCase()
        .localeCompare(b.identification.toLowerCase())
    );

  return (
    <>
      {evaluations.length ? (
        <div className="grid grid-flow-row gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {evaluations.map((evaluation) => {
            return (
              <Card
                key={evaluation.uid}
                className="rounded shadow-2xl shadow-shadow_color bg-primary-background border-none duration-300 hover:-translate-y-3"
              >
                <CardHeader>
                  <CardTitle>{evaluation.identification}</CardTitle>
                  <CardDescription>{`${instruments.find((instrument) => instrument.value === evaluation.instrument)?.label} - ${evaluation.method}`}</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Link
                    className={buttonVariants({ variant: "default" })}
                    href={`/user/evaluations/fill?evaluation=${evaluation.uid}`}
                    replace
                  >
                    Acessar
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <p>Não há avaliações disponíveis</p>
      )}
    </>
  );
};

export default User;
