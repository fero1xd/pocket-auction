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
