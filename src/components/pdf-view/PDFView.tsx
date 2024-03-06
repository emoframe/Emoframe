import React from 'react'

import SusView from '@/components/pdf-view/SusView';
import SamView from '@/components/pdf-view/SamView';


import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button';
import PanasView from './PanasView';

export interface PDFViewProps {
    user: Object,
    specialist: string,
    age: number,
    fid: string,
    data: Object,
}

const PDFView = ({ user, specialist, age, fid, data } : PDFViewProps) => {

    const PDFViewPageFields = [
        [
            <Label key={0} className="text-[30px]"> Informações do Usuário </Label>,
            <Label key={1} className="text-[20px]"> Nome: {user.name} </Label>,
            <Label key={2} className="text-[20px]"> Idade: {age} </Label>,
            <Label key={3} className="text-[20px]"> ID: {user.uid} </Label>,
        ],
        [
            <Label key={4} className="text-[30px]"> Informações da Avaliação </Label>,
            <Label key={5} className="text-[20px]"> Identificação: {fid} </Label>,
            <Label key={6} className="text-[20px]"> Data da Avaliação: {data!.evaluation_date} </Label>,
            <Label key={7} className="text-[20px]"> Especialista: {specialist} </Label>,
            <Label key={8} className="text-[20px]"> Método: {data!.type} </Label>,
        ]
    ]

  if (!data || !user || !specialist || !age) return null
  return (
    <div className="flex flex-col w-full">
      <div className="self-center">
        <Label className="text-[30px]"> Resultado da Avaliação </Label>
      </div>
      {
        PDFViewPageFields.map((group, index) => (
          <div key={index + '_field'} className="border-y-2 my-1 border-slate-600">
            {group.map((field, index) => (
              <div key={index}>
                {field}
              </div>
            ))}
          </div>
        ))
      }
      <div className="flex flex-col">
        {
          data.type === 'Sus' && 
          <SusView data={data} />
        }
        {
          data.type === 'Sam' &&
          <SamView data={data} />
        }
        {
          data.type === 'Panas' &&
          <PanasView data={data} />
        }
      </div>
      <div className="my-2 flex flex-row justify-around items-center">
        <Button onClick={() => window.print()} className="w-1/4">Ver todas as respostas</Button>
        <Button onClick={() => window.print()} className="w-1/4">Gerar devolutiva</Button>
        <Button onClick={() => window.print()} className="w-1/4">Exportar Resultados</Button>
      </div>
    </div>
  )
}

export default PDFView