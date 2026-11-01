import { createHash } from "node:crypto";
import type { ITelemetryService, WorkspaceInfo } from "@cline/shared";

export interface WorkspaceLifecycleTelemetryInput {
	telemetry?: ITelemetryService;
	rootPath: string;
	dedupeScope?: string;
	workspaceInfo?: WorkspaceInfo;
	rootCount?: number;
	vcsType?: "git" | "none";
	vcsTypes?: ReadonlyArray<string>;
	durationMs?: number;
	initError?: { errorType: string; message: string };
	featureFlagEnabled?: boolean;
	isRemoteWorkspace?: boolean;
}

const initializedWorkspaceHashes = new Set<string>();
const initErrorWorkspaceHashes = new Set<string>();

export function emitWorkspaceLifecycleTelemetry(input: WorkspaceLifecycleTelemetryInput): void {
	// Telemetry disabled for personal use.
	return;
}

export function resetWorkspaceTelemetryForTests(): void {
	initializedWorkspaceHashes.clear();
	initErrorWorkspaceHashes.clear();
}
