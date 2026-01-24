'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"; // Certifique-se de ter este componente (Shadcn UI)
import { isValidMobilePhone } from "@brazilian-utils/brazilian-utils";
import { formatPhone } from '@/lib/utils';
import { DatePicker, DateField } from '../ui/date-picker';
import { getLocalTimeZone, parseDate } from "@internationalized/date"
import { useRouter } from 'next/navigation';
import { createUser } from '@/lib/firebase';
import { User } from '@/types/users';
import { RadioItem } from '@/types/forms';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';

// --- OPÇÕES (MANTIDAS) ---
const RaceProps: RadioItem[] = [
    { value: "Amarelo", label: "raceOptionAsian" },
    { value: "Branco", label: "raceOptionCaucasian" },
    { value: "Indígena", label: "raceOptionNative" },
    { value: "Pardo", label: "raceOptionMixed" },
    { value: "Preto", label: "raceOptionBlack" },
];

const SchoolingProps: RadioItem[] = [
    { value: "Analfabeto", label: "educationOptionIlliterate" },
    { value: "Fundamental Incompleto", label: "educationOptionPreElementary" },
    { value: "Fundamental Completo", label: "educationOptionElementary" },
    { value: "Médio Incompleto", label: "educationOptionPreHighschool" },
    { value: "Médio Completo", label: "educationOptionHighschool" },
    { value: "Superior Incompleto", label: "educationOptionPreHigher" },
    { value: "Superior Completo", label: "educationOptionHigher" },
];

const GenderProps: RadioItem[] = [
    { value: "Feminino", label: "genderOptionF" },
    { value: "Masculino", label: "genderOptionM" },
    { value: "Não sei", label: "genderOptionUnspecified" },
    { value: "Outro", label: "genderOptionOther" },
];

// --- SCHEMA ---
const FormSchema = z
    .object({
        // Etapa 0
        name: z.string().min(1, 'Nome é obrigatório').max(100),
        surname: z.string().min(1, 'Sobrenome é obrigatório').max(100),
        email: z.string().min(1, 'Email é obrigatório').email('Email inválido'),
        phone: z.string().transform((data) => data.replace(/[^\d]/g, ""))
            .superRefine((val, ctx) => {
                if (val.length < 8) {
                    ctx.addIssue({ code: z.ZodIssueCode.too_small, minimum: 8, type: "string", inclusive: true, message: "Telefone incompleto" });
                }
                if (!isValidMobilePhone(val)) {
                    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Telefone inválido" });
                }
            }),
        address: z.string().min(1, 'Endereço é obrigatório').max(100),
        birthday: z.date({ required_error: "Selecione uma data", invalid_type_error: "Data inválida" }),
        social_name: z.string().optional(),

        // Etapa 1
        schooling: z.string({ required_error: "Selecione uma escolaridade" }).min(1, "Selecione uma opção"),

        // Etapa 2
        race: z.string({ required_error: "Selecione uma raça/cor" }).min(1, "Selecione uma opção"),
        gender: z.string({ required_error: "Selecione um gênero" }).min(1, "Selecione uma opção"),
        password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
        confirm_password: z.string().min(1, 'Confirmação obrigatória'),

        // Opcionais (Removidos da view mas mantidos no schema para não quebrar tipagem)
        individual_income: z.string().optional(),
        family_income: z.string().optional(),
    })
    .refine((data) => data.password === data.confirm_password, {
        path: ['confirm_password'],
        message: 'Senhas não conferem',
    });

// --- DEFINIÇÃO DAS ETAPAS ---
const stepsFields = [
    // Etapa 0: Identificação e Contato
    ['name', 'surname', 'email', 'phone', 'address', 'birthday'],
    // Etapa 1: Escolaridade
    ['schooling'],
    // Etapa 2: Identidade e Segurança
    ['race', 'gender', 'password', 'confirm_password']
];

