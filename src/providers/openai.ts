import OpenAI from 'openai';
import { AIProvider } from './types.js';

export class OpenAIProvider implements AIProvider {
  private openai: OpenAI;
  private model: string;
  private baseUrl: string;

  constructor(model: string = 'llama3.2', baseUrl: string = 'http://localhost:11434') {
    this.model = model;
    this.baseUrl = baseUrl.replace(/\/$/, ''); // Remove trailing slash if present
  }
  
  constructor(apiKey: string = 'EMPTY', model: string = 'Meta-Llama-3.1-70B-Instruct', baseUrl: string = 'http://localhost/v1' ) {
    this.openai = new OpenAI({ 
      base_url
      api_key
    });
    this.model = model;
  }

  async generateCommitMessage(prompt: string, systemPrompt: string): Promise<string> {
    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.3,
      max_tokens: 200,
    });

    const message = response.choices[0]?.message?.content?.trim();
    if (!message) {
      throw new Error('No commit message generated');
    }

    return message;
  }

  getName(): string {
    return `OpenAI (${this.model})`;
  }
}
