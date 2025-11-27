import { AIProvider, ProviderOptions } from './types.js';
import { OpenAIProvider } from './openai.js';
import { OllamaProvider } from './ollama.js';

export { AIProvider } from './types.js';
export { OpenAIProvider } from './openai.js';
export { OllamaProvider } from './ollama.js';

export function createProvider(options: ProviderOptions): AIProvider {
  const providerType = options.provider || 'openai';
  
  if (providerType === 'ollama') {
    return new OllamaProvider(options.model || 'llama3.2', options.ollamaUrl);
  } else {
    const apiKey = options.apiKey || process.env.OPENAI_API_KEY;
    return new OpenAIProvider(apiKey, options.model || 'Meta-Llama-3.1-70B-Instruct', options.ollamaUrl);
  }
}
