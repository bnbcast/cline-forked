import type {
	ClineAccountActionRequest,
	ProviderActionRequest,
} from "@cline/shared";
import type {
	ClineAccountBalance,
	ClineAccountPaymentTransaction,
	ClineAccountUsageTransaction,
	ClineAccountUser,
	FeaturebaseTokenResponse,
	UserCurrentPlan,
} from "./types";

export interface ClineAccountOperations {
	fetchMe(): Promise<ClineAccountUser>;
	fetchBalance(userId?: string): Promise<ClineAccountBalance>;
	fetchUsageTransactions(
		userId?: string,
	): Promise<ClineAccountUsageTransaction[]>;
	fetchPaymentTransactions(
		userId?: string,
	): Promise<ClineAccountPaymentTransaction[]>;
	fetchFeaturebaseToken?(): Promise<FeaturebaseTokenResponse | undefined>;
	fetchCurrentUserPlan?(): Promise<UserCurrentPlan | undefined>;
}

export function isClineAccountActionRequest(
	request: ProviderActionRequest,
): request is ClineAccountActionRequest {
	return request.action === "clineAccount";
}

export async function executeClineAccountAction(
	request: ClineAccountActionRequest,
	service: ClineAccountOperations,
): Promise<unknown> {
	switch (request.operation) {
		case "fetchMe":
			return service.fetchMe();
		case "fetchBalance":
			return service.fetchBalance(request.userId);
		case "fetchUsageTransactions":
			return service.fetchUsageTransactions(request.userId);
		case "fetchPaymentTransactions":
			return service.fetchPaymentTransactions(request.userId);
		case "fetchFeaturebaseToken":
			return service.fetchFeaturebaseToken?.();
		case "fetchCurrentUserPlan":
			return service.fetchCurrentUserPlan?.();
		case "fetchUserOrganizations":
			throw new Error("fetchUserOrganizations not supported by RPC service");
		case "fetchOrganizationBalance":
			throw new Error("fetchOrganizationBalance not supported by RPC service");
		case "fetchOrganizationUsageTransactions":
			throw new Error(
				"fetchOrganizationUsageTransactions not supported by RPC service",
			);
		case "switchAccount":
			throw new Error("switchAccount not supported by RPC service");
		default: {
			const exhaustive: never = request;
			throw new Error(
				`Unsupported Cline account operation: ${String(exhaustive)}`,
			);
		}
	}
}

export interface ProviderActionExecutor {
	runProviderAction(request: ProviderActionRequest): Promise<{
		result: unknown;
	}>;
}

export class RpcClineAccountService implements ClineAccountOperations {
	private readonly executor: ProviderActionExecutor;

	constructor(executor: ProviderActionExecutor) {
		this.executor = executor;
	}

	public async fetchMe(): Promise<ClineAccountUser> {
		return this.request<ClineAccountUser>({
			action: "clineAccount",
			operation: "fetchMe",
		});
	}

	public async fetchBalance(userId?: string): Promise<ClineAccountBalance> {
		return this.request<ClineAccountBalance>({
			action: "clineAccount",
			operation: "fetchBalance",
			...(userId?.trim() ? { userId: userId.trim() } : {}),
		});
	}

	public async fetchUsageTransactions(
		userId?: string,
	): Promise<ClineAccountUsageTransaction[]> {
		return this.request<ClineAccountUsageTransaction[]>({
			action: "clineAccount",
			operation: "fetchUsageTransactions",
			...(userId?.trim() ? { userId: userId.trim() } : {}),
		});
	}

	public async fetchPaymentTransactions(
		userId?: string,
	): Promise<ClineAccountPaymentTransaction[]> {
		return this.request<ClineAccountPaymentTransaction[]>({
			action: "clineAccount",
			operation: "fetchPaymentTransactions",
			...(userId?.trim() ? { userId: userId.trim() } : {}),
		});
	}

	public async fetchFeaturebaseToken(): Promise<
		FeaturebaseTokenResponse | undefined
	> {
		return this.request<FeaturebaseTokenResponse | undefined>({
			action: "clineAccount",
			operation: "fetchFeaturebaseToken",
		});
	}

	public async fetchCurrentUserPlan(): Promise<UserCurrentPlan | undefined> {
		return this.request<UserCurrentPlan | undefined>({
			action: "clineAccount",
			operation: "fetchCurrentUserPlan",
		});
	}

	private async request<T>(request: ClineAccountActionRequest): Promise<T> {
		const response = await this.executor.runProviderAction(request);
		return response.result as T;
	}
}
