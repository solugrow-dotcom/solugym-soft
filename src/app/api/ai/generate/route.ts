import { insforge } from "@/lib/insforge"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        // 1. Verify Authentication
        const { data: { session } } = await insforge.auth.getSession()
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        }

        const { goal, experience, days, duration } = await req.json()

        if (!goal || !experience) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
        }

        const systemPrompt = `You are the SoluGrow Master Coach & Growth Assistant.
    For GYM OWNERS: Provide growth strategies, member retention tips, and revenue optimization advice.
    For GYM MEMBERS: Provide personalized workout plans, diet suggestions, and motivational tips.
    
    If the request is for a workout plan, output MUST be valid JSON with this structure:
    {
      "name": "Workout Name",
      "description": "Short description",
      "schedule": [
        { "day": "Day 1", "focus": "Muscles", "exercises": [{ "name": "Ex", "sets": "3", "reps": "12", "notes": "Form" }] }
      ]
    }
    For general advice, provide concise, professional, and encouraging text responses.`

        const userPrompt = `Create a ${days || 3}-day split workout routine for a ${experience} level trainee.
    Goal: ${goal}.
    Session Duration: ${duration || 60} minutes.
    Equipment: Full Gym Access.
    `

        const completion = await insforge.ai.chat.completions.create({
            model: "google/gemini-3-pro-image-preview", // Using Gemini as requested
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            response_format: { type: "json_object" }
        })

        const content = completion.choices[0].message.content
        let plan
        try {
            if (content) plan = JSON.parse(content)
        } catch (e) {
            console.error("Failed to parse AI JSON", content)
            return NextResponse.json({ error: "AI returned invalid format", raw: content }, { status: 500 })
        }

        return NextResponse.json({ plan })

    } catch (error: any) {
        console.error("AI Generation Error:", error)
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 })
    }
}
