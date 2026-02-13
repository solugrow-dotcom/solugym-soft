import { insforge } from '@/lib/insforge';

type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

type AIResponse<T> = {
  data?: T;
  error?: { message: string };
};

export const aiService = {
  // Chat completions (OpenAI compatible)
  async chatCompletion(
    messages: ChatMessage[],
    model: string = 'google/gemini-3-pro-image-preview'
  ): Promise<AIResponse<string>> {
    try {
      const response = await insforge.ai.chat.completions.create({
        model,
        messages,
        temperature: 0.7,
        max_tokens: 2000
      });

      if (!response.choices?.[0]?.message?.content) {
        return { error: { message: 'No response from AI' } };
      }

      return { data: response.choices[0].message.content };
    } catch (error) {
      return { error: { message: String(error) } };
    }
  },

  // Generate text with JSON response
  async generateJSON<T>(
    messages: ChatMessage[],
    model: string = 'google/gemini-3-pro-image-preview'
  ): Promise<AIResponse<T>> {
    try {
      const response = await insforge.ai.chat.completions.create({
        model,
        messages,
        response_format: { type: 'json_object' },
        temperature: 0.7,
        max_tokens: 2000
      });

      if (!response.choices?.[0]?.message?.content) {
        return { error: { message: 'No response from AI' } };
      }

      const content = response.choices[0].message.content;
      const parsed = JSON.parse(content);

      return { data: parsed as T };
    } catch (error) {
      return { error: { message: String(error) } };
    }
  },

  // Generate workout plan
  async generateWorkoutPlan(goal: string, experience: string, days: number = 3, duration: number = 60) {
    const systemPrompt = `You are the SoluGrow Master Coach & Growth Assistant.
For GYM OWNERS: Provide growth strategies, member retention tips, and revenue optimization advice.
For GYM MEMBERS: Provide personalized workout plans, diet suggestions, and motivational tips.

Output MUST be valid JSON with this structure:
{
  "name": "Workout Name",
  "description": "Short description",
  "schedule": [
    { "day": "Day 1", "focus": "Muscles", "exercises": [{ "name": "Ex", "sets": "3", "reps": "12", "notes": "Form" }] }
  ]
}`;

    const userPrompt = `Create a ${days}-day split workout routine for a ${experience} level trainee.
Goal: ${goal}.
Session Duration: ${duration} minutes.
Equipment: Full Gym Access.`;

    return this.generateJSON(
      [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ]
    );
  },

  // Generate image (if supported by model)
  async generateImage(prompt: string, size: string = '1024x1024'): Promise<AIResponse<string>> {
    try {
      // Note: Check if your InsForge AI supports image generation
      // This is a placeholder for reference
      return { error: { message: 'Image generation not yet implemented' } };
    } catch (error) {
      return { error: { message: String(error) } };
    }
  },

  // Generate personalized advice
  async generateAdvice(topic: string, context: string): Promise<AIResponse<string>> {
    const systemPrompt = `You are the SoluGrow Master Coach providing expert fitness and business advice.
Provide concise, professional, and encouraging responses.`;

    const userPrompt = `Topic: ${topic}\nContext: ${context}`;

    return this.chatCompletion(
      [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ]
    );
  }
};
