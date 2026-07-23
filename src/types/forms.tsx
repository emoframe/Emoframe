import { TemplateElementInstance } from "@/components/template/TemplateElements";
import { ColumnDef } from "@tanstack/react-table";
import { ImageCard } from '@/components/ui/image'; 
import { ReactElement } from "react";
import { User } from "./users";

export type Instruments = {
    value: Lowercase<string>;
    label: string;
    description?: string,
    locales: string[];
}

export type Option = {
    value: string;
    label: string;
};

export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export interface RadioItem {
    value: string;
    label: string;
}

export interface Template {
    uid?: string,
    specialistId: string,
    title: string,
    description?: string,
    questions_size: number,
    scale_type: string,
    questions?: TemplateElementInstance[],
    published: boolean,
}

export type Evaluation = {
    uid?: string,
    specialist: string,
    users: string[],
    answered?: string[],
    identification: string,
    date: Date,
    method: string,
    answers?: Answer[];
} & (
    { instrument: "template", templateId: string } |
    { instrument: Exclude<string, "template">, templateId?: never }
);

export type Answer = {
    uid?: string;
    datetime?: Date;
    [key: string]: any;
}

export type Result = {
    user: User,
    evaluation: Evaluation,
    answer: Answer
}

export type FillEvaluationForm = {
    userId: string;
    evaluationId: string;
    isViewable?: never;
} | {
    userId?: never;
    evaluationId?: never;
    isViewable: true;
}

export type TemplateFormProps = (FillEvaluationForm & {
    content: TemplateElementInstance[];
});

export type TemplateAnswers = {
    [key: string]: string;
};

export interface Panas {
    repulsion: string;
    tormented: string;
    scared: string;
    hearty: string;
    excited: string;
    guilty: string;
    enthusiastic: string;
    pleasantly_surprised: string;
    disturbed: string;
    trembling: string;
    active: string;
    proud: string;
    inspired: string;
    nervous: string;
    angry: string;
    determined: string;
    charmed: string;
    remorse: string;
    frightened: string;
}

export const panasQuestions = [
    { index: 1, field: 'interested', question: 'questionInterestedLabel', type: 'positive' },
    { index: 2, field: 'distressed', question: 'questionDistressedLabel', type: 'negative' },
    { index: 3, field: 'excited', question: 'questionExcitedLabel', type: 'positive' },
    { index: 4, field: 'upset', question: 'questionUpsetLabel', type: 'negative' },
    { index: 5, field: 'strong', question: 'questionStrongLabel', type: 'positive' },
    { index: 6, field: 'guilty', question: 'questionGuiltyLabel', type: 'negative' },
    { index: 7, field: 'scared', question: 'questionScaredLabel', type: 'negative' },
    { index: 8, field: 'hostile', question: 'questionHostileLabel', type: 'negative' },
    { index: 9, field: 'enthusiastic', question: 'questionEnthusiasticLabel', type: 'positive' },
    { index: 10, field: 'proud', question: 'questionProudLabel', type: 'positive' },
    { index: 11, field: 'irritable', question: 'questionIrritableLabel', type: 'negative' },
    { index: 12, field: 'alert', question: 'questionAlertLabel', type: 'positive' },
    { index: 13, field: 'ashamed', question: 'questionAshamedLabel', type: 'negative' },
    { index: 14, field: 'inspired', question: 'questionInspiredLabel', type: 'positive' },
    { index: 15, field: 'nervous', question: 'questionNervousLabel', type: 'negative' },
    { index: 16, field: 'determined', question: 'questionDeterminedLabel', type: 'positive' },
    { index: 17, field: 'attentive', question: 'questionAttentiveLabel', type: 'positive' },
    { index: 18, field: 'jittery', question: 'questionJitteryLabel', type: 'negative' },
    { index: 19, field: 'active', question: 'questionActiveLabel', type: 'positive' },
    { index: 20, field: 'afraid', question: 'questionAfraidLabel', type: 'negative' }
];

