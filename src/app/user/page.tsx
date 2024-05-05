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
import { Filter } from "@/types/firebase";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { instruments } from "@/types/forms";
import { OptionCard, Content } from "@/components/OptionCard";

//Resolve o problema de cache após atualização
export const dynamic = "force-dynamic";
export const revalidate = 0;

const EvaluationsCards = async () => {
  const session: any = await getServerSession(authOptions);

  const filter: Filter[] = [
    {
        field: "users",
        operation: "array-contains",
        value: session?.user.uid!
    }
  ];
  const data = await search("evaluation", filter);

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

  const transformedContent: Content[] = evaluations.map(evaluation => ({
    title: evaluation.identification,
    description: `${instruments.find((instrument) => instrument.value === evaluation.instrument)?.label} - ${evaluation.method}`,
    href: `/user/evaluations/fill?evaluation=${evaluation.uid}`
  }));

  return (
    <>
      {evaluations.length ? (
        transformedContent.map((content, index) => (
          <OptionCard key={index} content={content} />
        ))
      ) : <p>Não há avaliações disponíveis</p>}
    </>
  );
};


const User = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <EvaluationsCards/>
    </div>
  )
}

export default User;
