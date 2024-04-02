import React from 'react'

import dynamic from 'next/dynamic';

import { 
    formatFormDataToChart, 
    getKeysFromInterface 
} from '@/lib/utils';


import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
  TableHead,
} from '@/components/ui/table';

import { Label } from '@/components/ui/label';


const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export interface LeapViewProps {
    data: Object,
}


interface TableRows {
  label: string,
  component: React.ReactNode,
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

    console.log(sectionPoints)
    
    const tableReferenceValues: TableRows[][] = [
      [
        {label: 'Baixo',      component: <TableCell className="text-[20px]">Baixo</TableCell>},
        {label: 'ValorBaixo', component: <TableCell className="text-[20px]">Entre 0 e 0.3</TableCell>},
      ],
      [
        {label: 'Médio',      component: <TableCell className="text-[20px]">Médio</TableCell>},
        {label: 'ValorMedio', component: <TableCell className="text-[20px]"> Entre 0.3 e 0.7 </TableCell>},
      ],
      [
        {label: 'Alto',      component: <TableCell className="text-[20px]">Alto</TableCell>},
        {label: 'ValorAlto', component: <TableCell className="text-[20px]"> Acima de 0.7 </TableCell>},
      ]
    ]

    const tableLeapResult: TableRows[][] = [
      [
        {label: '#',             component: <TableCell className="text-[20px]">I</TableCell> },
        {label: 'ValorPresenca', component: <TableCell className="text-[20px]"> {sectionPoints[0]} </TableCell> },
        {label: 'NivelPresenca', component: <TableCell className="text-[20px]"> {sectionPoints[0] > 0.7 ? 'Alto' : sectionPoints[0] > 0.3 ? 'Médio' : 'Baixo'} </TableCell> },
      ],
      [
        {label: '#',             component: <TableCell className="text-[20px]">II</TableCell> },
        {label: 'ValorPresenca', component: <TableCell className="text-[20px]"> {sectionPoints[1]} </TableCell> },
        {label: 'NivelPresenca', component: <TableCell className="text-[20px]"> {sectionPoints[1] > 0.7 ? 'Alto' : sectionPoints[1] > 0.3 ? 'Médio' : 'Baixo'} </TableCell> },
      ],
      [
        {label: '#',             component: <TableCell className="text-[20px]">III</TableCell> },
        {label: 'ValorPresenca', component: <TableCell className="text-[20px]"> {sectionPoints[2]} </TableCell> },
        {label: 'NivelPresenca', component: <TableCell className="text-[20px]"> {sectionPoints[2] > 0.7 ? 'Alto' : sectionPoints[2] > 0.3 ? 'Médio' : 'Baixo'} </TableCell> },
      ],
      [
        {label: '#',             component: <TableCell className="text-[20px]">IV</TableCell> },
        {label: 'ValorPresenca', component: <TableCell className="text-[20px]"> {sectionPoints[3]} </TableCell> },
        {label: 'NivelPresenca', component: <TableCell className="text-[20px]"> {sectionPoints[3] > 0.7 ? 'Alto' : sectionPoints[3] > 0.3 ? 'Médio' : 'Baixo'} </TableCell> },
      ],
      [
        {label: '#',             component: <TableCell className="text-[20px]">V</TableCell> },
        {label: 'ValorPresenca', component: <TableCell className="text-[20px]"> {sectionPoints[4]} </TableCell> },
        {label: 'NivelPresenca', component: <TableCell className="text-[20px]"> {sectionPoints[4] > 0.7 ? 'Alto' : sectionPoints[4] > 0.3 ? 'Médio' : 'Baixo'} </TableCell> },
      ],
      [
        {label: '#',             component: <TableCell className="text-[20px]">VI</TableCell> },
        {label: 'ValorPresenca', component: <TableCell className="text-[20px]"> {sectionPoints[5]} </TableCell> },
        {label: 'NivelPresenca', component: <TableCell className="text-[20px]"> {sectionPoints[5] > 0.7 ? 'Alto' : sectionPoints[5] > 0.3 ? 'Médio' : 'Baixo'} </TableCell> },
      ],
      [
        {label: '#',             component: <TableCell className="text-[20px]">VII</TableCell> },
        {label: 'ValorPresenca', component: <TableCell className="text-[20px]"> {sectionPoints[6]} </TableCell> },
        {label: 'NivelPresenca', component: <TableCell className="text-[20px]"> {sectionPoints[6] > 0.7 ? 'Alto' : sectionPoints[6] > 0.3 ? 'Médio' : 'Baixo'} </TableCell> },
      ],
      [
        {label: '#',             component: <TableCell className="text-[20px]">VIII</TableCell> },
        {label: 'ValorPresenca', component: <TableCell className="text-[20px]"> {sectionPoints[7]} </TableCell> },
        {label: 'NivelPresenca', component: <TableCell className="text-[20px]"> {sectionPoints[7] > 0.7 ? 'Alto' : sectionPoints[7] > 0.3 ? 'Médio' : 'Baixo'} </TableCell> },
      ],
      [
        {label: '#',             component: <TableCell className="text-[20px]">IX</TableCell> },
        {label: 'ValorPresenca', component: <TableCell className="text-[20px]"> {sectionPoints[8]} </TableCell> },
        {label: 'NivelPresenca', component: <TableCell className="text-[20px]"> {sectionPoints[8] > 0.7 ? 'Alto' : sectionPoints[8] > 0.3 ? 'Médio' : 'Baixo'} </TableCell> },
      ],
    ]


    return (
        <>
          <div className='flex flex-1 self-center'>
            <Label className="text-[30px] my-2">Valores de Referência dos níveis de presença</Label>
          </div>
            <div className="border-[5px] rounded-md border-[--primary-foreground]">
                <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-[20px]">Nível de Presença</TableHead>
                        <TableHead className="text-[20px]">Valor de Referência</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    tableReferenceValues.map((row, index) => (
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

          <div className='flex flex-1 self-center my-2'>
            <Label className='text-[30px] my-2'> Resultado LEAP </Label>
          </div>

          <div className='border-[5px] rounded-md border-[--primary-foreground]'>
          <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-[20px]">#</TableHead>
                        <TableHead className="text-[20px]">Valor de Presença</TableHead>
                        <TableHead className="text-[20px]">Nível de Presença</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                  {
                    tableLeapResult.map((row, index) => (
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

export default LeapView;

