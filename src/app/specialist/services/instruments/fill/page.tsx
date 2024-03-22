import { appRedirect } from '@/lib/actions';
import PanasForm from '@/components/form/instrument/PanasForm';
import SamForm from '@/components/form/instrument/SamForm';
import SusForm from '@/components/form/instrument/SusForm';
import EazForm from '@/components/form/instrument/EazForm';
import BrumsForm from '@/components/form/instrument/BrumsForm';
import GdsForm from '@/components/form/instrument/GdsForm';

const FillInstrument = async ({
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
        component: <SusForm isViewable identification="Exemplo"/>
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
      }
    ]

    const result = instruments.find((i) => i.value === searchParams.instrument)?.component;

    try {
      if (result != undefined && result != null) {
        console.log("passou")
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
    <div className='flex flex-col bg-primary-background p-5 mx-[100px] rounded-md'>
      <ConditionalRendering/>
    </div>
  );
};

export default FillInstrument;