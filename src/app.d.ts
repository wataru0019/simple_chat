import type { Session } from '@auth/core/types';

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			getSession(): Promise<Session | null>
		}
		// interface PageData {}
		// interface PageState {}
		interface Platform {
			env: {
				AUTH_SECRET: string;
				GOOGLE_GEMINI_API_KEY: string;
			};
		}
	}
}

export {};
