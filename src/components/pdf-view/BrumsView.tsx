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


    
    // const solutionPontuation = BrumsData.map((data) => Number(data[1])).map((points, index) => {
    //     if(index % 2 === 0) return points - 1
    //     else return 5 - points
    // }).reduce((acc, val) => acc + val, 0) * 2.5

    // console.log(BrumsData.arrayData.map((data) => data[1]).filter(data => typeof data !== 'string'))

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
            categories: ['Tensão', 'Depressão', 'Raiva', 'Fadiga', 'Vigor', 'Confusão'],
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
            data: BrumsPoints 
          }
        ]
    }

    return (
        <>
            {/* <div className='self-center my-5'>
                <Label className={"text-center text-[30px] text-slate-800 rounded-md m-5 px-5 py-4 " + (
                solutionPontuation > 90 ? 'bg-blue-500'   : 
                solutionPontuation > 80 ? 'bg-green-900'  :
                solutionPontuation > 70 ? 'bg-green-300'  :
                solutionPontuation > 60 ? 'bg-yellow-500' :'bg-red-500'
                ) + 
                ' shadow-slate-400 shadow-[4.0px_8.0px_8.0px]'}>Brums Score: {solutionPontuation}</Label>
            </div> */}
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

