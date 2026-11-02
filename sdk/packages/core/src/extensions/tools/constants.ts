/**
 * Constants for Default Tools
 *
 * Tool name constants and utility arrays.
 */

import type { DefaultToolName } from "./types";

/**
 * Constants for default tool names
 */
export const DefaultToolNames = {
	READ_FILES: "read_files",
	SEARCH_CODEBASE: "search_codebase",
	RUN_COMMANDS: "run_commands",
	FETCH_WEB_CONTENT: "fetch_web_content",
	APPLY_PATCH: "apply_patch",
	EDITOR: "editor",
	SKILLS: "skills",
	ASK: "ask_question",
	SUBMIT_AND_EXIT: "submit_and_exit",
	BROWSER_NAVIGATE: "browser_navigate",
	BROWSER_CLICK: "browser_click",
	BROWSER_TYPE: "browser_type",
	BROWSER_SCREENSHOT: "browser_screenshot",
	BROWSER_EVALUATE: "browser_evaluate",
	BROWSER_CLOSE: "browser_close",
} as const;

/**
 * Array of all default tool names
 */
export const ALL_DEFAULT_TOOL_NAMES: DefaultToolName[] = [
	DefaultToolNames.READ_FILES,
	DefaultToolNames.SEARCH_CODEBASE,
	DefaultToolNames.RUN_COMMANDS,
	DefaultToolNames.FETCH_WEB_CONTENT,
	DefaultToolNames.APPLY_PATCH,
	DefaultToolNames.EDITOR,
	DefaultToolNames.SKILLS,
	DefaultToolNames.ASK,
	DefaultToolNames.SUBMIT_AND_EXIT,
	DefaultToolNames.BROWSER_NAVIGATE,
	DefaultToolNames.BROWSER_CLICK,
	DefaultToolNames.BROWSER_TYPE,
	DefaultToolNames.BROWSER_SCREENSHOT,
	DefaultToolNames.BROWSER_EVALUATE,
	DefaultToolNames.BROWSER_CLOSE,
];
