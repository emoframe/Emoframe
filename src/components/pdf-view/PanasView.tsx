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

import { formatFormDataToChart, getKeysFromInterface } from '@/lib/utils';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });


export interface PanasViewProps {
    data: Object,
}


const PanasView = ({ data } : PanasViewProps) => {

    const PanasInterface = getKeysFromInterface('Panas')
    const PanasData = formatFormDataToChart(data, PanasInterface).arrayData.slice(1).map((data) => Number(data[1])).slice(1)

    const positivePoints = PanasData.map((points, index) => {
        if(index % 2 === 0) return points
        return 0;
    }).reduce((acc, val) => acc + val, 0)

    const negativePoints = PanasData.map((points, index) => {
        if(index % 2 !== 0) return 5 - points
        return 0;
    }).reduce((acc, val) => acc + val, 0)

    const configPositive = {
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
            categories: ['Pontuação Mínima', 'Sua Pontuação', 'Pontuação Máxima'],
            tickPlacement: 'on',
          },
          yaxis: {
            min: 0,
            max: 50,
          }
        },
        series: [
          {
            name: 'evaluation',
            data: [10, positivePoints, 50]
          }
        ]
      }

      const configNegative = {
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
            categories: ['Pontuação Mínima', 'Sua Pontuação', 'Pontuação Máxima'],
            tickPlacement: 'on',
          },
          yaxis: {
            min: 0,
            max: 50,
          }
        },
        series: [
          {
            name: 'evaluation',
            data: [50, negativePoints, 10]
          }
        ]
      }

    
    return (
        <>
            <div className="my-2">
                {
                    typeof window !== undefined && 
                    <div class="flex flex-col">
                        <div className="self-center">
                            <Label className="text-lg"> Pontuação Positiva </Label>
                        </div>
                        <div>
                            <Chart
                            options={configPositive.options}
                            series={configPositive.series}
                            type="bar"
                            width={"100%"}
                            height={400}
                            /> 
                        </div>
                        <div className="self-center" >
                            <Label className="text-lg"> Pontuação Negativa </Label>
                        </div>
                        <div>
                            <Chart
                            options={configNegative.options}
                            series={configNegative.series}
                            type="bar"
                            width={"100%"}
                            height={400}
                            /> 
                        </div>
                    </div>                    
                }
            </div>
        </>
    )
}

export default PanasView

