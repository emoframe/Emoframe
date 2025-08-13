'use client';

import React from 'react';
import Charts from '@/components/chart/Charts';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Answer, Page, PageFeedback } from '@/types/forms';
import { erf } from 'mathjs';
import { PageUser } from '@/types/users';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { cn, getAnswerScores, getAnswerXlsx } from '@/lib/utils';
import { Button } from '../ui/button';
import { FileDown, FileSpreadsheet } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Textarea } from '../ui/textarea';
import { getLocalTimeZone, parseDate } from '@internationalized/date';
import { DateField, DatePicker } from '../ui/date-picker';
import { Input } from '../ui/input';
import { createPageFeedback } from '@/lib/firebase';
import Link from 'next/link';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const ActionsAndServicesSchema = z.object({
    date: z.date({
        required_error: "Selecione uma data",
        invalid_type_error: "Data inválida",
    }),
    actions: z.string(),
    services: z.string(),
});

const FormSchema = z.object({
    otherRequirements: z.string().optional(),
    gerontologistEvaluation: z.string(),
    problems: z.string(),
    objectives: z.string(),
    actionsAndServices: z.string(),
    actionsAndServicesCoordination: ActionsAndServicesSchema.array(),
    reevaluation: ActionsAndServicesSchema.array(),
});

