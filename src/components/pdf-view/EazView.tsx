import React from 'react'

import dynamic from 'next/dynamic';

import { Label } from '@/components/ui/label'

import { formatFormDataToChart, getKeysFromInterface } from '@/lib/utils';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });


export interface EazViewProps {
    data: Object,
}


const EazView = ({ data } : EazViewProps) => {

    const EazInterface = getKeysFromInterface('eaz')
    const EazData = formatFormDataToChart(data, EazInterface).arrayData.slice(1).map((data) => Number(data[1])).slice(1)

    const positivePoints = EazData.slice(0, 10).reduce((acc, val) => acc + val, 0)
    const negativePoints = EazData.slice(10).reduce((acc, val) => acc + val, 0)

    // const positivePoints = EazData.map((points, index) => {
    //     if(index % 2 === 0) return points
    //     return 0;
    // }).reduce((acc, val) => acc + val, 0)

    // const negativePoints = EazData.map((points, index) => {
    //     if(index % 2 !== 0) return 5 - points
    //     return 0;
    // }).reduce((acc, val) => acc + val, 0)

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
            data: [
              {
                x: 'Pontuação Positiva',
                y: positivePoints,
                fillColor: '#66CC00'
              },
              {
                x: 'Pontuação Negativa',
                y: negativePoints,
                fillColor: '#FF0000'
              }
            ] 
          }
        ]
      }

    
    return (
        <>
            <div className="my-2">
                {
                    typeof window !== undefined && 
                    <div className="flex flex-col">
                        <div className="self-center">
                            <Label className="text-lg"> Pontuação do Instrumento </Label>
                        </div>
                        <div>
                            <Chart
                            options={config.options}
                            series={config.series}
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

export default EazView

