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
  const [ eid, aid, type ] = [params?.get('eid')!, params?.get('aid')!, params?.get('type')!]

  const [user, setUser] = React.useState<Object>({})
  const [formData, setFormData] = React.useState<Object>({})
  const [specialistName, setSpecialistName] = React.useState<string>('')
  const [age, setAge] = React.useState<number>(0)
  const formInterface = getKeysFromInterface(type)

  console.log(type)

  React.useEffect(() => {
    getById(aid, 'user').then((data) => {
      setUser(data!);
      getById(data.specialistId, 'user').then((data) => {
        setSpecialistName(`${data.name} ${data.surname}`)
      })
      setAge(Math.floor((Date.now() - convertStringToDate(data!.birthday)) / (1000 * 60 * 60 * 24 * 365)))
    })
    
    getById(aid, `evaluation/${eid}/answers`).then(data => {
      setFormData(data as Object)
    })

  }, [eid, aid])

  // console.log(formData)


  if(!user || !formData || !specialistName || !age) return null
  return (
      <PDFView user={user} specialist={specialistName} age={age} fid={eid} data={formData} type={type} />  
  )
}

export default PDFViewPage