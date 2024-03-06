'use client';

import React from 'react'

import { Label } from '@/components/ui/label';
import { downloadCSV, formatFormDataToChart } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { getById, getFormById, getAllUsers, getAllForms } from '@/lib/firebase';
import { generatePDF } from '@/lib/utils';
import { createQueryString } from '@/lib/utils';

import { useRouter } from 'next/navigation';


import Charts from '@/components/chart/Charts';

import {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
} from '@/components/ui/table';
  

interface SamResultViewFormProps {
    userId: string;
    formId: string;
}

const SamResultViewForm = ({ userId, formId }: SamResultViewFormProps) => {  
    const [user, setUser] = React.useState<any>({});
    const [form, setForm] = React.useState<any>({});
    const [formData, setFormData] = React.useState<any>([]);
    const [dataLoaded, setDataLoaded] = React.useState<number>(0);

    React.useEffect(() => {
        getById(userId, 'user').then((data) => {
            setUser(data)
            setDataLoaded((prev) => prev + 1)
        });
       getFormById(userId, formId).then((data) => {
            console.log(formatFormDataToChart(data!, 'Sam'))
            setForm(data!)
            setFormData(formatFormDataToChart(data!, 'Sam').arrayData)
            setDataLoaded((prev) => prev + 1)
       });
    }, [userId, formId])

    const applicationDate = form!.application_date

    const { push } = useRouter();

    const options = {
        bar: { groupWidth: '95%' },
        legend: { position: 'none' },
        orientation: 'horizontal',
    }

    const handleExportPDF = () => {
        push('/specialist/results/results-view/pdf-view' + '?' + createQueryString('uid', userId) + '&' + createQueryString('fid', formId))
    }

    if(dataLoaded < 2) return null
    return (
        <>
            <div id='pdf-root' className="flex flex-col w-full justify-center mb-4 border-4 border-solid rounded-md border-blue">
                <Label className="self-center p-3 text-center text-[30px] text-slate-800">Resultados do formulário SAM do Paciente {user!.name}</Label>
                <Label className="self-center p-3 text-center text-[30px] text-slate-800">Avaliação aplicada em: {applicationDate}</Label>                
                <div className="justify-center self-center">
                    <Charts chartType="BarChart" data={formData} options={options} width={600} height={600} />
                </div>
            </div>
            <div className="flex flex-row w-full px-3 justify-between">
                <Button size="default" onClick={() => {downloadCSV(formData!!)}}>Exportar Como CSV</Button>
                <Button size="default" onClick={handleExportPDF}>Exportar como PDF</Button>
                <Button size="default" onClick={() => window.print()}>Imprimir</Button>
            </div>
        </>
    )
}

export default SamResultViewForm