export interface Sam {
    satisfaction: string;
    motivation: string;
    willpower: string;
}

// Função para criar componentes ImageCard
const createImageCard = (src: string, alt: string): ReactElement<typeof ImageCard> => <ImageCard src={src} alt={alt} height={100} width={100} />;

export const samQuestions = [
  {
    index: 1,
    field: "satisfaction",
    label: "Satisfaction",
    options: [
      { value: '1', label: createImageCard("/emojis/Like.png", "Emoji") },
      { value: '2', label: <div className={"m-10"}></div> },
      { value: '3', label: createImageCard("/emojis/Sorriso.png", "Emoji") },
      { value: '4', label: <div className={"m-10"}></div> },
      { value: '5', label: createImageCard("/emojis/Neutro.png", "Emoji") },
      { value: '6', label: <div className={"m-10"}></div> },
      { value: '7', label: createImageCard("/emojis/Triste.png", "Emoji") },
      { value: '8', label: <div className={"m-10"}></div> },
      { value: '9', label: createImageCard("/emojis/Deslike.png", "Emoji") },
    ]
  },
  {
    index: 2,
    field: "motivation",
    label: "Motivation",
    options: [
      { value: '1', label: createImageCard("/emojis/Criativo.png", "Emoji") },
      { value: '2', label: <div className={"m-10"}></div> },
      { value: '3', label: createImageCard("/emojis/Radiante.png", "Emoji") },
      { value: '4', label: <div className={"m-10"}></div> },
      { value: '5', label: createImageCard("/emojis/Neutro.png", "Emoji") },
      { value: '6', label: <div className={"m-10"}></div> },
      { value: '7', label: createImageCard("/emojis/Entediado.png", "Emoji") },
      { value: '8', label: <div className={"m-10"}></div> },
      { value: '9', label: createImageCard("/emojis/Sono.png", "Emoji") },
    ]
  },
  {
    index: 3,
    field: "willpower",
    label: "Feeling of Control",
    options: [
      { value: '9', label: createImageCard("/emojis/Inteligente.png", "Emoji") },
      { value: '8', label: <div className={"m-10"}></div> },
      { value: '7', label: createImageCard("/emojis/Sorriso.png", "Emoji") },
      { value: '6', label: <div className={"m-10"}></div> },
      { value: '5', label: createImageCard("/emojis/Neutro.png", "Emoji") },
      { value: '4', label: <div className={"m-10"}></div> },
      { value: '3', label: createImageCard("/emojis/Confuso.png", "Emoji") },
      { value: '2', label: <div className={"m-10"}></div> },
      { value: '1', label: createImageCard("/emojis/Frustrado.png", "Emoji") },
    ]
  }
];

export interface Sus {
    use_frequency: string;
    use_complex: string;
    use_easy: string;
    need_help: string;
    function_integration: string;
    inconsistency: string;
    learning_curve: string;
    jumbled: string;
    confidence: string;
    learn_system: string;
}

export const susQuestions = [
    { index: 1, field: "use_frequency", label: "questionnaireUseFrequencyLabel" },
    { index: 2, field: "use_complex", label: "questionnaireUseComplexLabel" },
    { index: 3, field: "use_easy", label: "questionnaireUseEasyLabel" },
    { index: 4, field: "need_help", label: "questionnaireNeedHelpLabel" },
    { index: 5, field: "function_integration", label: "questionnaireFunctionIntegrationLabel" },
    { index: 6, field: "inconsistency", label: "questionnaireInconsistencyLabel" },
    { index: 7, field: "learning_curve", label: "questionnaireLearningCurveLabel" },
    { index: 8, field: "jumbled", label: "questionnaireJumbledLabel" },
    { index: 9, field: "confidence", label: "questionnaireConfidenceLabel" },
    { index: 10, field: "learn_system", label: "questionnaireLearnSystemLabel" }
];

