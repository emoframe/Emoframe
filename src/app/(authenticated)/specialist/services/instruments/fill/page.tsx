import { appRedirect } from '@/lib/actions';
import PanasForm from '@/components/form/instrument/PanasForm';
import SamForm from '@/components/form/instrument/SamForm';
import SusForm from '@/components/form/instrument/SusForm';
import EazForm from '@/components/form/instrument/EazForm';
import BrumsForm from '@/components/form/instrument/BrumsForm';
import GdsForm from '@/components/form/instrument/GdsForm';
import LeapForm from '@/components/form/instrument/LeapForm';
import GamexForm from '@/components/form/instrument/GamexForm';
import IuxrvForm from '@/components/form/instrument/IuxrvForm';
import GamefulQuestForm from '@/components/form/instrument/GamefulQuestForm';
import HexadForm from '@/components/form/instrument/HexadForm';
import ImiteqForm from '@/components/form/instrument/ImiteqForm';
import PqForm from '@/components/form/instrument/PqForm';
import SsqForm from '@/components/form/instrument/SsqForm';
import TuqForm from '@/components/form/instrument/TuqForm';
import UesForm from '@/components/form/instrument/UesForm';

const ViewInstrument = async ({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) => {

  const ConditionalRendering = () => {
    const instruments = [
      {
        value: "panas",
        component: <PanasForm isViewable/>
      },
      {
        value: "sam",
        component: <SamForm isViewable/>
      },
      {
        value: "sus",
        component: <SusForm isViewable identification=""/>
      },
      {
        value: "eaz",
        component: <EazForm isViewable/>
      },
      {
        value: "brums",
        component: <BrumsForm isViewable/>
      },
      {
        value: "gds",
        component: <GdsForm isViewable/>
      },
      {
        value: "leap",
        component: <LeapForm isViewable/>
      },
      {
        value: "gamex",
        component: <GamexForm isViewable identification=""/>
      },
      {
        value: "iuxrv",
        component: <IuxrvForm isViewable identification=""/>
      },
      {
        value: "gameful",
        component: <GamefulQuestForm isViewable identification=""/>
      },
      {
        value: "hexad",
        component: <HexadForm isViewable identification=""/>
      },
      {
        value: "imiteq",
        component: <ImiteqForm isViewable identification=""/>
      },
      {
        value: "pq",
        component: <PqForm isViewable identification=""/>
      },
      {
        value: "ssq",
        component: <SsqForm isViewable identification=""/>
      },
      {
        value: "tuq",
        component: <TuqForm isViewable identification=""/>
      },
      {
        value: "ues",
        component: <UesForm isViewable identification=""/>
      }
    ]

    const result = instruments.find((i) => i.value === searchParams.instrument)?.component;

    try {
      if (result != undefined && result != null) {
        return result;
      }
      else {
        appRedirect('/denied');
      }
    } catch(error) {
      appRedirect('/denied');
    }

  }

  return (
    <div className='flex flex-col p-5 mx-[100px] rounded-md'>
      <ConditionalRendering/>
    </div>
  );
};

export default ViewInstrument;