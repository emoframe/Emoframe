'use client';

import React from 'react'

import { Label } from '@/components/ui/label';
import { createQueryString, downloadCSV, getKeysFromInterface } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { getById, getFormById, getAllUsers, getAllForms } from '@/lib/firebase';
import { generatePDF } from '@/lib/utils';

import { formatData } from '@/lib/utils';

import { formatFormDataToChart } from '@/lib/utils';

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
import { get } from 'http';
  

interface SusResultViewFormProps {
    userId: string;
    formId: string;
}

const SusResultViewForm = ({ userId, formId }: SusResultViewFormProps) => {  
    const [user, setUser] = React.useState<any>({});
    const [form, setForm] = React.useState<any>({});
    const [formData, setFormData] = React.useState<any>([]);
    const [dataLoaded, setDataLoaded] = React.useState<number>(0);
    
    const SusInterface = getKeysFromInterface('Sus')

    React.useEffect(() => {
        getById(userId, 'user').then((data) => {
            setUser(data)
            setDataLoaded((prev) => prev + 1)
        });
       getFormById(userId, formId).then((data) => {
            console.log(formatFormDataToChart(data!, SusInterface, {range_red: [0,2], range_yellow: [3,3], range_green: [4,5]}))
            setForm(data!)
            setFormData(formatFormDataToChart(data!, SusInterface, {range_red: [0,2], range_yellow: [3,3], range_green: [4,5]}).arrayData)
            setDataLoaded((prev) => prev + 1)
       });
    }, [userId, formId])

    const solution = form!.solution_evaluation
    const solutionPontuation = formData!.map((form) => {
        if (typeof form[1] === 'number') return form[1]
    }).slice(1).map((points, index) => {
        // console.log(points)
        if(index % 2 === 0) return points - 1
        else return 5 - points
    }).reduce((acc, val) => acc + val, 0) * 2.5

    
    const options = {
        bar: { groupWidth: '95%' },
        legend: { position: 'none' },
        orientation: 'horizontal',
    }

    const { push } = useRouter()

    const handleExportPDF = () => {
        push('/specialist/results/results-view/pdf-view' + '?' + createQueryString('uid', userId) + '&' + createQueryString('fid', formId))
    }


    if(formData.length) console.log(formData)

    if(dataLoaded < 2) return null
    return (
        <>
            <div id='pdf-root' className="flex flex-col w-full justify-center mb-4 border-4 border-solid rounded-md border-blue">
                <Label className="self-center p-3 text-center text-[30px] text-slate-800">Resultados do formulário SUS do Paciente {user!.name}</Label>
                <Label className="self-center p-3 text-center text-[30px] text-slate-800">Solução Avaliada: {solution}</Label>
                
                
                <Label className="self-center p-3 text-center text-[25px] text-slate-800">Interpretação do Resultado Sus</Label>
                <div className='self-center w-3/4 border-4 rounded-md'>
               
                </div>
                <div className="justify-center self-center">
                    <Charts chartType="BarChart" data={formData} options={options} width={600} height={600} />
                </div>
            </div>
            <div className="flex flex-row w-full px-3 justify-between">
                <Button size="default" onClick={() => {downloadCSV(formData!!)}}>Exportar Como CSV</Button>
                <Button size="default" onClick={handleExportPDF}>Exportar como PDF</Button>
                {/* <Button size="default" onClick={() => {generatePDF('pdf-root', 'print.pdf')}}>Exportar como PDF</Button> */}
                <Button size="default" onClick={() => window.print()}>Imprimir</Button>
            </div>
        </>
    )
}

export default SusResultViewForm