export interface GamefulQuest {
    acc_complete_things: number;
    acc_strive_accomplishments: number;
    acc_maintain_standards: number;
    acc_success_accomplishments: number;
    acc_next_level: number;
    acc_progress_better: number;
    acc_clear_goals: number;
    acc_reach_goals: number;

    cha_push_limits: number;
    cha_brink_give_up: number;
    cha_positive_pressure: number;
    cha_challenges_me: number;
    cha_lot_effort: number;
    cha_highly_demanding: number;
    cha_continuously_improve: number;
    cha_close_capable: number;

    com_participate_competition: number;
    com_inspires_compete: number;
    com_competitive_aspects: number;
    com_first_place: number;
    com_victory_important: number;
    com_feel_race: number;
    com_win_to_succeed: number;

    gui_feel_guided: number;
    gui_sense_directed: number;
    gui_keeping_track: number;
    gui_have_instructor: number;
    attention_check_4: number; 
    gui_structured_help: number;
    gui_know_do_better: number;
    gui_useful_feedback: number;

    imm_time_fast: number;
    imm_grabs_attention: number;
    imm_separated_world: number;
    imm_lose_myself: number;
    imm_actions_automatic: number;
    imm_stop_tired: number;
    imm_forget_concerns: number;
    imm_ignore_around: number;
    imm_emotionally_involved: number;

    pla_playful_experience: number;
    pla_room_spontaneous: number;
    pla_taps_imagination: number;
    pla_can_be_creative: number;
    pla_explore_things: number;
    pla_mystery_reveal: number;
    pla_what_comes_next: number;
    pla_discover_new: number;
    pla_appeals_curiosity: number;

    soc_not_alone: number;
    soc_social_support: number;
    soc_socially_involved: number;
    soc_connected_others: number;
    soc_social_experience: number;
    soc_share_endeavors: number;
    soc_influences_social: number;
    soc_noticed_achieved: number;
}

export interface Iuxrv {
    feeling_nauseous: number;
    feeling_dizzy: number;
    general_discomfort: number;
    tired_eyes: number;
    headache: number;
    easy_to_do_things: number;
    did_things_confidently: number;
    few_steps_required: number;
    felt_in_control: number;
    learned_quickly: number;
    elegant_world: number;
    fascinating_world: number;
    beautiful_world: number;
    fun_world: number;
    exciting_world: number;
    forgot_it_was_virtual: number;
    forgot_vr_equipment: number;
    believed_things_were_real: number;
    forgot_real_world: number;
    felt_it_could_be_real: number;
    felt_good: number;
    felt_content: number;
    felt_irritated: number;
    felt_frustrated: number;
    felt_happy: number;
}



export interface Gamex {
    game_was_fun: number;
    enjoyed_playing: number;
    enjoyed_a_lot: number;
    pleasurable_experience: number;
    highly_engaging: number;
    play_voluntarily: number;

    forgot_location: number;
    forgot_surroundings: number;
    back_to_reality: number;
    disconnect_from_everything: number;
    ignored_surroundings: number;
    lost_track_of_time: number;

    stimulated_imagination: number;
    felt_creative: number;
    sense_of_exploration: number;
    felt_adventurous: number;

    felt_active: number;
    felt_restless: number;
    felt_frantic: number;
    felt_excited: number;

    felt_upset: number;
    felt_nervous: number;
    felt_frustrated: number;

    felt_in_command: number;
    felt_influential: number;
    felt_independent: number;
    felt_confident: number;

    attention_check: number;
}

export interface Ssq {
    general_discomfort: number;       
    fatigue: number;                  
    headache: number;                 
    eyestrain: number;                
    difficulty_focusing: number;      
    salivation_increase: number;      
    sweating: number;                 
    nausea: number;                   
    difficulty_concentrating: number; 
    fullness_of_head: number;         
    blurred_vision: number;           
    dizziness_eyes_open: number;      
    dizziness_eyes_closed: number;    
    vertigo: number;                  
    stomach_awareness: number;        
    burping: number;                  
    other: number;                    
    attention_check_ssq: number;      
}

