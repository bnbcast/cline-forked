import type { SessionStatus } from "./common";
import type { SessionRecord } from "./sessions";
import type {
	TeamMailboxMessage,
	TeamMemberSnapshot,
	MissionLogEntry,
	TeamOutcome,
	TeamOutcomeFragment,
	TeamRunRecord,
	TeamTask,
	TeamTeammateSpec,
	TeamRuntimeState,
} from "@cline/shared";

export interface TeamPersistenceBatch {
	events: Array<{ type: string; payload: unknown }>;
	delta: {
		teamId: string;
		teamName: string;
		reset: boolean;
		members: TeamMemberSnapshot[];
		tasks: TeamTask[];
		mailbox: TeamMailboxMessage[];
		missionLog: MissionLogEntry[];
		runs: TeamRunRecord[];
		outcomes: TeamOutcome[];
		outcomeFragments: TeamOutcomeFragment[];
	};
	teammates: TeamTeammateSpec[];
	getFullState: () => TeamRuntimeState;
}

export interface TeamStore {
	persistBatch(teamName: string, batch: TeamPersistenceBatch): void;
	persistRuntime(
		teamName: string,
		state: TeamRuntimeState,
		teammates: TeamTeammateSpec[],
	): void;
}

export interface SessionStore {
	init(): Promise<void> | void;
	create(record: SessionRecord): Promise<void> | void;
	updateStatus(
		sessionId: string,
		status: SessionStatus,
		exitCode?: number | null,
	): Promise<void> | void;
	update(
		record: Partial<SessionRecord> & { sessionId: string },
	): Promise<void> | void;
	get(
		sessionId: string,
	): Promise<SessionRecord | undefined> | SessionRecord | undefined;
	list(limit?: number): Promise<SessionRecord[]> | SessionRecord[];
	delete(sessionId: string, cascade?: boolean): Promise<boolean> | boolean;
}

export interface ArtifactStore {
	appendHook(sessionId: string, payload: unknown): Promise<void> | void;
	writeMessages(sessionId: string, messages: unknown[]): Promise<void> | void;
}
