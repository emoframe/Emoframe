import React from 'react'

import dynamic from 'next/dynamic';

import { Label } from '@/components/ui/label'
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
} from '@/components/ui/table';

import { 
    formatFormDataToChart, 
    getKeysFromInterface
} from '@/lib/utils';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export interface SusViewProps {
    data: Object,
}

const SusView = ({ data } : SusViewProps) => {
    const SusInterface = getKeysFromInterface('sus');
    const SusData = formatFormDataToChart(data, SusInterface).arrayData

    console.log('Array Data')
    console.log(SusData)

    const solutionPontuation = SusData.map((data) => Number(data[1])).map((points, index) => {
        if(index % 2 === 0) return points - 1
        else return 5 - points
    }).reduce((acc, val) => acc + val, 0) * 2.5

    // console.log(SusData.arrayData.map((data) => data[1]).filter(data => typeof data !== 'string'))

    const categorias = {
        ptbr: ['Frequência de uso', 'Complexidade', 'Facilidade', 'Necessidade de Ajuda', 'Integrabilidade', 'Inconsistências', 'Fácil Aprender', 'Sist. Atrapalhado', 'Confiança', 'Sistema Complexo']
    }

    const config = {
        options: {
          markers: {
            size: 7
          },
          chart: {
            id: 'basic-bar'
          },
          xaxis: {
            labels: {
              show: true,
            },
            categories: categorias.ptbr,
            tickPlacement: 'on',
          },
          yaxis: {
            min: 0,
            max: 6,
          }
        },
        series: [
          {
            name: 'evaluation',
            data: SusData.map((data) => Number(data[1]))
          }
        ]
    }

    return (
        <>
            <div className='self-center my-5'>
                <Label className={"text-center text-[30px] text-slate-800 rounded-md m-5 px-5 py-4 " + (
                solutionPontuation > 90 ? 'bg-blue-500'   : 
                solutionPontuation > 80 ? 'bg-green-900'  :
                solutionPontuation > 70 ? 'bg-green-300'  :
                solutionPontuation > 60 ? 'bg-yellow-500' :'bg-red-500'
                ) + 
                ' shadow-slate-400 shadow-[2.0px_4.0px_4.0px]'}>SUS Score: {solutionPontuation}</Label>
            </div>
            <div className="self-center my-4">
                <Label className="text-[30px]"> Interpretação da Pontuação SUS </Label>
            </div>
            <div className="border-[5px] rounded-md border-[--primary-foreground]">
                <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-[20px]">Pontuação</TableHead>
                        <TableHead className="text-[20px]">Situação</TableHead>
                        <TableHead className="text-[20px]">Cor Associada</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className='self-center'>
                    <TableRow>
                        <TableCell className="text-[20px]">Maior que 90</TableCell>
                        <TableCell className="text-[20px]">Melhor usabilidade possível</TableCell>
                        <TableCell className="flex text-[20px]">
                            <div className='w-5 h-5 mx-1 bg-blue-500 rounded-md'></div>
                            Azul  
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="text-[20px]">80 - 90</TableCell>
                        <TableCell className="text-[20px]">Excelente</TableCell>
                        <TableCell className="flex text-[20px]">
                            <div className='w-5 h-5 mx-1 bg-green-900 rounded-md'></div>
                            Verde Escuro  
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="text-[20px]">70 - 80</TableCell>
                        <TableCell className="text-[20px]">Bom</TableCell>
                        <TableCell className="flex text-[20px]">
                            <div className='w-5 h-5 mx-1 bg-green-300 rounded-md'></div>
                            Verde Claro  
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="text-[20px]">60 - 70</TableCell>
                        <TableCell className="text-[20px]">Ok</TableCell>
                        <TableCell className="flex text-[20px]">
                            <div className='w-5 h-5 mx-1 bg-yellow-500 rounded-md'></div>
                            Amarelo  
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="text-[20px]">Menor que 60</TableCell>
                        <TableCell className="text-[20px]">Inaceitável</TableCell>
                        <TableCell className="flex text-[20px]">
                            <div className='w-5 h-5 mx-1 bg-red-500 rounded-md'></div>
                            Vermelho  
                        </TableCell>
                    </TableRow>
                </TableBody>
                </Table>
            </div>
            <div className="w-full my-2 self-center">
                {
                    config !== undefined && typeof window !== undefined && 
                    <Chart
                    options={config.options}
                    series={config.series}
                    type="line"
                    width={"100%"}
                    height={400}
                    /> 
                }
            </div>
        </>
    )
}

export default SusView

