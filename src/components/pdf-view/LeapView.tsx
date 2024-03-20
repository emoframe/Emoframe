import React from 'react'

import dynamic from 'next/dynamic';

import { 
    formatFormDataToChart, 
    getKeysFromInterface 
} from '@/lib/utils';
import { Label } from '../ui/label';

import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
  TableHead,
} from '@/components/ui/table';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });


export interface LeapViewProps {
    data: Object,
}


const LeapView = ({ data } : LeapViewProps) => {
    
    const LeapInterface = getKeysFromInterface('leap');
    const LeapData = formatFormDataToChart(data, LeapInterface).arrayData.filter(data => typeof data[1] !== 'string')    

    const LeapNumberData = LeapData.map((data) => data[1])

    console.log(LeapNumberData.reduce((acc, val) => acc + val, 0))
    const sectionPoints = [
      Math.round(LeapNumberData.slice(0, 8).reduce((acc, val) => acc + Number(val), 0) /(8*5) * 100) / 100,
      Math.round(LeapNumberData.slice(8, 18).reduce((acc, val) => acc + Number(val), 0) /((18-8)*5 )* 100) / 100,
      Math.round(LeapNumberData.slice(18, 22).reduce((acc, val) => acc + Number(val), 0) /((22-18)*5) * 100) / 100,
      Math.round(LeapNumberData.slice(22, 25).reduce((acc, val) => acc + Number(val), 0) /((25-22)*5) * 100) / 100,
      Math.round(LeapNumberData.slice(25, 29).reduce((acc, val) => acc + Number(val), 0) /((29-25)*5) * 100) / 100,
      Math.round(LeapNumberData.slice(29, 33).reduce((acc, val) => acc + Number(val), 0) /((33-29)*5) * 100) / 100,
      Math.round(LeapNumberData.slice(33, 35).reduce((acc, val) => acc + Number(val), 0) /((35-33)*5) * 100) / 100,
      Math.round(LeapNumberData.slice(35, 37).reduce((acc, val) => acc + Number(val), 0) /((37-35)*5) * 100) / 100,
      Math.round(LeapNumberData.slice(37, 40).reduce((acc, val) => acc + Number(val), 0) /((40-37)*5) * 100) / 100,
    ]

    // const LeapPoints = LeapData.slice(0, 8).map((data) => data[1]).reduce((acc, val) => acc + Number(val), 0) /8*5
    console.log(sectionPoints)


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
            categories: ['F1', 'F2', 'F3', 'F4' ,'F5' ,'F6' ,'F7' ,'F8' ,'F9'],
            tickPlacement: 'on',
          },
          yaxis: {
            min: 0,
            max: sectionPoints.reduce((a, b) => Math.max(a, b), -Infinity) + 0.25, 
          }
        },
        series: [
          {
            name: 'evaluation',
            data: sectionPoints
          }
        ]
    }
    
    return (
        <>
        <div className="border-2 rounded-md border-slate-600">
                <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Fatores</TableHead>
                        <TableHead>Questões</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className='self-center'>
                    <TableRow>
                        <TableCell>Fator 1</TableCell>
                        <TableCell className="flex flex-col">
                          <TableCell>Estou com medo.</TableCell>
                          <TableCell>Estou assustado(a).</TableCell>
                          <TableCell>Estou com vergonha.</TableCell>
                          <TableCell>Estou sem graça.</TableCell>
                          <TableCell>Sinto-me culpado.</TableCell>
                          <TableCell>Sinto-me triste.</TableCell>
                          <TableCell>Sinto-me humilhado(a).</TableCell>
                          <TableCell>Tenho Pena de alguém.</TableCell>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Fator 1</TableCell>
                        <TableCell className="flex flex-col">
                          <TableCell>Sinto-me surpreso(a).</TableCell>
                          <TableCell>Estou alegre.</TableCell>
                          <TableCell>Sinto-me orgulhoso(a).</TableCell>
                          <TableCell>Estou aliviado(a).</TableCell>
                          <TableCell>Estou com esperança.</TableCell>
                          <TableCell>Sinto-me interessado(a).</TableCell>
                          <TableCell>Sinto-me calmo(a).</TableCell>
                          <TableCell>Acho algo engraçado.</TableCell>
                          <TableCell>Sinto uma admi.</TableCell>
                        </TableCell>
                    </TableRow>
                </TableBody>
                </Table>
            </div>
          <Label className="self-center text-3xl">Pontuação</Label>
            <div className="my-2">
                {
                    typeof window !== undefined && 
                    <Chart
                    options={config.options}
                    series={config.series}
                    type="bar"
                    width={"100%"}
                    height={400}
                    /> 
                }
            </div>
        </>
    )
}

export default LeapView;

