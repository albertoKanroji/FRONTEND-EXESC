// Definición de interfaces
export interface Pivot {
    questions_id: number;
    options_id: number;
}

export interface Option {
    id: number;
    answer: string;
    pivot: Pivot;
}

export interface Question {
    id: number;
    question: string;
    surveys_id: number;
    options: Option[];
}

export interface EncuestaData {
    id: number;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
    questions: Question[];
}

export interface EncuestaResponse {
    success: boolean;
    status: number;
    message: string;
    data: EncuestaData;
}
