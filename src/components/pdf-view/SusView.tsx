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

    
    const solutionPontuation = SusData.map((data) => Number(data[1])).map((points, index) => {
        if(index % 2 === 0) return points - 1
        else return 5 - points
    }).reduce((acc, val) => acc + val, 0) * 2.5

    // console.log(SusData.arrayData.map((data) => data[1]).filter(data => typeof data !== 'string'))

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
            categories: SusData.map((data) => data[0]),
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
                <Label className={"text-center text-[30px] text-slate-800 rounded-md m-5 " + (
                solutionPontuation > 90 ? 'bg-blue-500'   : 
                solutionPontuation > 80 ? 'bg-green-900'  :
                solutionPontuation > 70 ? 'bg-green-300'  :
                solutionPontuation > 60 ? 'bg-yellow-500' :'bg-red-500'
                )}>SUS Score: {solutionPontuation}</Label>
            </div>
            <div className="border-2 rounded-md border-slate-600">
                <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Pontuação</TableHead>
                        <TableHead>Situação</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className='self-center'>
                    <TableRow>
                        <TableCell>Maior que 90</TableCell>
                        <TableCell>Melhor usabilidade possível</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>80 - 90</TableCell>
                        <TableCell>Excelente</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>70 - 80</TableCell>
                        <TableCell>Bom</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>60 - 70</TableCell>
                        <TableCell>Ok</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Menor que 60</TableCell>
                        <TableCell>Inaceitável</TableCell>
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

