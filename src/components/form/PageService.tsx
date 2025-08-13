'use client';

import { savePageUser, createPageAnswer, search } from '@/lib/firebase';
import { useStepper } from '../ui/hooks/use-stepper';
import { Step, Steps } from '../ui/stepper';
import PageIdentificationForm from './PageIdentificationForm';
import PagePsychologicalForm from './PagePsychologicalForm';
import PageBiologicalForm from './PageBiologicalForm';
import PageSocioenvironmentalForm from './PageSocioenvironmentalForm';
import PageMultidimensionalForm from './PageMultidimensionalForm';
import { useEffect, useState } from 'react';
import { set } from 'date-fns';
import { useRouter } from 'next/navigation';
import { PageUser } from '@/types/users';
import Combobox from '../ui/combobox';
    
const steps = [
    {label: 'Dados de Identificação'},
    {label: 'Aspectos Psicológicos'},
    {label: 'Aspectos Biológicos'},
    {label: 'Aspectos Socioambientais'},
    {label: 'Domínio Multidimensional'},
];

const PageService = ({ specialistId }: { specialistId: string }) => {
    const router = useRouter();

    const { activeStep, nextStep, prevStep } = useStepper({
        initialStep: 0,
        steps,
    })

    const [multidimensionalData, setMultidimensionalData] = useState({
        age: '',
        gender: '',
        question_6: '',
        functional: ['', '', '', '', '', ''],
        question_20: '',
        environment: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        question_42: '',
        question_44: {
            checks: ['', '', '', '', '', '', '', '', '', '', ''],
            other: '',
        },
        question_46: '',
    });

    const [identificationData, setIdentificationData] = useState({
        id: '',
        name: '',
        race: '',
        schooling: '',
        individual_income: '',
        family_income: '',
        address: '',
        city: '',
        state: '',
        birthday: new Date(),
        age: 0,
        phone: '',
        gender: '',
        sex: '',
        status: '',
        schooling_years: 0,
        retirement: '',
        career: '',
        job: '',
        job_name: '',
        religion: '',
        religion_name: '',
        selfreport: '',
        housemates: '',
        housemates_name: '',
    });

    const [psychologicalData, setPsychologicalData] = useState({
        cognitive: ['', '', '', '', '', ''],
        cognitive_result: '',
        age: ['', '', '', '', '', '', '', ''],
        age_result: '',
        depression: ['', '', '', '', ''],
        depression_result: '',
        psychological_note: '',
    });

    const [biologicalData, setBiologicalData] = useState({
        sensorial: ['', '', '', ''],
        sensorial_result: '',
        functional: ['', '', '', '', '', ''],
        functional_result: '',
        malnutrition: ['', '', '', '', '', ''],
        malnutrition_result: '',
        cardiovasculars: ['', '', '', '', '', '', '', ''],
        cardiovasculars_result: '',
        medicine_44: {
            checks: ['', '', '', '', '', '', '', '', '', '', ''],
            others: '',
        },
        medicine_45: {
            checks: ['', '', '', '', '', '', ''],
            others: '',
        },
        medicine: ['', '', '', '', '', '', '', '', ''],
        medicine_result: '',
        biological_note: '',
    });

    const [socioenvironmentalData, setSocioenvironmentalData] = useState({
        support_55: {
            spouse: '',
            parents: '',
            siblings: '',
            children: '',
            grandchildren: '',
            greatgrandchildren: '',
        },
        support: ['', '', '', '', '', '', '', ''],
        support_result: '',
        violence: ['', '', '', '', '', '', '', ''],
        violence_result: '',
        environment: ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''],
        environment_result: '',
        socioenvironmental_note: '',
    });

    const [pageUsers, setPageUsers] = useState<PageUser[]>([]);

    const [isUserSelected, setIsUserSelected] = useState(false);

    useEffect(() => {
        search('page_user', [{
            field: 'specialistId',
            operation: '==',
            value: specialistId,
        }]).then(users => {
            console.log(users);
            users.map(user => {
                user.birthday = user.birthday.toDate();
                user.id = user.uid;
                user.job = user.job_name ? 'TRUE': 'FALSE';
                user.job_name ??= '';
                user.religion = user.religion_name ? 'TRUE': 'FALSE';
                user.religion_name ??= '';
                user.housemates_name ??= '';
                delete user.uid;
                delete user.type;
                delete user.specialistId;
            });
            setPageUsers(users as PageUser[]);
        });
    }, []);

    const onSubmit = async values => {
        switch(activeStep){
            case 0: {
                multidimensionalData.age = values.age;
                multidimensionalData.gender = values.gender;
                if(identificationData.id) values.id = identificationData.id;
                values.id = await savePageUser(values, specialistId);
                setIdentificationData(values);
            }
            break;
            case 1: {
                multidimensionalData.question_6 = values.cognitive[5];
                setPsychologicalData(values);
            }
            break;
            case 2: {
                multidimensionalData.question_20 = values.sensorial[0];
                multidimensionalData.functional = values.functional;
                multidimensionalData.question_42 = values.cardiovasculars[6];
                multidimensionalData.question_44 = values.medicine_44;
                multidimensionalData.question_46 = values.medicine[0];
                console.log(values);
                setBiologicalData(values);
            }
            break;
            case 3: {
                multidimensionalData.environment = values.environment;
                setSocioenvironmentalData(values);
            }
            break;
            case 4: {
                await createPageAnswer({...psychologicalData, ...biologicalData, ...socioenvironmentalData, ...values}, identificationData.id, specialistId);
                router.push('/specialist/services/page/results');
                return;
            }
        }
        setMultidimensionalData(multidimensionalData);
        console.log(multidimensionalData);
        nextStep();
        window.scrollTo({top: 0, left: 0, behavior: "smooth"});
    };

    const prevAndUp = () => {
        prevStep();
        window.scrollTo({top: 0, left: 0, behavior: "smooth"});
    }

    const onSelectUser = (uid: string) => {
        console.log(uid);
        const user = pageUsers.find(user => user.id === uid);
        console.log(user);
        if(user){
            setIdentificationData(user);
            console.log(identificationData);
        }
        setIsUserSelected(true);
    }

    return (
        <>
        <Steps className='mb-4' activeStep={activeStep}>
            {steps.map((step, index) => ( <Step index={index} key={index} additionalClassName={{label: "text-md"}} {...step} /> ))}
        </Steps>
        {(activeStep === 0) && (
            isUserSelected
            ? <PageIdentificationForm onSubmit={onSubmit} data={identificationData}/>
            : <Combobox
                className="min-w-[400px] mb-4"
                options={[{ value: 'new', label: 'Novo Usuário' }].concat(pageUsers.map(user => ({ value: user.id, label: user.name })))}
                onSelect={onSelectUser}
                placeholder="Selecione um usuário"
            />
        )}
        {(activeStep === 1) && <PagePsychologicalForm onSubmit={onSubmit} prevStep={prevAndUp} data={psychologicalData} />}
        {(activeStep === 2) && <PageBiologicalForm onSubmit={onSubmit} prevStep={prevAndUp} data={biologicalData} />}
        {(activeStep === 3) && <PageSocioenvironmentalForm onSubmit={onSubmit} prevStep={prevAndUp} data={socioenvironmentalData} />}
        {(activeStep === 4) && <PageMultidimensionalForm onSubmit={onSubmit} prevStep={prevAndUp} data={multidimensionalData} />}
        </>
    );
};

export default PageService;
