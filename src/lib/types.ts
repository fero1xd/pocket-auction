import type { Record } from 'pocketbase';
import type { z } from 'zod/lib';
import type { CreateAccountSchema, LoginSchema } from './utils';

export type RegisterPayload = {
	name: string;
	email: string;
	password: string;
};

export type ResedentialPayload = {
	country: string;
	state: string;
	address1: string;
	address2?: string;
	nearpoint?: string;
};

export type ProviderData = {
	providerName: string;
	authProviderRedirect: string;
	authProviderState: string;
	providerCodeVerifier: string;
};

export type Auction = Record & {
	item_name: string;
	item_description: string;
	starting_price: number;
	auction_by: string;
	start_time: string;
	end_time: string;
	sold: boolean;
	currency: string;
	item_images: string[];
	categories: string;
};

export type AuctionStatus = 'live' | 'not started' | 'ended';

export type CredentialsInput = 'name' | 'email' | 'password';
export type ResedentialInput = 'country' | 'state' | 'address1' | 'address2' | 'nearpoint';

export type AvailableAuthProviders = 'github' | 'google' | 'facebook' | 'discord';

export type LoginPayload = z.infer<typeof LoginSchema>;
export type CreateAccountPayload = z.infer<typeof CreateAccountSchema>;

declare global {
	type User = import('pocketbase').default['authStore']['model'] & {
		username: string;
		email: string;
		verified: boolean;
		avatarUrl: string;
		name: string;
		country?: string;
		state?: string;
		address1?: string;
		address2?: string;
		nearpoint?: string;
	};
}
