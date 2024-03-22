import SetTemplateForm from '@/components/form/template/SetTemplateForm';
import React from 'react'


const TemplatesPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <SetTemplateForm/>
    </div>
  )
}

export default TemplatesPage