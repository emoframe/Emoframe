import { getById, getSubsById } from "@/lib/firebase";
import SetInstrumentsUsersForm from "@/components/form/SetInstrumentsUsersForm";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { instruments } from "@/types/forms";
import Charts from "@/components/chart/Charts";
import { groupBy } from "@/lib/utils";
import {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionContent,
} from "@/components/ui/accordion";

//Resolve o problema de cache após atualização
export const dynamic = "force-dynamic";
export const revalidate = 0;

const SetForms = async ({
	searchParams,
}: {
	searchParams: { [key: string]: string | string[] | undefined };
}) => {
	const data = await getById(searchParams.uid as string, "user");
	const formData = await getSubsById(
		"user",
		searchParams.uid as string,
		"form"
	);
	const formGroups = groupBy(formData, "type");
	const keys = Object.keys(formGroups);

	const generatePanasValues = (form) => {
		const positive =
			+form.active +
			+form.charmed +
			+form.determined +
			+form.enthusiastic +
			+form.hearty +
			+form.excited +
			+form.inspired +
			+form.interested +
			+form.pleasantly_surprised +
			+form.proud;
		const negative =
			+form.angry +
			+form.disturbed +
			+form.frightened +
			+form.guilty +
			+form.nervous +
			+form.remorse +
			+form.repulsion +
			+form.scared +
			+form.tormented +
			+form.trembling;

		return [positive, negative];
	};

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
						<CardDescription>
							{"uid: " + searchParams.uid}
						</CardDescription>
					</CardHeader>
					<Separator className="my-4" />

					{data.forms && (
						<CardContent>
							<ul>
								{data.forms.map((form, index) => (
									<li key={index}>
										{
											instruments.find(
												(option) => option.value == form
											)?.label
										}
									</li>
								))}
							</ul>
						</CardContent>
					)}
					<CardContent>
						<SetInstrumentsUsersForm
							uid={searchParams.uid as string}
							options={instruments}
						/>
					</CardContent>
				</Card>
			</TabsContent>
			<TabsContent value="results">
				<Card className="min-w-[600px]">
					<CardHeader>
						<CardTitle>{`${data.name} ${data.surname}`}</CardTitle>
						<CardDescription>
							{"uid: " + searchParams.uid}
						</CardDescription>
					</CardHeader>
					<Separator className="my-4" />
					{formGroups && (
						<CardContent>
							<Accordion
								type="single"
								collapsible>
								{keys.map((key, index) => (
									<AccordionItem key={index} value="item-1">
										<AccordionTrigger>{key}</AccordionTrigger>
										<AccordionContent>
											{
                                                formGroups[key].map((form, index) => {
                                                    const [positive, negative] = generatePanasValues(form);
                                                    const chartData = [
                                                        ["Resultados", "Valor", { role: "style" },],
                                                        ["Positivo", positive, "#00CC00",], // Verde
                                                        ["Negativo", negative, "#CC0000",], // Vermelho
                                                    ];

                                                    return (
                                                        <Charts
                                                            key={index}
                                                            chartType={"ColumnChart"}
                                                            data={chartData}
                                                            height={"400px"}
                                                            width={"100%"}
                                                        />
                                                    );
												})
                                            }
										</AccordionContent>
									</AccordionItem>
								))}
							</Accordion>
						</CardContent>
					)}
				</Card>
			</TabsContent>
		</Tabs>
	);
};

export default SetForms;
