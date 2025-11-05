"use client";

import useUser from "@/components/hooks/useUser";
import { appRedirect } from "@/lib/actions";
import { Answer, Page } from "@/types/forms";


const AnswerDetailsPage = () => {
    const { answer } = useUser();
    if(!answer){
        appRedirect('/specialist/services/page/results');
        return;
    }

    const pageFields = [
        {
            question: '1-O(A) senhor(a) considera que sua memória é tão boa quanto a de outras pessoas da sua idade?',
            answer: answer.cognitive[0],
        },
        {
            question: '2-Memória: Vou lhe dizer 3 palavras e o(a) senhor(a) irá repeti-las em seguida. Peço que memorize essas 3 palavras, pois vou lhe perguntar sobre elas mais tarde novamente.',
            answer: answer.cognitive[1],
        },
        {
            question: '3-Linguagem, função executiva e atenção: Agora, eu vou marcar um minuto no relógio e durante esse tempo o(a) senhor(a) deve falar o maior número de animais de que se lembrar. Quanto mais animais o senhor fala nesse tempo melhor.',
            answer: answer.cognitive[2],
        },
        {
            question: '4-Teste do relógio: Aplique apenas se o (a) idoso tiver escolaridade igual ou superior a 5 anos. Caso não, pontue ao lado de forma negativa. Esteja com uma folha com um desenho de um círculo de 11 cm de diâmetro e dê as instruções para a tarefa: “Senhor(a), nesta folha temos um mostrador de um relógio. Gostaria que o senhor(a) colocasse os números dentro dele. [Aguardar]. Por favor, agora indique o horário 11h10 (onze horas e 10 minutos).”.',
            answer: answer.cognitive[3],
        },
        {
            question: '5-Praxia: Esteja com uma folha em mãos e fale todos os comandos de uma vez só: “Pegue este papel com a mão direita. Dobre-o ao meio e coloque-o sobre a mesa”.',
            answer: answer.cognitive[4],
        },
        {
            question: '6-Memória tardia: O(a) senhor(a) consegue se lembrar das 3 palavras que lhe pedi que repetisse agora há pouco?',
            answer: answer.cognitive[5],
        },
        {
            question: '7-De maneira geral, o(a) senhor(a) diria que a sua saúde é boa?',
            answer: answer.age[0],
        },
        {
            question: '8 -Que idade o (a) senhor(a) sente ter? Por quê?',
            answer: answer.age[1],
        },
        {
            question: '9-Ao pensar no seu envelhecimento o(a) senhor(a) se sente preocupado(a)?',
            answer: answer.age[2],
        },
        {
            question: '10-O(a) senhor(a) acha que a velhice, de forma geral, tem mais pontos negativos do que positivos?',
            answer: answer.age[3],
        },
        {
            question: '11-O(a) senhor(a) acha que é possível ter uma vida sexual saudável na velhice?',
            answer: answer.age[4],
        },
        {
            question: '12-O(a) senhor(a) acha que há poucas coisas que uma pessoa possa realizar na velhice?',
            answer: answer.age[5],
        },
        {
            question: '13-O(a) senhor(a) acha que a velhice é sinônimo de debilidade física?',
            answer: answer.age[6],
        },
        {
            question: '14-O(a) senhor(a) acha que é melhor morrer cedo do que ficar velho(a)?',
            answer: answer.age[7],
        },
        {
            question: '15-De modo geral o(a) senhor(a) está satisfeito com a vida?',
            answer: answer.depression[0],
        },
        {
            question: '16-O(a) senhor (a) se sente triste com frequência?',
            answer: answer.depression[1],
        },
        {
            question: '17-O(a) senhor(a) abandonou muitas das coisas que fazia ou gostava de fazer?',
            answer: answer.depression[2],
        },
        {
            question: '18-O(a) senhor(a) tem medo de que algo ruim lhe aconteça?',
            answer: answer.depression[3],
        },
        {
            question: '19-O(a) Sr.(a) se sente impaciente e agitado(a) com frequência?',
            answer: answer.depression[4],
        },
        {
            question: '20-O(a) senhor(a) tem dificuldades para enxergar?',
            answer: answer.sensorial[0],
        },
        {
            question: '21-O(a) senhor tem dificuldades para ouvir o que as pessoas falam?',
            answer: answer.sensorial[1],
        },
        {
            question: '22-O(a) senhor(a) tem dificuldade para sentir o sabor dos alimentos?',
            answer: answer.sensorial[2],
        },
        {
            question: '23-Por causa dos seus sentidos (visão, audição, paladar), o senhor(a) tem dificuldade de realizar suas atividades cotidianas?',
            answer: answer.sensorial[3],
        },
        {
            question: '24-O(A) senhor(a) necessita de ajuda para fazer compras fora de casa?',
            answer: answer.functional[0],
        },
        {
            question: '25-O(A) senhor(a) necessita de ajuda para usar meios de transporte coletivo (ônibus, metrô e trem)?',
            answer: answer.functional[1],
        },
        {
            question: '26-O(A) senhor(a) necessita de ajuda para cozinhar a própria comida?',
            answer: answer.functional[2],
        },
        {
            question: '27-O(A) senhor(a) necessita de ajuda para usar o telefone?',
            answer: answer.functional[3],
        },
        {
            question: '28-O(A) senhor(a) necessita de ajuda para vestir-se (exceto para colocar as meias e calçados)?',
            answer: answer.functional[4],
        },
        {
            question: '29-O(A) senhor(a) necessita de ajuda para tomar banho?',
            answer: answer.functional[5],
        },
        {
            question: '30-O(a) senhor tem dificuldades para mastigar?',
            answer: answer.malnutrition[0],
        },
        {
            question: '31-O(a) senhor(a) faz menos do que três refeições por dia?',
            answer: answer.malnutrition[1],
        },
        {
            question: '32-Nos últimos 3 meses, o(a) senhor(a) percebeu que passou a comer menos sem motivo?',
            answer: answer.malnutrition[2],
        },
        {
            question: '33 -Nos últimos 3 meses, o(a) senhor(a) perdeu peso sem motivo aparente? Se sim, quantos quilos?',
            answer: answer.malnutrition[3],
        },
        {
            question: '34-Nos últimos 3 meses, o(a) senhor(a) passou por algum estresse psicológico?',
            answer: answer.malnutrition[4],
        },
        {
            question: '35 -Índice de Massa Corporal:',
            answer: answer.malnutrition[5],
        },
        {
            question: '36-O(a) senhor(a) tem histórico familiar (pais, irmãos ou filhos) de DCV (infarto, derrame, angina)?',
            answer: answer.cardiovasculars[0],
        },
        {
            question: '37-O(a) senhor(a) tem pressão alta (superior a 140 x 90 mmHg)?',
            answer: answer.cardiovasculars[1],
        },
        {
            question: '38-O(a) senhor(a) tem glicemia de jejum superior a 100 mg/dL?',
            answer: answer.cardiovasculars[2],
        },
        {
            question: '39-O(a) senhor(a) tem colesterol alterado?',
            answer: answer.cardiovasculars[3],
        },
        {
            question: '40-O(a) senhor(a) fuma ou deixou de fumar nos últimos seis meses?',
            answer: answer.cardiovasculars[4],
        },
        {
            question: '41 -O(a) senhor(a) tem o hábito de ingerir bebidas alcoólicas?',
            answer: answer.cardiovasculars[5],
        },
        {
            question: '42 -O(a) senhor(a) pratica exercícios físicos regulares (caminhada, natação, dança, ginástica, musculação, entre outros)?',
            answer: answer.cardiovasculars[6],
        },
        {
            question: '43-IMC para obesidade: ≥27 Kg/m2',
            answer: answer.cardiovasculars[7],
        },
        {
            question: '44 -Nos últimos 5 anos, algum médico ou outro profissional de saúde já disse que o(a) senhor(a) tem?',
            answer: [
                'Doença do coração (angina, infarto ou ataque cardíaco)',
                'Pressão alta/ hipertensão',
                'Derrame/AVC/Isquemia',
                'Diabetes Mellitus',
                'Tumor maligno/ Câncer',
                'Asma/Bronquite/Enfisema',
                'Osteoporose? (Osteopenia?)',
                'Reumatismo',
                'Tendinite',
                'Problemas de circulação',
                'Depressão'
            ].filter((_, i) => (answer.medicine_44.checks[i] === 'on')).concat(answer.medicine_44.others).join('; '),
        },
        {
            question: '45 -O(a) senhor(a) tem algum dos seguintes problemas de saúde:',
            answer: [
                'Dor de cabeça',
                'Dor nas costas ou em outra parte do corpo',
                'Alergia',
                'Problema emocional',
                'Tontura',
                'Dificuldades para dormir',
                'Incontinência urinária/perda de urina (por esforço)',
            ].filter((_, i) => (answer.medicine_45.checks[i] === 'on')).concat(answer.medicine_45.others).join('; '),
        },
        {
            question: '46 -Quais os medicamentos utilizados pelo(a) senhor(a)? Registre a quantidade (em números) de medicamentos inapropriados utilizados:',
            answer: answer.medicine[0],
        },
        {
            question: '47-O(A) senhor(a) sabe para que serve todos os seus medicamentos?',
            answer: answer.medicine[1],
        },
        {
            question: '48-Nos últimos 6 meses, houve aumento progressivo na quantidade de medicamentos prescritos para o(a) senhor(a)?',
            answer: answer.medicine[2],
        },
        {
            question: '49-Os medicamentos que o(a) senhor(a) faz uso foram prescritos por médicos diferentes?',
            answer: answer.medicine[3],
        },
        {
            question: '50-O(a) senhor(a) toma os medicamentos de acordo com as orientações médicas?',
            answer: answer.medicine[4],
        },
        {
            question: '51-O (a) senhor(a) deixa de tomar seus medicamentos com frequência?',
            answer: answer.medicine[5],
        },
        {
            question: '52-O(a) senhor(a) tem o costume de tomar remédios por conta própria?',
            answer: answer.medicine[6],
        },
        {
            question: '53-Verificar na lista de medicamentos potencialmente inapropriados para idosos brasileiros (anexada ao PAGe) se o(a) idoso(a) toma algum dos medicamentos citados na mesma. [Caso sim, pontue ao lado e os deixe destacados na lista.]',
            answer: answer.medicine[7],
        },
        {
            question: '54-Cálculo do risco para reações adversas.',
            answer: answer.medicine[8],
        },
        {
            question: '55 -O(a) senhor(a) tem:',
            answer: `${answer.support_55.spouse ? 'Cônjuge; ' : ''}${answer.support_55.parents || '0'} Pais; ${answer.support_55.siblings || '0'} Irmãos; ${answer.support_55.children || '0'} Filhos; ${answer.support_55.grandchildren || '0'} Netos; ${answer.support_55.greatgrandchildren || '0'} Bisnetos.`,
        },
        {
            question: '56-O(a) senhor(a) encontra pessoas que gosta com frequência?',
            answer: answer.support[0],
        },
        {
            question: '57-O(a) senhor(a) participa de decisões tomadas pela sua família?',
            answer: answer.support[1],
        },
        {
            question: '58-O(a) senhor(a) se sente satisfeito(a) com os seus relacionamentos afetivos?',
            answer: answer.support[2],
        },
        {
            question: '59-O(a) senhor(a) pode contar com alguém se precisar de dinheiro?',
            answer: answer.support[3],
        },
        {
            question: '60-O(a) senhor(a) pode contar com alguém para ajudá-lo(a) a resolver problemas?',
            answer: answer.support[4],
        },
        {
            question: '61-O(a) senhor(a) tem pessoas com quem possa se divertir e relaxar?',
            answer: answer.support[5],
        },
        {
            question: '62-O (a) senhor(a) participa de eventos socioculturais, tais como: peças de teatro, cinema, universidade aberta a terceira idade, centro de convivência, festas, ligado à religião etc.).',
            answer: answer.support[6],
        },
        {
            question: '63-O(a) senhor(a) é atendido regularmente por serviços de saúde?',
            answer: answer.support[7],
        },
        {
            question: '64-O(a) senhor(a) tem medo de alguém do seu convívio?',
            answer: answer.violence[0],
        },
        {
            question: '65-O(a) senhor se sente abandonado?',
            answer: answer.violence[1],
        },
        {
            question: '66-Alguém tem falado com o(a) senhor(a) de forma que se sinta mal consigo mesmo(a)?',
            answer: answer.violence[2],
        },
        {
            question: '67-Alguém tem agredido o(a) senhor(a) fisicamente?',
            answer: answer.violence[3],
        },
        {
            question: '68-O(a) senhor tem passado necessidades (de roupas, alimentação, medicamentos ou outras)?',
            answer: answer.violence[4],
        },
        {
            question: '69-Alguém tem usado o dinheiro do(a) senhor(a) sem a sua autorização?',
            answer: answer.violence[5],
        },
        {
            question: '70-Alguém do seu convívio já tocou o corpo do(a) senhor(a) sem o seu consentimento?',
            answer: answer.violence[6],
        },
        {
            question: '71-O(a) senhor está deixando de cuidar de si próprio?',
            answer: answer.violence[7],
        },
        {
            question: '72-Na casa do(a) senhor(a), os móveis próximos as áreas de circulação são estáveis (firmes)?',
            answer: answer.environment[0],
        },
        {
            question: '73-Na casa do(a) senhor(a), há objetos (chinelos, brinquedos, tapetes, etc) soltos nas áreas de circulação?',
            answer: answer.environment[1],
        },
        {
            question: '74-Na casa do(a) senhor(a), o piso é escorregadio (ex. encerado, molhado)?',
            answer: answer.environment[2],
        },
        {
            question: '75-Na casa do(a) senhor(a), há tapetes antiderrapantes (fora e dentro do box)?',
            answer: answer.environment[3],
        },
        {
            question: '76-Na casa do(a) senhor(a), há escadas?',
            answer: answer.environment[4],
        },
        {
            question: '77-Na casa do(a) senhor(a), as escadas são iluminadas?',
            answer: answer.environment[5],
        },
        {
            question: '78-Na casa do(a) senhor(a), as escadas possuem corrimãos em ambos os lados?',
            answer: answer.environment[6],
        },
        {
            question: '79-O(a) senhor(a) costuma subir em banquetas ou cadeiras para alcançar objetos altos?',
            answer: answer.environment[7],
        },
        {
            question: '80-O(a) senhor(a) costuma acender as luzes ao levantar-se à noite?',
            answer: answer.environment[8],
        },
        {
            question: '81-O(a) senhor(a) costuma utilizar calçados seguros e adequados (solado antiderrapante, bem ajustados e firmes no pé, sem saltos etc)?',
            answer: answer.environment[9],
        },
        {
            question: '82-As calçadas próximas à sua residência são bem cuidadas (pavimentadas, lisas e sem buracos)?',
            answer: answer.environment[10],
        },
        {
            question: '83-No seu bairro, o transporte público é acessível?',
            answer: answer.environment[1],
        },
        {
            question: '84-No seu bairro, o comércio é acessível?',
            answer: answer.environment[12],
        },
        {
            question: '85-No seu bairro, há facilidade e prazer em andar (a pé/com cadeiras de rodas/bengala/ andador)?',
            answer: answer.environment[13],
        },
        {
            question: '86-No seu bairro, a diversão (restaurantes, cinema, clubes, etc) é acessível?',
            answer: answer.environment[14],
        },
        {
            question: '87-O seu bairro é seguro?',
            answer: answer.environment[15],
        },
        {
            question: '88 -O(a) senhor(a) sofreu alguma queda nos últimos 12 meses? Se sim, quantas?',
            answer: answer.falls[0],
        },
        {
            question: '89 -O(a) senhor(a) sofreu alguma fratura decorrente destas quedas ? Se sim, quais?',
            answer: answer.falls[1],
        },
        {
            question: '90-O que o (a) senhor(a) estava fazendo quando sofreu essa(s) queda(s)?',
            answer: answer.falls_90,
        },
        {
            question: '91-Avaliação de força de MMII.',
            answer: answer.falls[2],
        },
        {
            question: '92-Avaliação de equilíbrio.',
            answer: answer.falls[3],
        },
        {
            question: '93-O(a) senhor(a) faz uso de dispositivo de auxílio à marcha (bengala, andador) sem orientação profissional?',
            answer: answer.falls[4],
        },
        {
            question: '94-Idade > 75 anos',
            answer: answer.falls[5],
        },
        {
            question: '95-Gênero feminino',
            answer: answer.falls[6],
        },
        {
            question: '96-Alterações cognitivas',
            answer: answer.falls[7],
        },
        {
            question: '97-Comprometimento AVDs',
            answer: answer.falls[8],
        },
        {
            question: '98-Déficit visual',
            answer: answer.falls[9],
        },
        {
            question: '99-Riscos domésticos',
            answer: answer.falls[10],
        },
        {
            question: '100-Riscos comportamentais',
            answer: answer.falls[11],
        },
        {
            question: '101-Inatividade',
            answer: answer.falls[12],
        },
        {
            question: '102-Acidente Vascular Encefálico prévio',
            answer: answer.falls[13],
        },
        {
            question: '103-Faz uso de medicações psicotrópicas, em especial benzodiazepínicos, ou uso continuo de 5 ou mais medicações (polifarmacia)',
            answer: answer.falls[14],
        },
        {
            question: '104-Apresenta alguma das doenças a seguir: hipertensão, tontura/ vertigem, Parkinson, amputação de membros inferiores, convulsões, artrite, osteoporose, incontinência, diabetes, neuropatia, hipotensão postural',
            answer: answer.falls[15],
        },
    ];

    return (
        <div
            className="flex flex-1 flex-col gap-4 min-h-[600px] print:!max-w-[70%]"
            style={{ maxWidth: `calc(80vw - var(--sidebar)` }}
        >
            <h1 className="text-2xl font-bold mb-4">Detalhes da Resposta</h1>
            <div className="p-6 rounded-lg">
                {pageFields.map((field, index) => (
                    <div key={index} className="mb-4">
                        <h2 className="font-semibold">{field.question}</h2>
                        <p>{field.answer === '1' ? 'SIM' : field.answer === '0' ? 'NÃO' : field.answer.toString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnswerDetailsPage;