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

export interface GdsViewProps {
    data: Object,
}

interface TableRows { 
    label: string,
    component: React.ReactNode,
}

const GdsView = ({ data } : GdsViewProps) => {
    const GdsInterface = getKeysFromInterface('gds');
    const GdsData = formatFormDataToChart(data, GdsInterface).arrayData

    const solutionPontuation = GdsData.map((data) => Number(data[1])).reduce((acc, val) => acc + val, 0)

    
    // const solutionPontuation = GdsData.map((data) => Number(data[1])).map((points, index) => {
    //     if(index % 2 === 0) return points - 1
    //     else return 5 - points
    // }).reduce((acc, val) => acc + val, 0) * 2.5

    // console.log(GdsData.arrayData.map((data) => data[1]).filter(data => typeof data !== 'string'))

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
            categories: GdsData.map((data) => data[0]),
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
            data: GdsData.map((data) => Number(data[1]))
          }
        ]
    }


    const scoreInterpretationTable: TableRows[][] = [
        [
            {
                label:'score',
                component: <TableCell> 1 - 5 </TableCell>,
            },
            {
                label: 'description',
                component: <TableCell> Baixo risco a indicativo de depressão. </TableCell>
            }
        ],
        [
            {
                label:'score',
                component: <TableCell> 6 - 10 </TableCell>,
            },
            {
                label: 'description',
                component: <TableCell> Risco moderado a indicativo de depressão. </TableCell>
            }
        ],
        [
            {
                label:'score',
                component: <TableCell> 11 - 15 </TableCell>,
            },
            {
                label: 'description',
                component: <TableCell> Forte risco a indicativo de depressão </TableCell>
            }
        ],
    ]



    return (
        <>
            <div className='self-center my-5'>
                <Label className={"text-center text-[30px] text-slate-800 rounded-md m-5 px-5 py-4 " + (
                solutionPontuation > 11 ? 'bg-green-500'  :
                solutionPontuation > 6  ? 'bg-yellow-500' : 'bg-red-500'
                ) + 
                ' shadow-slate-400 shadow-[4.0px_8.0px_8.0px]'}>GDS Score: {solutionPontuation}</Label>
            </div>
            <div>

            </div>
            <div className="border-4 rounded-md border-[--primary-foreground]">
                <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Score</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className='self-center'>
                    {
                        scoreInterpretationTable.map((row, index) => (
                            <TableRow key={index}>
                                {
                                    row.map((cell) => (
                                        cell.component
                                    ))
                                }
                            </TableRow>
                        ))
                    }
                </TableBody>
                </Table>
            </div>
        </>
    )
}

export default GdsView

