import React from 'react'
import PDFView from '@/components/pdf-view/PDFView';

import { 
    getById, 
    search,
    getFormById,
} from '@/lib/firebase';
  
import { 
    convertStringToDate,
    getKeysFromInterface,
} from '@/lib/utils';

interface PDFViewFetchProps {
    eid: string,
    aid: string,
    type: string
}

const PDFViewFetch = async ({ eid, aid, type } : PDFViewFetchProps) => {
    
    const user = await getById(aid, 'user');
    const specialistName = await getById(user.specialistId, 'user').then(data => `${data.name} ${data.surname}`);
    const age = Math.floor((Date.now() - convertStringToDate(user!.birthday)) / (1000 * 60 * 60 * 24 * 365))
    const formData = await search({
        col: `evaluation/${eid}/answers`,
        field: '__name__',
        operation: '==',
        value: aid,
    }).then(data => data[0] as Object);

    return (
        <PDFView user={user} specialist={specialistName} age={age} fid={eid} data={formData} type={type} />
    )
}

export default PDFViewFetch


/**
 * 
 * 'use client';

import React from 'react'
import PDFView from '@/components/pdf-view/PDFView';


const PDFViewPage = () => {

  const params = useSearchParams();
  const [ eid, aid, type ] = [params?.get('eid')!, params?.get('aid')!, params?.get('type')!]

  const [user, setUser] = React.useState<Object>({})
  const [formData, setFormData] = React.useState<Object>({})
  const [specialistName, setSpecialistName] = React.useState<string>('')
  const [age, setAge] = React.useState<number>(0)

  React.useEffect(() => {
    getById(aid, 'user').then((data) => {
      setUser(data!);
      getById(data.specialistId, 'user').then((data) => {
        setSpecialistName(`${data.name} ${data.surname}`)
      })
      setAge()
    })
    
    search({
      col: `evaluation/${eid}/answers`,
      field: '__name__',
      operation: '==',
      value: aid,
    }).then(data => {
      setFormData(data[0] as Object);
    })
  }, [eid, aid])


  if(!user || !formData || !specialistName || !age) return null
  
}

export default PDFViewPage
 */