const SignUpForm = ({ specialistId, onSuccess }: { specialistId: string, onSuccess?: () => void }) => {
    const [step, setStep] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: '', surname: '', social_name: '',
            email: '', phone: '', address: '',
            birthday: new Date(),
            schooling: '', race: '', gender: '',
            password: '', confirm_password: '',
            individual_income: '', family_income: ''
        },
    });

    const { push } = useRouter();
    const { t } = useTranslation('specialist_users_register');

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        setIsLoading(true);
        try {
            let data = values as User;
            data.type = "user";
            data.specialistId = specialistId;
            // Preencher valores padrão para campos ocultos se necessário
            if (!data.individual_income) data.individual_income = "Prefere não informar";
            if (!data.family_income) data.family_income = "Prefere não informar";
            
            await createUser(data, specialistId);
            
            if (onSuccess) onSuccess();
            else push("/specialist");
        } catch (error) {
            console.error("Error creating user", error);
        } finally {
            setIsLoading(false);
        }
    };

    const nextStep = async () => {
        const fields = stepsFields[step];
        const output = await form.trigger(fields as any);
        if (output) setStep((prev) => prev + 1);
    };

    const prevStep = () => setStep((prev) => prev - 1);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="h-full flex flex-col">
                <div className="mb-6 flex justify-between items-center">
                    <div>
                        <p className="font-bold text-xl">{t('title')}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                            {step === 0 && t('labelStep0')}
                            {step === 1 && t('labelStep1')}
                            {step === 2 && t('labelStep2')}
                        </p>
                    </div>
                    <div className="text-sm font-medium bg-secondary px-3 py-1 rounded-full">
                        {step + 1} / {stepsFields.length}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-1">
                    
                    {step === 0 && (
                        <div className='flex flex-col gap-4'>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name='name'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('nameLabel')}</FormLabel>
                                            <FormControl><Input placeholder='José' {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='surname'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('surnameLabel')}</FormLabel>
                                            <FormControl><Input placeholder='da Silva' {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('emailLabel')}</FormLabel>
                                        <FormControl><Input placeholder='mail@example.com' {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='phone'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('phoneLabel')}</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder='(99) 99999-9999'
                                                {...field}
                                                onChange={(e) => field.onChange(formatPhone(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='address'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('addressLabel')}</FormLabel>
                                        <FormControl><Input placeholder={t('addressPlaceholder')} {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='birthday'
                                render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>{t('birthdateLabel')}</FormLabel>
                                        <FormControl>
                                            <DatePicker
                                                onChange={(value) => field.onChange(value.toDate(getLocalTimeZone()))}
                                                value={parseDate(field.value.toISOString().split('T')[0])}
                                            >
                                                <DateField />
                                            </DatePicker>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    )}

                    {step === 1 && (
                        <div className='flex flex-col gap-4'>
                            <FormField
                                control={form.control}
                                name="schooling"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('educationLabel')}</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione a escolaridade" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {SchoolingProps.map((item) => (
                                                    <SelectItem key={item.value} value={item.value}>
                                                        {t(item.label)}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    )}

                    {step === 2 && (
                        <div className='flex flex-col gap-4'>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="race"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('raceLabel')}</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {RaceProps.map((item) => (
                                                        <SelectItem key={item.value} value={item.value}>
                                                            {t(item.label)}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="gender"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('genderLabel')}</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecione" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {GenderProps.map((item) => (
                                                        <SelectItem key={item.value} value={item.value}>
                                                            {t(item.label)}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="h-px bg-border my-2" />

                            <FormField
                                control={form.control}
                                name='password'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('passwordLabel')}</FormLabel>
                                        <FormControl><Input type='password' placeholder='••••••••' {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name='confirm_password'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('confirmPasswordLabel')}</FormLabel>
                                        <FormControl><Input type='password' placeholder='••••••••' {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    )}
                </div>

                <div className="mt-6 pt-4 border-t flex justify-between">
                    <Button 
                        type="button" 
                        variant="outline" 
                        onClick={prevStep} 
                        disabled={step === 0}
                    >
                        <ArrowLeft size={16} className="mr-2" /> Voltar
                    </Button>

                    {step < stepsFields.length - 1 ? (
                        <Button type="button" onClick={nextStep}>
                            Próximo <ArrowRight size={16} className="ml-2" />
                        </Button>
                    ) : (
                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            {t('registerLabel')}
                        </Button>
                    )}
                </div>
            </form>
        </Form>
    );
};

export default SignUpForm;