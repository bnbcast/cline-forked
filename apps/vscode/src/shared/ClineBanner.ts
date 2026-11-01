/**
 * Banner message types for Cline extension
 */

type BannerSeverity = "info" | "success" | "warning"
type BannerPlacement = "top" | "bottom" | "welcome"

export interface Banner {
	id: string
	titleMd: string
	bodyMd: string
	icon?: string
	actions?: BannerAction[]

	rulesJson: string
	activeFrom?: string
	activeTo?: string

	severity?: BannerSeverity
	placement?: BannerPlacement
}

export interface BannerAction {
	action?: string
	arg?: string
	title?: string
}

export interface BannersResponse {
	data: {
		items: Banner[]
		nextToken: string
	}
	success: boolean
}

/**
 * Audience targeting options
 */
type BannerAudience = "all" | "personal_only"

/**
 * Rules that can be evaluated for banner targeting
 */
export interface BannerRules {
	/** Target specific IDEs (e.g., "vscode", "jetbrains") */
	ide?: string[]
	/** Target specific auth providers (e.g., "firebase", "workos") */
	auth?: string[]
	/** Target users with specific API providers (e.g., "anthropic", "openai") */
	providers?: string[]
	/** Target specific audience segment */
	audience?: BannerAudience[]
	/** Minimum extension version required (e.g., "3.39.2") */
	min_extension_version?: string
	/** Optional actions embedded in rules JSON for banners */
	actions?: BannerAction[]
}
