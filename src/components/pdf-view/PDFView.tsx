import React from 'react'

import PanasView   from '@/components/pdf-view/PanasView';
import SusView     from '@/components/pdf-view/SusView';
import SamView     from '@/components/pdf-view/SamView';
import LeapView    from '@/components/pdf-view/LeapView';
import GdsView     from '@/components/pdf-view/GdsView';
import EazView     from '@/components/pdf-view/EazView';
import BrumsView   from '@/components/pdf-view/BrumsView';

import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button';

export interface PDFViewProps {
    user: Object,
    specialist: string,
    age: number,
    fid: string,
    data: Object,
    type: string,
}

interface PDFViewForm {
  key: string,
  component: React.ReactNode,
}


const PDFView = ({ user, specialist, age, fid, data, type } : PDFViewProps) => {

  // console.log(data!.datetime)
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
          <Label key={6} className="text-[20px]"> Data da Avaliação: {new Date(data!.datetime.seconds).toLocaleDateString('pt-BR')} </Label>,
          <Label key={7} className="text-[20px]"> Especialista: {specialist} </Label>,
          <Label key={8} className="text-[20px]"> Método: {type.charAt(0).toLocaleUpperCase() + type.slice(1)} </Label>,
      ]
  ]

  const PDFViewForm: PDFViewForm[] = [
    {
      key: 'sus',
      component: <SusView data={data} />
    },
    {
      key: 'sam',
      component: <SamView data={data} />
    },
    {
      key: 'panas',
      component: <PanasView data={data} />
    },
    {
      key: 'leap',
      component: <LeapView data={data} />
    },
    {
      key: 'gds',
      component: <GdsView data={data} />
    },
    {
      key: 'eaz',
      component: <EazView data={data} />
    },
    {
      key: 'brums',
      component: <BrumsView data={data} />
    }
  ]

  if (!data || !user || !specialist || !age) return null
  return (
    <>
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
            PDFViewForm.find((form) => form.key === type)!.component
          }
        </div>
        <div className="my-2 flex flex-row justify-around items-center">
          <Button onClick={() => window.print()} className="w-1/4">Ver todas as respostas</Button>
          <Button onClick={() => window.print()} className="w-1/4">Gerar devolutiva</Button>
          <Button onClick={() => window.print()} className="w-1/4">Exportar Resultados</Button>
        </div>
      </div>
    </>
  )
}

export default PDFView