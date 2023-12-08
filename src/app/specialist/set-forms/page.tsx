import { getById, getSubsById } from '@/lib/firebase';
import SetForm from './form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
    const formData = await getSubsById("user", searchParams.uid as string, "form");

    return (
        <Tabs defaultValue="solicitate">
            <TabsList>
                <TabsTrigger value="solicitate">Solicitar</TabsTrigger>
                <TabsTrigger value="results">Resultados</TabsTrigger>
            </TabsList>
            <TabsContent value="solicitate">
                <Card className="min-w-[600px]">
                    <CardHeader>
                        <CardTitle>{`${data.name} ${data.surname}`}</CardTitle>
                        <CardDescription>{"uid: " + searchParams.uid}</CardDescription>
                    </CardHeader>
                    <Separator className="my-4" />

                    {data.forms &&
                        <CardContent>
                            <ul>
                                {data.forms.map((form, index) => <li key={index}>{forms.find((option) => option.value == form)?.label}</li>)}
                            </ul>
                        </CardContent>
                    }
                    <CardContent>
                        <SetForm uid={searchParams.uid as string} options={forms} />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="results">
                <Card className="min-w-[600px]">
                    <CardHeader>
                        <CardTitle>{`${data.name} ${data.surname}`}</CardTitle>
                        <CardDescription>{"uid: " + searchParams.uid}</CardDescription>
                    </CardHeader>
                    <Separator className="my-4" />

                    {formData &&
                        <CardContent>
                            {formData.map((form, index) => {
                                return (
                                    <ul key={index}>
                                        {Object.keys(form).map((key) => {
                                            return (
                                                <li key={key}>{`${key}: ${form[key]}`}</li> 
                                            )
                                        })}
                                    </ul>
                                )
                            })}
                        </CardContent>
                    }
                </Card>
            </TabsContent>
        </Tabs>

    );
};

export default SetForms;