const PageResult = ({ user, data, feedback }: {
    user: PageUser,
    data: Page & Answer,
    feedback: PageFeedback,
}) => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: feedback,
    });

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        await createPageFeedback({evaluationId: data.uid ?? '', ...values});
        feedback.evaluationId = data.uid ?? '';
    }

    const normalizeScore = (score: number) => Math.min(score, 100);
    
    const {
        cognitiveScore,
        ageScore,
        depressionScore,
        sensorialScore,
        functionalScore,
        malnutritionScore,
        cardiovascularScore,
        medicineScore,
        supportScore,
        violenceScore,
        environmentScore,
        fallsScore,
        psychologicalScore,
        biologicalScore,
        socioenvironmentalScore,
        transversalScore,
        totalScore,
    } = getAnswerScores(data);

    const dangerClassification = totalScore >= 75 ? 'Baixo' : totalScore >= 45 ? 'Moderado' : 'Alto';
    const dangerClassificationColor = totalScore >= 75 ? 'bg-[#198754]' : totalScore >= 45 ? 'bg-[#ffc107]' : 'bg-[#dc3545]';

    const dimensionsChartData = {
        labels: ['Psicológica', 'Biológica', 'Social', 'Quedas'],
        datasets: [{
            label: '% de contribuição de cada dimensão',
            data: [psychologicalScore * 5.3, biologicalScore * 2.8, socioenvironmentalScore * 3.1, transversalScore * 6.3].map(normalizeScore),
            borderWidth: 3,
            backgroundColor: 'rgba(110, 160, 90, 0.2)',
            borderColor: 'rgba(110, 160, 90, 0.5)',
        }],
    };

    const domainsChartData = {
        labels: ['Deficit sensorial', 'Incapacidade funcional', 'Desnutrição', 'Doenças Cardiovasculares', 'Uso Inadequado de medicamentos', 'Atitudes negativas', 'Depressão', 'Déficit cognitivo', 'Baixo suporte social', 'Problemas ambientais', 'Violência', 'Quedas'],
        datasets: [{
            label: '% de contribuição de cada domínio',
            data: [sensorialScore * 20, functionalScore * 16.7, malnutritionScore * 14.3, cardiovascularScore * 11.1, medicineScore * 11.1, ageScore * 12.5, depressionScore * 16.7, cognitiveScore * 16.7, supportScore * 12.5, environmentScore * 6.3, violenceScore * 12.5, fallsScore * 6.3].map(normalizeScore),
            borderWidth: 3,
            backgroundColor: 'rgba(110, 160, 90, 0.2)',
            borderColor: 'rgba(110, 160, 90, 0.5)',
        }]
    }

    const chartOptions = {
        scales: {
            r: {
                suggestedMax: 100,
            }
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-8 p-8 max-w-screen-lg print:!px-6 print:!pb-0">
                    <h1 className="font-bold text-4xl self-center">Resultado PAGe</h1>
                    <div className='print:hidden relative -top-[4.5rem] self-end'>
                        <Button variant="icon" size="icon" className='group'>
                            <FileSpreadsheet size="20" onClick={() => getAnswerXlsx(data)}/>
                            <span className='invisible absolute top-full rounded-md px-2 py-1 mt-2 bg-primary-foreground text-sm opacity-20 -translate-y-1 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-y-0'>Excel</span>
                        </Button>
                        { feedback.evaluationId && <Button variant="icon" size="icon" onClick={window.print} className='group'>
                            <FileDown size="20"/>
                            <span className='invisible absolute top-full rounded-md px-2 py-1 mt-2 bg-primary-foreground text-sm opacity-20 -translate-y-1 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-y-0'>PDF</span>
                        </Button>}
                    </div>
                    <div className="flex flex-col gap-4">
                        <h2 className="text-2xl font-bold">Informações do Usuário</h2>
                        <p><b>Nome do Usuário:</b> {user.name} </p>
                        <p><b>Data de Nascimento (idade):</b> {user.birthday?.toLocaleDateString()} ({user.age} anos)</p>
                        <p><b>Telefone:</b> {user.phone}</p>
                        <p><b>Data da Avaliação:</b> {data.datetime?.toString()}</p>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex flex-col gap-4 items-center">
                        <h2 className="text-2xl font-bold">ESCORES</h2>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-bold" rowSpan={4}>PONTUAÇÃO POR DIMENSÃO</TableCell>
                                    <TableCell className="font-bold">ASPECTOS PSICOLÓGICOS (MÁXIMA = 19 PONTOS)</TableCell>
                                    <TableCell>{psychologicalScore}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-bold">ASPECTOS BIOLÓGICOS (MÁXIMA = 33 PONTOS)</TableCell>
                                    <TableCell>{biologicalScore}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-bold">ASPECTOS SOCIOAMBIENTAIS (MÁXIMA = 31 PONTOS)</TableCell>
                                    <TableCell>{socioenvironmentalScore}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-bold">QUEDAS (MÁXIMA = 16 PONTOS)</TableCell>
                                    <TableCell>{transversalScore}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-bold">PONTUAÇÃO TOTAL (MÁXIMA = 99 PONTOS)</TableCell>
                                    <TableCell colSpan={2}>{totalScore}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-bold max-w-0" rowSpan={4}>CLASSIFICAÇÃO DE RISCO DE VULNERABILIDADE BIOPSICOSSOCIAL</TableCell>
                                    <TableCell className="font-bold">≥ 75 PONTOS</TableCell>
                                    <TableCell colSpan={2}>RISCO BAIXO</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-bold">74 A 45 PONTOS</TableCell>
                                    <TableCell colSpan={2}>RISCO MODERADO</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-bold">≤ 44 PONTOS</TableCell>
                                    <TableCell colSpan={2}>RISCO ALTO</TableCell>
                                </TableRow>
                                <TableRow className={dangerClassificationColor}>
                                    <TableCell className='font-bold'>Risco de Vulnerabilidade Biopsicossocial</TableCell>
                                    <TableCell colSpan={2}>{dangerClassification}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex flex-col gap-4 items-center print:mt-[500px]">
                        <h2 className="text-2xl font-bold">Mapa de Demandas</h2>
                        <Radar className='print:!w-full print:!h-auto print:!aspect-square' data={dimensionsChartData} options={chartOptions}/>
                        <Radar className='print:!w-full print:!h-auto print:!aspect-square' data={domainsChartData} options={chartOptions}/>

                        <FormField
                            control={form.control}
                            name='otherRequirements'
                            render={({ field }) => (
                                <FormItem className='w-full print:mt-10'>
                                    <FormLabel>O(a) idoso(a) apresenta outras demandas não contempladas no mapa? Se sim, especificar:</FormLabel>
                                    <FormControl>
                                        <Textarea disabled={!!feedback.evaluationId} {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Separator className="my-4 print:hidden" />

                    <div className="flex flex-col gap-4 items-center print:hidden">
                        <h2 className="text-2xl font-bold">Anotações Sobre os Blocos</h2>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-bold">Bloco</TableCell>
                                    <TableCell className="font-bold">Anotações</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Psicológico</TableCell>
                                    <TableCell>{data.psychological_note}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Biológico</TableCell>
                                    <TableCell>{data.biological_note}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Socioambiental</TableCell>
                                    <TableCell>{data.socioenvironmental_note}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Transversal</TableCell>
                                    <TableCell>{data.multidimensional_note}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>

                    <Separator className="my-4 print:hidden" />

                    <div className="flex flex-col gap-4 items-center print:hidden">
                        <h2 className="text-2xl font-bold">Investigação de Demandas</h2>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-bold">Demanda</TableCell>
                                    <TableCell className="font-bold">Aspecto</TableCell>
                                    <TableCell className="font-bold">Necessita de Investigação?</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>USO INADEQUADO DE MEDICAMENTOS</TableCell>
                                    <TableCell>Biológico</TableCell>
                                    <TableCell>{(data.medicine_result === '1') ? 'SIM' : 'NÃO'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>INCAPACIDADE FUNCIONAL</TableCell>
                                    <TableCell>Biológico</TableCell>
                                    <TableCell>{(data.functional_result === '1') ? 'SIM' : 'NÃO'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>DÉFICIT SENSORIAL</TableCell>
                                    <TableCell>Biológico</TableCell>
                                    <TableCell>{(data.sensorial_result === '1') ? 'SIM' : 'NÃO'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>DOENÇAS CARDIOVASCULA-RES (DCV)</TableCell>
                                    <TableCell>Biológico</TableCell>
                                    <TableCell>{(data.cardiovasculars_result === '1') ? 'SIM' : 'NÃO'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>DESNUTRIÇÃO</TableCell>
                                    <TableCell>Biológico</TableCell>
                                    <TableCell>{(data.malnutrition_result === '1') ? 'SIM' : 'NÃO'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>QUEDAS</TableCell>
                                    <TableCell>Multidimensional</TableCell>
                                    <TableCell>{(data.falls_result === '1') ? 'SIM' : 'NÃO'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>DÉFICIT COGNITIVO</TableCell>
                                    <TableCell>Psicológico</TableCell>
                                    <TableCell>{(data.cognitive_result === '1') ? 'SIM' : 'NÃO'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>DEPRESSÃO</TableCell>
                                    <TableCell>Psicológico</TableCell>
                                    <TableCell>{(data.depression_result === '1') ? 'SIM' : 'NÃO'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>ATITUDE NEGATIVA EM RELAÇÃO AO ENVELHECIMENTO</TableCell>
                                    <TableCell>Psicológico</TableCell>
                                    <TableCell>{(data.age_result === '1') ? 'SIM' : 'NÃO'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>VIOLÊNCIA</TableCell>
                                    <TableCell>Social</TableCell>
                                    <TableCell>{(data.violence_result === '1') ? 'SIM' : 'NÃO'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>PROBLEMAS AMBIENTAIS</TableCell>
                                    <TableCell>Social</TableCell>
                                    <TableCell>{(data.environment_result === '1') ? 'SIM' : 'NÃO'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>BAIXO SUPORTE SOCIAL</TableCell>
                                    <TableCell>Social</TableCell>
                                    <TableCell>{(data.support_result === '1') ? 'SIM' : 'NÃO'}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>

                    <Separator className="my-4" />

                    <div className="flex flex-col gap-4 items-center">
                        <h2 className="text-2xl font-bold">AVALIAÇÃO DO GERONTÓLOGO</h2>
                        <FormField
                            control={form.control}
                            name='gerontologistEvaluation'
                            render={({ field }) => (
                                <FormItem className='w-full'>
                                    <FormControl>
                                        <Textarea disabled={!!feedback.evaluationId} {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Separator className="my-4 print:hidden" />

                    <div className="flex flex-col gap-4 items-center print:hidden">
                        <h2 className="text-2xl font-bold">PLANEJAMENTO DAS AÇÕES</h2>
                        <FormField
                            control={form.control}
                            name='problems'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>1. Identificação das Demandas/Problemas (listes as demandas/problemas identificadas na avaliação de acordo com a ordem de prioridade. Lembre-se de verificar se as prioridades da equipe são compatíveis com as prioridades do idoso/família).</FormLabel>
                                    <FormControl>
                                        <Textarea disabled={!!feedback.evaluationId} {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='objectives'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>2. Estabelecimento das Metas (estipule as metas a curto, médio e longo prazos para cada problema ou demanda identificada no item anterior).</FormLabel>
                                    <FormControl>
                                        <Textarea disabled={!!feedback.evaluationId} {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='actionsAndServices'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>3. Organização das Ações e dos Serviços (especifique as características das ações e dos serviços necessários para que a pessoa idosa alcance as metas estipuladas no item anterior – exemplo: número de visitas domiciliares, agendamento de consultas, intervenções, tratamentos, encaminhamentos, etc.).</FormLabel>
                                    <FormControl>
                                        <Textarea disabled={!!feedback.evaluationId} {...field}/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Separator className="my-4 print:hidden" />

                    <div className="flex flex-col gap-4 items-center print:hidden">
                        <h2 className="text-2xl font-bold">COORDENAÇÃO E IMPLEMENTAÇÃO DAS AÇÕES</h2>
                        <p>A coordenação e a implementação das ações corresponde à fase de execução do plano de gestão. Lembre-se que tanto o custo como a efetividade das ações devem ser sempre levados em consideração. A implementação das ações, sempre que possível, deve respeitar os desejos e possibilidades do idoso e de sua família. A gestão do caso deve incluir, de forma organizada e coordenada, todos os serviços/ações/profissionais envolvidos na atenção à pessoa idosa. Certifique-se que a instituição/equipamento, quando for o caso, tem estrutura suficiente para o desenvolvimento das ações.</p>
                        <div className='flex flex-col gap-4 w-full'>
                            {Array(6).fill(0).map((_, index) => (
                                <div className='flex flex-row gap-4 w-full justify-between'>
                                    <FormField
                                        control={form.control}
                                        name={`actionsAndServicesCoordination.${index}.date`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Data</FormLabel>
                                                <FormControl>
                                                    <DatePicker
                                                        isDisabled={!!feedback.evaluationId}
                                                        onChange={(value) => field.onChange(value.toDate(getLocalTimeZone()))}
                                                        value={parseDate(field.value.toISOString().split('T')[0])}
                                                    >
                                                        <DateField />
                                                    </DatePicker>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`actionsAndServicesCoordination.${index}.actions`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Ação</FormLabel>
                                                <FormControl>
                                                    <Input disabled={!!feedback.evaluationId} {...field}/>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`actionsAndServicesCoordination.${index}.services`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Serviços</FormLabel>
                                                <FormControl>
                                                    <Input disabled={!!feedback.evaluationId} {...field}/>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <Separator className="my-4 print:hidden" />

                    <div className="flex flex-col gap-4 items-center print:hidden">
                        <h2 className="text-2xl font-bold">CONTROLE E REAVALIAÇÃO</h2>
                        <p>Para garantir a execução e a implementação das ações, é importante monitorar o andamento do plano de atenção. O monitoramento contínuo permite a identificação de novas demandas e, consequentemente, a realização de ajustes/modificações necessários para o sucesso do plano de atenção. Sendo assim, avaliar o resultado da implementação de cada ação permite que o Gerontólogo realize a adequação do planejamento e estabeleça novas metas/objetivos.</p>
                        <div className='flex flex-col gap-4 w-full'>
                            {Array(6).fill(0).map((_, index) => (
                                <div className='flex flex-row gap-4 w-full justify-between'>
                                    <FormField
                                        control={form.control}
                                        name={`reevaluation.${index}.date`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Data</FormLabel>
                                                <FormControl>
                                                    <DatePicker
                                                        isDisabled={!!feedback.evaluationId}
                                                        onChange={(value) => field.onChange(value.toDate(getLocalTimeZone()))}
                                                        value={parseDate(field.value.toISOString().split('T')[0])}
                                                    >
                                                        <DateField />
                                                    </DatePicker>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`reevaluation.${index}.actions`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Ação/Resultado</FormLabel>
                                                <FormControl>
                                                    <Input disabled={!!feedback.evaluationId} {...field}/>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`reevaluation.${index}.services`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Adequação/Metas/Ações</FormLabel>
                                                <FormControl>
                                                    <Input disabled={!!feedback.evaluationId} {...field}/>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='flex flex-row gap-4'>
                    {!feedback.evaluationId && <Button className='w-full mt-6 print:hidden' type='submit'>
                        Salvar
                    </Button>}
                    <Link className='w-full mt-6 print:hidden' href="/specialist/services/page/results/answer/details"><Button className='w-full mt-6 print:hidden'>
                        Ver Respostas
                    </Button></Link>
                </div>
            </form>
        </Form>
    );
};

export default PageResult;