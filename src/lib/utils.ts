import type { AuthMethodsList } from 'pocketbase';

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
