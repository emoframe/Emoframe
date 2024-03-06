'use client';

import React from 'react'
import PDFView from '@/components/pdf-view/PDFView';

import { useSearchParams } from 'next/navigation';

import { 
  getById, 
  search,
  getFormById,
} from '@/lib/firebase';

import { 
  convertStringToDate,
  getKeysFromInterface,
} from '@/lib/utils';

const PDFViewPage = () => {

  const params = useSearchParams();
  const [ uid, fid ] = [params?.get('uid')!, params?.get('fid')!]

  const [user, setUser] = React.useState<Object>({})
  const [formData, setFormData] = React.useState<Object>({})
  const [specialistName, setSpecialistName] = React.useState<string>('')
  const [age, setAge] = React.useState<number>(0)

  let formInterface;
  if(formData !== undefined && formData!.type !== undefined){
    formInterface = getKeysFromInterface(formData!.type)
  }

  React.useEffect(() => {
    getById(uid, 'user').then((data) => {
      setUser(data!);
      getById(data.specialistId, 'user').then((data) => {
        setSpecialistName(`${data.name} ${data.surname}`)
      })
      setAge(Math.floor((Date.now() - convertStringToDate(data!.birthday)) / (1000 * 60 * 60 * 24 * 365)))
    })
    
    getFormById(uid, fid).then((data) => {
      setFormData(data as Object);
    })
  }, [uid, fid])


  if(!user || !formData || !specialistName || !age) return null
  return (
      <PDFView user={user} specialist={specialistName} age={age} fid={fid} data={formData} />  
  )
}

export default PDFViewPage