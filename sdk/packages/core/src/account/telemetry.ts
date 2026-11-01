import type { ProviderSettingsManager } from "../services/storage/provider-settings-manager";
import type { ClineAccountUser } from "./types";

/** Account identity shared by telemetry and feature-flag integrations. */
export interface ClineAccountTelemetryIdentity {
	id: string;
	email?: string;
	provider: "cline";
}

/**
 * Resolve the authenticated user once so every client applies the same cross-surface account dimensions.
 */
export function resolveClineAccountTelemetryIdentity(
	user: ClineAccountUser,
): ClineAccountTelemetryIdentity {
	return {
		id: user.id,
		email: user.email,
		provider: "cline",
	};
}

/**
 * Persist the latest account identity alongside OAuth settings. Detached
 * runtime processes (notably the shared Hub) can then enrich task telemetry
 * without making their own account API request.
 */
export function persistClineAccountTelemetryIdentity(
	manager: Pick<
		ProviderSettingsManager,
		"getProviderSettings" | "saveProviderSettings"
	>,
	identity: ClineAccountTelemetryIdentity,
): boolean {
	try {
		const persisted = manager.getProviderSettings("cline");
		if (!persisted) return false;
		manager.saveProviderSettings(
			{
				...persisted,
				auth: {
					...persisted.auth,
					accountId: identity.id,
				},
			},
			{ setLastUsed: false },
		);
		return true;
	} catch {
		// Account display and telemetry must continue if settings are read-only.
		return false;
	}
}
