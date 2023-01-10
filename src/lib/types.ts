import type { Record } from 'pocketbase';

export type LoginPayload = {
	email: string;
	password: string;
};

export type RegisterPayload = {
	username: string;
	email: string;
	password: string;
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
