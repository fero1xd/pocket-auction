import type {
	AvailableAuthProviders,
	CredentialsInput,
	RegisterPayload,
	ResedentialInput,
	ResedentialPayload
} from './types';

export interface CredentialsFormEvent {
	submit: RegisterPayload;
	login: AvailableAuthProviders;
}

export interface ResedentialFormEvent {
	submit: ResedentialPayload;
	login: AvailableAuthProviders;
}

interface InputChangeEvent {
	name: string;
	value: string;
}

export interface CredentialInputChangeEvent extends InputChangeEvent {
	name: CredentialsInput;
}

export interface ResedentialInputChangeEvent extends InputChangeEvent {
	name: ResedentialInput;
}

export interface InputDispatchEvent {
	change: CredentialInputChangeEvent | ResedentialInputChangeEvent;
}
