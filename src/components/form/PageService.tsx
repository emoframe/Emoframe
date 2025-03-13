'use client';

// import { createPageUser } from '@/lib/firebase';
// import { PageUser } from '@/types/users';
import { useStepper } from '../ui/hooks/use-stepper';
import { Step, Steps } from '../ui/stepper';
import PageIdentificationForm from './PageIdentificationForm';
import PagePsychologicalForm from './PagePsychologicalForm';
import PageBiologicalForm from './PageBiologicalForm';
import PageSocioenvironmentalForm from './PageSocioenvironmentalForm';
    
const steps = [
    {label: 'Dados de Identificação'},
    {label: 'Aspectos Psicológicos'},
    {label: 'Aspectos Biológicos'},
    {label: 'Aspectos Socioambientais'},
    {label: 'Domínio Multidimensional'},
];

const PageService = ({ specialistId }: { specialistId: string }) => {
    const { activeStep, nextStep, prevStep } = useStepper({
        initialStep: 0,
        steps,
    })

    const onSubmit = async () => {
        // let data = values as PageUser;
        // data.type = "page_user";
        // data.specialistId = specialistId;
        // await createPageUser(data, specialistId);
        nextStep();
        window.scrollTo({top: 0, left: 0, behavior: "smooth"});
    };

    return (
        <>
        <Steps className='mb-4' activeStep={activeStep}>
            {steps.map((step, index) => ( <Step index={index} key={index} additionalClassName={{label: "text-md"}} {...step} /> ))}
        </Steps>
        {(activeStep === 0) && <PageIdentificationForm onSubmit={onSubmit} />}
        {(activeStep === 1) && <PagePsychologicalForm onSubmit={onSubmit} />}
        {(activeStep === 2) && <PageBiologicalForm onSubmit={onSubmit} />}
        {(activeStep === 3) && <PageSocioenvironmentalForm onSubmit={onSubmit} />}
        </>
    );
};

export default PageService;
