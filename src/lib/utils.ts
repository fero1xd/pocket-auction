import type { AuthMethodsList } from 'pocketbase';
import { z } from 'zod';

export const serializeNonPOJOs = (obj: any) => {
	return structuredClone(obj);
};

export const availableAuthProviders = ['github', 'google', 'facebook', 'discord'];

export const getDataForProvider = (
	authMethods: AuthMethodsList,
	providerName: string,
	url: URL
) => {
	const _provider = authMethods.authProviders.find((p) => p.name === providerName);
	if (!_provider) return;

	const redirectURL = `${url.origin}/auth/callback`;
	const authProviderRedirect = `${_provider.authUrl}${redirectURL}`;
	const state = _provider.state;
	const codeVerifier = _provider.codeVerifier;

	return {
		providerName: _provider.name,
		authProviderRedirect: authProviderRedirect,
		authProviderState: state,
		providerCodeVerifier: codeVerifier
	};
};

export const getImageUrl = (collectionName: string, auctionId: string, fileName: string) =>
	`http://127.0.0.1:8090/api/files/${collectionName}/${auctionId}/${fileName}`;

export const CreateAccountSchema = z.object({
	name: z.string().min(1).max(64),
	email: z.string().min(1).max(64).email(),
	password: z.string().min(6).max(32).trim(),
	country: z.string().min(1).max(64),
	state: z.string().min(1).max(64),
	address1: z.string().min(1).max(120),
	address2: z.string().max(120).optional(),
	nearpoint: z.string().max(64).optional()
});

export const ResedentialSchema = z.object({
	country: z
		.string()
		.min(1, {
			message: 'Country is required'
		})
		.max(64, {
			message: 'Country name cannot be more than 64 characters'
		}),
	state: z
		.string()
		.min(1, {
			message: 'State is required'
		})
		.max(64, {
			message: 'State name cannot be more than 64 characters'
		}),
	address1: z
		.string()
		.min(1, {
			message: 'Atleast one Address is required'
		})
		.max(200),
	address2: z
		.string()
		.max(120, {
			message: 'Address cannot be greater than 64 characters'
		})
		.optional(),
	nearpoint: z
		.string()
		.max(64, {
			message: 'Nearpoint cannot be greater than 64 characters'
		})
		.optional()
});

export const LoginSchema = z.object({
	email: z.string().min(1, { message: 'Provided email is invalid' }).email(),
	password: z
		.string()
		.min(6, { message: 'Password must be atleast 6 characters long' })
		.max(32, { message: 'Password cannot be greater than 32 characters' })
		.trim()
});

export const CredentialsSchema = z.object({
	name: z
		.string()
		.min(1, { message: 'Name must be 1 character long' })
		.max(64, { message: 'Name cannot be greater than 64 characters' }),
	email: z.string().min(1, { message: 'Provided email is invalid' }).email(),
	password: z
		.string()
		.min(6, { message: 'Password must be atleast 6 characters long' })
		.max(32, { message: 'Password cannot be greater than 32 characters' })
		.trim()
});
