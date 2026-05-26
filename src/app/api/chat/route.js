import rafaelPrompt from "@/data/PromptData";

export async function POST(request) {
  try {
    const { question } = await request.json();

    if (!question) {
      return Response.json({ error: "Question is required" }, { status: 400 });
    }

    const prompt = rafaelPrompt(question);
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      return Response.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "z-ai/glm-4.5-air:free",
          messages: [{ role: "user", content: prompt }],
        }),
      }
    );

    if (!response.ok) {
      const status = response.status;
      if (status === 429) {
        return Response.json(
          { error: "rate_limit", message: "Too many requests" },
          { status: 429 }
        );
      }
      return Response.json(
        { error: "API request failed" },
        { status }
      );
    }

    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content || "";

    return Response.json({ answer });
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