export const gamexQuestions = [
    { index: 1, field: "game_was_fun", label: "gameWasFunLabel" },
    { index: 2, field: "enjoyed_playing", label: "enjoyedPlayingLabel" },
    { index: 3, field: "enjoyed_a_lot", label: "enjoyedALotLabel" },
    { index: 4, field: "pleasurable_experience", label: "pleasurableExperienceLabel" },
    { index: 5, field: "highly_engaging", label: "highlyEngagingLabel" },
    { index: 6, field: "play_voluntarily", label: "playVoluntarilyLabel" },
    
    { index: 7, field: "forgot_location", label: "forgotLocationLabel" },
    { index: 8, field: "forgot_surroundings", label: "forgotSurroundingsLabel" },
    { index: 9, field: "back_to_reality", label: "backToRealityLabel" },
    { index: 10, field: "disconnect_from_everything", label: "disconnectFromEverythingLabel" },
    { index: 11, field: "ignored_surroundings", label: "ignoredSurroundingsLabel" },
    { index: 12, field: "lost_track_of_time", label: "lostTrackOfTimeLabel" },
    
    { index: 13, field: "stimulated_imagination", label: "stimulatedImaginationLabel" },
    { index: 14, field: "felt_creative", label: "feltCreativeLabel" },
    { index: 15, field: "sense_of_exploration", label: "senseOfExplorationLabel" },
    { index: 16, field: "felt_adventurous", label: "feltAdventurousLabel" },
    
    { index: 17, field: "felt_active", label: "feltActiveLabel" },
    { index: 18, field: "felt_restless", label: "feltRestlessLabel" },
    { index: 19, field: "felt_frantic", label: "feltFranticLabel" },
    { index: 20, field: "felt_excited", label: "feltExcitedLabel" },
    
    { index: 21, field: "felt_upset", label: "feltUpsetLabel" },
    { index: 22, field: "felt_nervous", label: "feltNervousLabel" },
    { index: 23, field: "felt_frustrated", label: "feltFrustratedLabel" },
    
    { index: 24, field: "felt_in_command", label: "feltInCommandLabel" },
    { index: 25, field: "felt_influential", label: "feltInfluentialLabel" },
    { index: 26, field: "felt_independent", label: "feltIndependentLabel" },
    { index: 27, field: "felt_confident", label: "feltConfidentLabel" },
    
    { index: 28, field: "attention_check", label: "attentionCheckLabel" }
] as const;

export interface Eaz {
    happy: string,
    tired: string,
    worried: string,
    confident: string,
    courageous: string,
    nervous: string,
    determined: string,
    guilty: string,
    passionate: string,
    angry: string,
    brave: string,
    open_new_things: string,
    happy_person: string,
    easy_to_anger:  string,
    proud_about_myself: string,
    humiliated: string,
    sad: string,
    grumpy: string,
    rage: string,
    resilient: string
}

export interface Brums {
    cheered_up: string,
    irritated: string,
    depressed: string,
    terrified: string,
    crestfallen: string,
    broken_down: string,
    confused: string,
    exhausted: string,
    anxious: string,
    unhappy: string,
    huffy: string,
    worried: string,
    sad: string,
    sleepy: string,
    insecure: string,
    willing: string,
    tense: string,
    disoriented: string,
    grumpy: string,
    undecided: string,
    tired: string,
    energy: string,
    angry: string,
    alert: string,
}

export interface Imiteq {
    int_enjoyed_task: number;
    int_interesting: number;
    int_fun: number;
    int_enjoyed_very_much: number;
    int_boring_rev: number; 
    int_enjoyable: number;

    com_pretty_good: number;
    com_did_well_compared: number;
    com_satisfied_performance: number;
    com_pretty_skilled: number;
    com_pretty_competent: number;

    cho_my_choice: number;
    cho_no_choice_rev: number;
    cho_did_what_wanted: number;
    cho_had_to_do_rev: number;
    cho_because_no_choice_rev: number;
    attention_check_imiteq: number;

    pre_not_nervous_rev: number;
    pre_tense: number;
    pre_relaxed_rev: number;
    pre_anxious: number;
    pre_pressured: number;
}

export interface Gds {
    satisfied: string,
    no_activities: string,
    empty: string,
    upset: string,
    good: string,
    bad: string,
    happy: string,
    helpless: string,
    stay_at_home: string,
    problems_of_memory: string,
    wonderful_to_stay_alive: string,
    useless: string,
    full_of_energy: string,
    hopeless: string,
    unlucky: string,
}

export const gdsQuestions = [
    { index: 1, field: "satisfied", score: "Negative", question: "question1Label" },
    { index: 2, field: "no_activities", score: "Affirmative", question: "question2Label" },
    { index: 3, field: "empty", score: "Affirmative", question: "question3Label" },
    { index: 4, field: "upset", score: "Affirmative", question: "question4Label" },
    { index: 5, field: "good", score: "Negative", question: "question5Label" },
    { index: 6, field: "bad", score: "Affirmative", question: "question6Label" },
    { index: 7, field: "happy", score: "Negative", question: "question7Label" },
    { index: 8, field: "helpless", score: "Affirmative", question: "question8Label" },
    { index: 9, field: "stay_at_home", score: "Affirmative", question: "question9Label" },
    { index: 10, field: "problems_of_memory", score: "Affirmative", question: "question10Label" },
    { index: 11, field: "wonderful_to_stay_alive", score: "Negative", question: "question11Label" },
    { index: 12, field: "useless", score: "Affirmative", question: "question12Label" },
    { index: 13, field: "full_of_energy", score: "Negative", question: "question13Label" },
    { index: 14, field: "hopeless", score: "Affirmative", question: "question14Label" },
    { index: 15, field: "unlucky", score: "Affirmative", question: "question15Label" }
];

export interface Hexad {
    phi_help_others: number;
    phi_orient_situations: number;
    phi_share_knowledge: number;
    phi_wellbeing_others: number;

    soc_interacting_important: number;
    soc_part_of_team: number;
    soc_part_of_community: number;
    soc_enjoy_group: number;

    fre_own_path: number;
    fre_curiosity_guide: number;
    fre_independent: number;
    fre_self_expression: number;

    ach_defeating_obstacles: number;
    ach_mastering_difficult: number;
    ach_improve_skills: number;
    ach_emerging_victorious: number;

    pla_competitions_prize: number;
    pla_rewards_motivate: number;
    pla_roi_important: number;
    pla_reward_effort: number;

    dis_provoke: number;
    dis_question_status_quo: number;
    dis_rebel: number;
    dis_dislike_rules: number;

    attention_check_hexad: number;
}

export interface Pq {
    ada_control_events: number;             
    ada_anticipate_happen: number;
    ada_survey_vision: number;              
    ada_moving_around: number;              
    ada_examine_objects: number;            
    ada_examine_multiple_viewpoints: number;
    ada_manipulate_objects: number;         
    ada_adjust_experience: number;          
    ada_proficient_moving: number;          
    ada_adjust_control_devices: number;     

    ifq_responsive_environment: number;     
    ifq_delay_actions: number;              
    ifq_visual_interfere: number;           
    ifq_control_interfere: number;          
    ifq_concentrate_tasks: number;          

    inv_natural_interactions: number;       
    inv_visual_involve: number;             
    inv_natural_mechanism: number;          
    inv_involved_experience: number;        
    inv_senses_engaged: number;             
    inv_focused_task: number;               
    attention_check_pq: number;             

