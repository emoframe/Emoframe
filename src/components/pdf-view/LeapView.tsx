import React from 'react'

import dynamic from 'next/dynamic';

import { Label } from '@/components/ui/label'

import { 
    formatFormDataToChart, 
    getKeysFromInterface 
} from '@/lib/utils';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });


export interface LeapViewProps {
    data: Object,
}


const LeapView = ({ data } : LeapViewProps) => {
    
    const LeapInterface = getKeysFromInterface('Leap');
    const LeapData = formatFormDataToChart(data, LeapInterface).arrayData.filter(data => typeof data[1] !== 'string')

    const LeapPoints = [LeapData.slice(0, 8).reduce((acc, val) => acc + Number(val), 0) /8*5]
    console.log(LeapPoints[0])


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
            categories: LeapData.map((data) => data[0]),
            tickPlacement: 'on',
          },
          yaxis: {
            min: 0,
            max: 9,
          }
        },
        series: [
          {
            name: 'evaluation',
            data: LeapData.map((data) => Number(data[1]))
          }
        ]
    }
    
    return (
        <>
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

