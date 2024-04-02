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

export interface BrumsViewProps {
    data: Object,
}

const BrumsView = ({ data } : BrumsViewProps) => {
    const BrumsInterface = getKeysFromInterface('brums');
    const BrumsData = formatFormDataToChart(data, BrumsInterface).arrayData.map((data) => Number(data[1]))

    const BrumsPoints = [
        BrumsData.slice(0, 4).reduce((acc, val) => acc + val, 0),
        BrumsData.slice(4, 8).reduce((acc, val) => acc + val, 0),
        BrumsData.slice(8, 12).reduce((acc, val) => acc + val, 0),
        BrumsData.slice(12, 16).reduce((acc, val) => acc + val, 0),
        BrumsData.slice(16, 20).reduce((acc, val) => acc + val, 0),
        BrumsData.slice(20, 24).reduce((acc, val) => acc + val, 0),
    ]


    const categories = {
      ptbr: ['Tensão', 'Depressão', 'Raiva', 'Fadiga', 'Vigor', 'Confusão'],
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
            categories: categories.ptbr,
            tickPlacement: 'on',
          },
          yaxis: {
            min: 0,
            max: BrumsPoints.reduce((a, b) => Math.max(a, b), -Infinity) + 5,
          }
        },
        series: [
          {
            name: 'evaluation',
            data: BrumsPoints 
          }
        ]
    }

    return (
        <>
            <div className="self-center my-3">
              <Label className="text-[30px]"> Gráfico do Instrumento </Label>
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

export default BrumsView

