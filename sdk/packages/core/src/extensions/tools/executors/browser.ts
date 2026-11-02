/**
 * Browser Executor
 *
 * Built-in implementation for browser automation using Playwright.
 * All browser tools share a single BrowserSession so that navigate, click,
 * type, screenshot, and evaluate operate on the same page.
 */

import { chromium, type Browser, type Page } from "playwright";
import type { AgentToolContext } from "@cline/shared";
import type {
	BrowserClickInput,
	BrowserCloseInput,
	BrowserEvaluateInput,
	BrowserNavigateInput,
	BrowserScreenshotInput,
	BrowserTypeInput,
} from "../schemas";

/**
 * Options for the browser session
 */
export interface BrowserSessionOptions {
	/**
	 * Whether to run the browser in headless mode
	 * @default true
	 */
	headless?: boolean;

	/**
	 * Default timeout for page operations in milliseconds
	 * @default 30000
	 */
	timeoutMs?: number;

	/**
	 * Display to use for the browser (e.g. ":1")
	 * @default process.env.DISPLAY ?? ":1"
	 */
	display?: string;
}

/**
 * Manages a single Playwright browser and page shared across all browser tools.
 */
export class BrowserSession {
	private browser: Browser | null = null;
	private page: Page | null = null;
	private readonly options: Required<BrowserSessionOptions>;

	constructor(options: BrowserSessionOptions = {}) {
		this.options = {
			headless: options.headless ?? true,
			timeoutMs: options.timeoutMs ?? 30_000,
			display: options.display ?? process.env.DISPLAY ?? ":1",
		};
	}

	/** Ensure the browser is launched */
	async ensureBrowser(): Promise<Browser> {
		if (!this.browser) {
			this.browser = await chromium.launch({
				headless: this.options.headless,
				args: ["--no-sandbox", "--disable-setuid-sandbox"],
				env: { ...process.env, DISPLAY: this.options.display },
			});
		}
		return this.browser;
	}

	/** Ensure a page is available */
	async ensurePage(): Promise<Page> {
		if (!this.page || this.page.isClosed()) {
			const browser = await this.ensureBrowser();
			this.page = await browser.newPage();
			this.page.setDefaultTimeout(this.options.timeoutMs);
		}
		return this.page;
	}

	/** Get the current page, or null if none */
	getPage(): Page | null {
		return this.page;
	}

	/** Close the browser and clear the page */
	async close(): Promise<void> {
		if (this.browser) {
			await this.browser.close().catch(() => {});
			this.browser = null;
			this.page = null;
		}
	}

	/** Get the configured timeout in milliseconds */
	getTimeoutMs(): number {
		return this.options.timeoutMs;
	}
}

/**
 * Create all browser executors sharing a single BrowserSession.
 */
export function createBrowserExecutors(
	options: BrowserSessionOptions = {},
) {
	const session = new BrowserSession(options);
	const timeoutMs = session.getTimeoutMs();

	const browserNavigate = async (
		input: BrowserNavigateInput,
		context: AgentToolContext,
	): Promise<string> => {
		const page = await session.ensurePage();
		await page.goto(input.url, {
			waitUntil: "domcontentloaded",
			timeout: timeoutMs,
		});
		const title = await page.title().catch(() => "");
		const url = page.url();
		return `Navigated to ${url} (title: ${title || "unknown"})`;
	};

	const browserClick = async (
		input: BrowserClickInput,
		context: AgentToolContext,
	): Promise<string> => {
		const page = await session.ensurePage();
		await page.click(input.selector, { timeout: timeoutMs });
		return `Clicked element: ${input.selector}`;
	};

	const browserType = async (
		input: BrowserTypeInput,
		context: AgentToolContext,
	): Promise<string> => {
		const page = await session.ensurePage();
		await page.fill(input.selector, input.text, { timeout: timeoutMs });
		if (input.pressEnter) {
			await page.press(input.selector, "Enter", { timeout: timeoutMs });
		}
		return `Typed into ${input.selector}: ${input.text}${
			input.pressEnter ? " (pressed Enter)" : ""
		}`;
	};

	const browserScreenshot = async (
		input: BrowserScreenshotInput,
		context: AgentToolContext,
	): Promise<string> => {
		const page = await session.ensurePage();
		const buffer = await page.screenshot({ fullPage: input.fullPage ?? false });
		return `data:image/png;base64,${buffer.toString("base64")}`;
	};

	const browserEvaluate = async (
		input: BrowserEvaluateInput,
		context: AgentToolContext,
	): Promise<string> => {
		const page = await session.ensurePage();
		const result = await page.evaluate(input.script);
		return String(result);
	};

	const browserClose = async (
		input: BrowserCloseInput,
		context: AgentToolContext,
	): Promise<string> => {
		await session.close();
		return "Browser closed";
	};

	return {
		browserNavigate,
		browserClick,
		browserType,
		browserScreenshot,
		browserEvaluate,
		browserClose,
	};
}
