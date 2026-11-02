import type { ITelemetryService } from "@cline/shared";
import type { CoreSessionConfig } from "../types/config";

export type TelemetryAgentIdentityProperties = {
	agentId: string;
	conversationId: string;
};

export interface MentionEnrichmentResult {
	prompt: string;
	mentions: string[];
	matchedFiles: string[];
	ignoredMentions: string[];
}

export async function enrichPromptWithMentions(
	input: string,
	cwd: string,
): Promise<MentionEnrichmentResult> {
	return {
		prompt: input,
		mentions: [],
		matchedFiles: [],
		ignoredMentions: [],
	};
}

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