    sen_auditory_involve: number;           
    sen_compelling_objects: number;         
    sen_consistent_real_world: number;      
    sen_identify_sounds: number;            
    sen_localize_sounds: number;            
    sen_survey_touch: number;               
    sen_identify_physical: number;          
    sen_consistent_senses: number;          
}

export interface Leap {
    admiration: string,
    relieved: string,
    tired: string,
    happy: string,
    accept: string,
    heat: string,
    satisfied: string,
    jealous: string,
    attracted: string,
    calm: string,
    funny: string,
    desire: string,
    careful: string,
    strange: string,
    hopeful: string,
    fall_in_love: string,
    conformed: string,
    hungry: string,
    guilty: string,
    cold: string,
    despise: string,
    take_pity_on: string,
    disgusting: string,
    need: string,
    duty: string,
    envy: string,
    humiliated: string,
    interested: string,
    fear: string,
    proud: string,
    shame: string,
    angry: string,
    sleepy: string,
    longing: string,
    sad: string,
    surprised: string,
    thirst: string,
    thoughtful: string,
    serious: string,
    scared: string
}

export const leapQuestions = [
    { index: 1, field: 'fear', factor: 'Fator 1', question: "Estou com medo." },
    { index: 2, field: 'scared', factor: 'Fator 1', question: "Estou assustado(a)." },
    { index: 3, field: 'shame', factor: 'Fator 1', question: "Estou com vergonha." },
    { index: 4, field: 'serious', factor: 'Fator 1', question: "Estou sem graça." },
    { index: 5, field: 'guilty', factor: 'Fator 1', question: "Sinto-me culpado(a)." },
    { index: 6, field: 'sad', factor: 'Fator 1', question: "Sinto-me triste." },
    { index: 7, field: 'humiliated', factor: 'Fator 1', question: "Sinto-me humilhado(a)." },
    { index: 8, field: 'take_pity_on', factor: 'Fator 1', question: "Tenho pena de alguém." },
    { index: 9, field: 'surprised', factor: 'Fator 2', question: "Sinto-me surpreso(a)." },
    { index: 10, field: 'happy', factor: 'Fator 2', question: "Estou alegre." },
    { index: 11, field: 'proud', factor: 'Fator 2', question: "Sinto-me orgulhoso(a)." },
    { index: 12, field: 'relieved', factor: 'Fator 2', question: "Estou aliviado(a)." },
    { index: 13, field: 'hopeful', factor: 'Fator 2', question: "Estou com esperança." },
    { index: 14, field: 'interested', factor: 'Fator 2', question: "Sinto-me interessado(a)." },
    { index: 15, field: 'calm', factor: 'Fator 2', question: "Sinto-me calmo(a)." },
    { index: 16, field: 'funny', factor: 'Fator 2', question: "Acho algo engraçado." },
    { index: 17, field: 'admiration', factor: 'Fator 2', question: "Sinto uma admiração por alguém." },
    { index: 18, field: 'longing', factor: 'Fator 2', question: "Sinto saudade de alguém." },
    { index: 19, field: 'despise', factor: 'Fator 3', question: "Faço pouco caso de alguém." },
    { index: 20, field: 'angry', factor: 'Fator 3', question: "Sinto raiva." },
    { index: 21, field: 'disgusting', factor: 'Fator 3', question: "Estou com nojo." },
    { index: 22, field: 'envy', factor: 'Fator 3', question: "Sinto inveja de alguém." },
    { index: 23, field: 'attracted', factor: 'Fator 4', question: "Sinto atração sexual por alguém." },
    { index: 24, field: 'fall_in_love', factor: 'Fator 4', question: "Estou gostando de alguém." },
    { index: 25, field: 'jealous', factor: 'Fator 4', question: "Sinto ciúme de alguém." },
    { index: 26, field: 'need', factor: 'Fator 5', question: "Sinto uma necessidade." },
    { index: 27, field: 'thoughtful', factor: 'Fator 5', question: "Estou refletindo." },
    { index: 28, field: 'desire', factor: 'Fator 5', question: "Sinto um desejo." },
    { index: 29, field: 'duty', factor: 'Fator 5', question: "Sinto uma obrigação." },
    { index: 30, field: 'sleepy', factor: 'Fator 6', question: "Estou com sono." },
    { index: 31, field: 'hungry', factor: 'Fator 6', question: "Estou com fome." },
    { index: 32, field: 'thirst', factor: 'Fator 6', question: "Estou com sede." },
    { index: 33, field: 'tired', factor: 'Fator 6', question: "Estou cansado(a)." },
    { index: 34, field: 'careful', factor: 'Fator 7', question: "Estou tomando cuidado." },
    { index: 35, field: 'strange', factor: 'Fator 7', question: "Acho algo estranho." },
    { index: 36, field: 'cold', factor: 'Fator 8', question: "Estou com frio." },
    { index: 37, field: 'heat', factor: 'Fator 8', question: "Estou com calor." },
    { index: 38, field: 'conformed', factor: 'Fator 9', question: "Estou conformado(a)." },
    { index: 39, field: 'accept', factor: 'Fator 9', question: "Estou aceitando alguma coisa." },
    { index: 40, field: 'satisfied', factor: 'Fator 9', question: "Estou cheio(a)." }
];

