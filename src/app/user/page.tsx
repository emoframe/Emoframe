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
import UserDashboard from "@/components/UserDashboard";
import FrequentQuestions from '@/components/FrequentQuestions';
import VideosTutorials from "@/components/VideoTutorials";

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

    const transformedContent: Content[] = evaluations.map(evaluation => {
        // Verifica se o instrumento da avaliação é "template"
        const isTemplate = evaluation.instrument === "template";
        const instrumentLabel = instruments.find((instrument) => instrument.value === evaluation.instrument)?.label;

        return {
            title: evaluation.identification,
            description: `${isTemplate ? `Template` : instrumentLabel} - ${evaluation.method}`,
            href: `/user/evaluations/fill?evaluation=${evaluation.uid}`
        };
    });

    return (
        <>
            {transformedContent.length ? (
                transformedContent.map((content, index) => (
                    <OptionCard key={index} content={content} />
                ))
            ) : <p>Não há avaliações disponíveis</p>}
        </>
    );
};


const User = async () => {
    const session: any = await getServerSession(authOptions);

    // wip
    const dashboardData = {lastEvaluations: [], lastResults: []};
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Boas vindas, {session?.user.name}!</h1>
            <UserDashboard
                lastEvaluations={dashboardData.lastEvaluations}
                lastResults={dashboardData.lastResults}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <VideosTutorials thumbnail="" title="Saiba como responder a uma avaliação" />
                <FrequentQuestions />
            </div>
            <div className="bg-background p-6 rounded-lg shadow-lg mt-6">
                <h2 className="text-lg font-bold mb-4">O que é o EMOFRAME?</h2>
                <p className="text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras tempus justo justo, non semper eros finibus non. In id nisi sed turpis facilisis commodo ut nec lacus. In lobortis justo massa, at tempus dolor hendrerit ac. Ut commodo condimentum commodo. Morbi quis pharetra enim. Aenean nec vehicula risus. Nulla sollicitudin, metus et convallis ornare, ligula libero porttitor diam, vel ultrices ipsum mauris eget massa.
                </p>
            </div>
        </div>
    )
}

export default User;
