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
        {label: 'Baixo', component: <TableCell>Baixo</TableCell>},
        {label: 'ValorBaixo', component: <TableCell>Entre 0 e 0.3</TableCell>},
      ],
      [
        {label: 'Médio', component: <TableCell>Médio</TableCell>},
        {label: 'ValorMedio', component: <TableCell> Entre 0.3 e 0.7 </TableCell>},
      ],
      [
        {label: 'Alto', component: <TableCell>Alto</TableCell>},
        {label: 'ValorAlto', component: <TableCell> Acima de 0.7 </TableCell>},
      ]
    ]

    const tableLeapResult: TableRows[][] = [
      [
        {label: '#', component: <TableCell>I</TableCell> },
        {label: 'Fator', component: <TableCell>Mal-estar</TableCell> },
        {label: 'ValorPresenca', component: <TableCell> {sectionPoints[0]} </TableCell> },
        {label: 'NivelPresenca', component: <TableCell> {sectionPoints[0] > 0.7 ? 'Alto' : sectionPoints[0] > 0.3 ? 'Médio' : 'Baixo'} </TableCell> },
      ],
      [
        {label: '#', component: <TableCell>II</TableCell> },
        {label: 'Fator', component: <TableCell>Bem-estar</TableCell> },
        {label: 'ValorPresenca', component: <TableCell> {sectionPoints[1]} </TableCell> },
        {label: 'NivelPresenca', component: <TableCell> {sectionPoints[1] > 0.7 ? 'Alto' : sectionPoints[1] > 0.3 ? 'Médio' : 'Baixo'} </TableCell> },
      ],
      [
        {label: '#', component: <TableCell>III</TableCell> },
        {label: 'Fator', component: <TableCell>Desprezo</TableCell> },
        {label: 'ValorPresenca', component: <TableCell> {sectionPoints[2]} </TableCell> },
        {label: 'NivelPresenca', component: <TableCell> {sectionPoints[2] > 0.7 ? 'Alto' : sectionPoints[2] > 0.3 ? 'Médio' : 'Baixo'} </TableCell> },
      ],
      [
        {label: '#', component: <TableCell>IV</TableCell> },
        {label: 'Fator', component: <TableCell>Atração Sexual</TableCell> },
        {label: 'ValorPresenca', component: <TableCell> {sectionPoints[3]} </TableCell> },
        {label: 'NivelPresenca', component: <TableCell> {sectionPoints[3] > 0.7 ? 'Alto' : sectionPoints[3] > 0.3 ? 'Médio' : 'Baixo'} </TableCell> },
      ],
      [
        {label: '#', component: <TableCell>V</TableCell> },
        {label: 'Fator', component: <TableCell>Reflexão</TableCell> },
        {label: 'ValorPresenca', component: <TableCell> {sectionPoints[4]} </TableCell> },
        {label: 'NivelPresenca', component: <TableCell> {sectionPoints[4] > 0.7 ? 'Alto' : sectionPoints[4] > 0.3 ? 'Médio' : 'Baixo'} </TableCell> },
      ],
      [
        {label: '#', component: <TableCell>VI</TableCell> },
        {label: 'Fator', component: <TableCell>Necessidade</TableCell> },
        {label: 'ValorPresenca', component: <TableCell> {sectionPoints[5]} </TableCell> },
        {label: 'NivelPresenca', component: <TableCell> {sectionPoints[5] > 0.7 ? 'Alto' : sectionPoints[5] > 0.3 ? 'Médio' : 'Baixo'} </TableCell> },
      ],
      [
        {label: '#', component: <TableCell>VII</TableCell> },
        {label: 'Fator', component: <TableCell>Precipitabilidade</TableCell> },
        {label: 'ValorPresenca', component: <TableCell> {sectionPoints[6]} </TableCell> },
        {label: 'NivelPresenca', component: <TableCell> {sectionPoints[6] > 0.7 ? 'Alto' : sectionPoints[6] > 0.3 ? 'Médio' : 'Baixo'} </TableCell> },
      ],
      [
        {label: '#', component: <TableCell>VIII</TableCell> },
        {label: 'Fator', component: <TableCell>Temperatura</TableCell> },
        {label: 'ValorPresenca', component: <TableCell> {sectionPoints[7]} </TableCell> },
        {label: 'NivelPresenca', component: <TableCell> {sectionPoints[7] > 0.7 ? 'Alto' : sectionPoints[7] > 0.3 ? 'Médio' : 'Baixo'} </TableCell> },
      ],
      [
        {label: '#', component: <TableCell>IX</TableCell> },
        {label: 'Fator', component: <TableCell>Satisfeito</TableCell> },
        {label: 'ValorPresenca', component: <TableCell> {sectionPoints[8]} </TableCell> },
        {label: 'NivelPresenca', component: <TableCell> {sectionPoints[8] > 0.7 ? 'Alto' : sectionPoints[8] > 0.3 ? 'Médio' : 'Baixo'} </TableCell> },
      ],
    ]


    return (
        <>
          <div className='flex flex-1 self-center'>
            <Label className="text-[30px] my-2">Valores de Referência dos níveis de presença</Label>
          </div>
            <div className="border-[3px] rounded-md border-[--primary-foreground]">
                <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nível de Presença</TableHead>
                        <TableHead>Valor de Referência</TableHead>
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

          <div className='flex flex-1 self-center'>
            <Label className='text-[20px] my-2'> Resultado LEAP </Label>
          </div>

          <div className='border-[5px] rounded-md border-[--primary-foreground]'>
          <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Fator</TableHead>
                        <TableHead>Valor de Presença</TableHead>
                        <TableHead>Nível de Presença</TableHead>
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

