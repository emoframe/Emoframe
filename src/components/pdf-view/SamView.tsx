import React from 'react'

import dynamic from 'next/dynamic';

import { Label } from '@/components/ui/label'

import { 
    formatFormDataToChart, 
    getKeysFromInterface 
} from '@/lib/utils';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });


export interface SamViewProps {
    data: Object,
}


const SamView = ({ data } : SamViewProps) => {
    
    const SamInterface = getKeysFromInterface('Sam');
    const SamData = formatFormDataToChart(data, SamInterface).arrayData.filter(data => typeof data[1] !== 'string')

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
            categories: SamData.map((data) => data[0]),
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
            data: SamData.map((data) => Number(data[1]))
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

export default SamView;

