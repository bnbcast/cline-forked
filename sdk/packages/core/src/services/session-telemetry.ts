import type { ITelemetryService } from "@cline/shared";
import type { CoreSessionConfig } from "../types/config";

export function emitSessionCreationTelemetry(
	config: CoreSessionConfig,
	sessionId: string,
	isRestart: boolean,
	workspacePath: string,
	agentIdentity?: Partial<TelemetryAgentIdentityProperties>,
): void {
	// Telemetry disabled for personal use.
	return;
}

export function captureHookDiscoveryTelemetry(
	telemetry: ITelemetryService | undefined,
	options: { workspacePath: string },
): void {
	// Telemetry disabled for personal use.
	return;
}

export function emitMentionTelemetry(
	telemetry: ITelemetryService | undefined,
	enriched: Awaited<ReturnType<typeof enrichPromptWithMentions>>,
): void {
	// Telemetry disabled for personal use.
	return;
}
