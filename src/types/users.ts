export interface Account {
    uid?: string,
    email: string,
    type?: string,
    name: string,
    surname: string,
    social_name?: string,
}

export interface Specialist extends Account{
	phone: string;
	connection: string;
    gender: string;
    specialty: string;
    password?: string;
    confirm_password?: string;
    type?: 'specialist';
}

export interface User extends Account{
	race?: string;
    schooling?: string;
    individual_income?: string;
    family_income?: string;
    address?: string;
    birthday?: Date;
    phone?: string;
    gender?: string;
    password?: string;
    confirm_password?: string;
    type?: 'user';
    specialistId?: string;
}