export interface Tuq {
    tuq_improves_access: number;
    tuq_saves_time: number;
    tuq_meets_needs: number;
    tuq_simple_to_use: number;
    tuq_easy_to_learn: number;
    tuq_return_activities: number;
    tuq_pleasant_interaction: number;
    tuq_like_using_system: number;
    tuq_simple_easy_understand: number;
    tuq_does_what_i_want: number;
    attention_check_tuq: number; // Questão de atenção
    tuq_easily_talk_professional: number;
    tuq_hear_clearly: number;
    tuq_express_effectively: number;
    tuq_see_well_as_person: number;
    tuq_same_as_in_person: number;
    tuq_easy_error_recovery: number;
    tuq_clear_error_messages: number;
    tuq_comfortable_communicating: number;
    tuq_acceptable_way: number;
    tuq_would_use_again: number;
    tuq_overall_satisfied: number;
}

export interface Ues {
    fa_lost_myself: number;
    fa_lost_track_time: number;
    fa_blocked_out_things: number;
    fa_lost_track_world: number;
    fa_time_slipped_away: number;
    fa_absorbed: number;
    fa_let_myself_go: number;
    
    pu_frustrated_rev: number;
    pu_confusing_rev: number;
    pu_annoyed_rev: number;
    pu_discouraged_rev: number;
    pu_taxing_rev: number;
    pu_demanding_rev: number;
    pu_in_control: number;
    pu_could_not_do_rev: number;

    ae_attractive: number;
    ae_aesthetically_appealing: number;
    ae_liked_graphics: number;
    ae_appealed_visual: number;
    ae_visually_pleasing: number;
    attention_check_ues: number;

    rw_worthwhile: number;
    rw_success: number;
    rw_did_not_work_out_rev: number;
    rw_rewarding: number;
    rw_recommend: number;
    rw_continued_curiosity: number;
    rw_incited_curiosity: number;
    rw_drawn_in: number;
    rw_involved: number;
    rw_fun: number;
}

