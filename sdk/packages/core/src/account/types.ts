export interface ClineAccountUser {
	id: string;
	email: string;
	displayName: string;
	photoUrl: string;
	createdAt: string;
	updatedAt: string;
	/** Web app path where the user manages data use and Cline Bench preferences. */
	dataPrivacyPath?: string;
}

export interface ClineAccountBalance {
	balance: number;
	userId: string;
}

export interface ClineAccountUsageTransaction {
	aiInferenceProviderName: string;
	aiModelName: string;
	aiModelTypeName: string;
	completionTokens: number;
	costUsd: number;
	createdAt: string;
	creditsUsed: number;
	generationId: string;
	id: string;
	metadata: {
		additionalProp1: string;
		additionalProp2: string;
		additionalProp3: string;
	};
	operation?: string;
	promptTokens: number;
	totalTokens: number;
	userId: string;
}

export interface ClineAccountPaymentTransaction {
	paidAt: string;
	creatorId: string;
	amountCents: number;
	credits: number;
}

export interface FeaturebaseTokenResponse {
	featurebaseJwt: string;
}

export interface ClineSubscriptionPlan {
	displayName?: string;
	features?: {
		included?: string[];
		[key: string]: unknown;
	};
	id?: string;
	interval?: string;
	name?: string;
	pricePerSeatCents?: number;
	type?: string;
	[key: string]: unknown;
}

export interface UserCurrentPlan {
	cancelAt?: string;
	canceledAt?: string;
	currentPeriodEnd?: string;
	currentPeriodStart?: string;
	plan?: ClineSubscriptionPlan | null;
	planHistoryId?: string;
	subscriptionId?: string;
	userId?: string;
	[key: string]: unknown;
}

export interface UserRemoteConfigResponse {
	organizationId: string;
	value: string;
	enabled: boolean;
	organizations?: Array<{ organizationId: string; name: string }>;
}
