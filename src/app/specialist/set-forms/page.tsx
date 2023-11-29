import { getById } from '@/lib/firebase';
import SetForm from './form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { forms } from '@/types/forms';

//Resolve o problema de cache após atualização
export const dynamic = 'force-dynamic'; 
export const revalidate = 0;

const SetForms = async ({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) => {

    const data = await getById(searchParams.uid as string, "user");
    
    return (
        <Card className="min-w-[600px]">
            <CardHeader>
                <CardTitle>{`${data.name} ${data.surname}`}</CardTitle>
                <CardDescription>{"uid: " + searchParams.uid}</CardDescription>
            </CardHeader>
            <Separator className="my-4" />

            {data.forms &&
                <CardContent>
                    <ul>
                        {data.forms.map((form) => <li>{forms.find((option) => option.value == form )?.label}</li> )}
                    </ul>
                </CardContent>
            }
            <CardContent>
                <SetForm uid={searchParams.uid as string} options={forms} />
            </CardContent>
        </Card>

    );
};

export default SetForms;