export const instruments: Instruments[] = [
    {  
        value: "panas",
        label: "PANAS",
        description: "specialist_services_instruments:panas",
        locales: ["en", "pt"],
    },
    {  
        value: "sam",
        label: "SAM",
        description: "specialist_services_instruments:sam",
        locales: ["en", "pt"],
    },
    {  
        value: "sus",
        label: "SUS",
        description: "specialist_services_instruments:sus",
        locales: ["en", "pt"],
    },
    {  
        value: "eaz",
        label: "EAZ",
        description: "specialist_services_instruments:eaz",
        locales: ["pt"],
    },
    {  
        value: "brums",
        label: "BRUMS",
        description: "specialist_services_instruments:brums",
        locales: ["en", "pt"],
    },
    {  
        value: "gds",
        label: "GDS",
        description: "specialist_services_instruments:gds",
        locales: ["en", "pt"],
    },
    {  
        value: "leap",
        label: "LEAP",
        description: "specialist_services_instruments:leap",
        locales: ["pt"],
    },
    {  
        value: "gamex",
        label: "GAMEX",
        description: "specialist_services_instruments:gamex",
        locales: ["en", "pt"],
    },
    {  
        value: "iuxrv",
        label: "IUXRV",
        description: "specialist_services_instruments:iuxrv",
        locales: ["en", "pt"],
    },
    {  
        value: "hexad",
        label: "HEXAD",
        description: "specialist_services_instruments:hexad",
        locales: ["en", "pt"],
    },
    {  
        value: "gameful",
        label: "GAMEFULQUEST",
        description: "specialist_services_instruments:gameful",
        locales: ["en", "pt"],
    },
    {  
        value: "imiteq",
        label: "IMITEQ",
        description: "specialist_services_instruments:imiteq",
        locales: ["en", "pt"],
    },
    {  
        value: "pq",
        label: "PQ",
        description: "specialist_services_instruments:pq",
        locales: ["en", "pt"],
    },
    {  
        value: "ssq",
        label: "SSQ",
        description: "specialist_services_instruments:ssq",
        locales: ["en", "pt"],
    },
    {  
        value: "tuq",
        label: "TUQ",
        description: "specialist_services_instruments:tuq",
        locales: ["en", "pt"],
    },
    {  
        value: "ues",
        label: "UES",
        description: "specialist_services_instruments:ues",
        locales: ["en", "pt"],
    },
];


export const scales: Option[] = [
    {  
      value: "likert",
      label: "Escala Likert",
    },
    {  
      value: "semantic",
      label: "Escala de Diferencial Semântico",
    },
];

export const questions_size: Option[] = [
    {
      label: "Cinco opções",
      value: "5",
    },
    {
      label: "Sete opções",
      value: "7",
    },
    {
      label: "Nove opções",
      value: "9",
    },
  ];

export interface Page {
    cognitive: string[],
    cognitive_result: string,
    age: string[],
    age_result: string,
    depression: string[],
    depression_result: string,
    sensorial: string[],
    sensorial_result: string,   
    functional: string[],
    functional_result: string,
    malnutrition: string[],
    malnutrition_result: string,
    cardiovasculars: string[],
    cardiovasculars_result: string,
    medicine_44: {
        checks: string[],
        others: string,
    },
    medicine_45: {
        checks: string[],
        others: string,
    },
    medicine: string[],
    medicine_result: string,
    support_55: {
        spouse: string,
        parents: string,
        siblings: string,
        children: string,
        grandchildren: string,
        greatgrandchildren: string,
    },
    support: string[],
    support_result: string,
    violence: string[],
    violence_result: string,
    environment: string[],
    environment_result: string,
    falls_90: string,
    falls: string[],
    falls_result: string,
    psychological_note: string,
    biological_note: string,
    socioenvironmental_note: string,
    multidimensional_note: string,
}

interface ActionsAndServicesItem {
    date: Date,
    actions: string,
    services: string,
}

export interface PageFeedback {
    evaluationId: string,
    otherRequirements?: string,
    gerontologistEvaluation: string,
    problems: string,
    objectives: string,
    actionsAndServices: string,
    actionsAndServicesCoordination: ActionsAndServicesItem[],
    reevaluation: ActionsAndServicesItem[],
}


export enum HomeModel{
    Avaliation,
    Process,
    Tool,
    Support
}