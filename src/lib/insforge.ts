import { createClient } from '@insforge/sdk';
import { mockInsforge } from './mock-insforge';

const apiKey = process.env.NEXT_PUBLIC_INSFORGE_API_KEY;
const baseUrl = process.env.NEXT_PUBLIC_INSFORGE_API_URL;

const isConfigured = apiKey && baseUrl && apiKey !== "your-anon-key-here";

if (!isConfigured) {
    console.warn("⚠️ InsForge API Keys missing. Using MOCK ADAPTER for demo mode.");
}

export const insforge = isConfigured
    ? createClient({ baseUrl: baseUrl || "", anonKey: apiKey || "" })
    : mockInsforge;
