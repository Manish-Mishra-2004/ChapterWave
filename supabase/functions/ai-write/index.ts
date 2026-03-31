import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { action, ...params } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    let systemPrompt = "";
    let messages: { role: string; content: string }[] = [];

    if (action === "write_chapter") {
      systemPrompt = `You are an expert author and book editor. Write a compelling, well-structured chapter for an eBook. Use markdown formatting. Write in a ${params.tone || "conversational"} tone. The book is titled "${params.bookTitle}" in the ${params.genre || "general"} genre.`;
      const userPrompt = `Write the chapter titled "${params.chapterTitle}".${params.chapterDescription ? ` Description: ${params.chapterDescription}` : ""}${params.keyPoints?.length ? ` Key points to cover: ${params.keyPoints.join(", ")}` : ""}${params.existingContent ? ` Continue from where this left off: ...${params.existingContent.slice(-500)}` : " Start from the beginning."}`;
      messages = [{ role: "user", content: userPrompt }];
    } else if (action === "chat") {
      systemPrompt = `You are a helpful AI writing assistant for the book "${params.bookTitle || "untitled"}". You help improve writing, suggest ideas, and answer questions. Current chapter context: ${params.context || "none"}`;
      messages = params.messages || [];
    } else if (action === "generate_outline") {
      systemPrompt = `You are an expert book editor. Generate a detailed eBook outline. Return ONLY valid JSON: {"chapters": [{"chapterNumber": 1, "title": "...", "description": "...", "estimatedWordCount": 2000, "keyPoints": ["...", "..."]}]}`;
      messages = [{ role: "user", content: `Create an outline for a ${params.genre || "general"} book titled "${params.title}" about "${params.topic}". ${params.chapterCount} chapters. Tone: ${params.tone}. Audience: ${params.audience || "general"}. ${params.instructions || ""}` }];
    } else {
      return new Response(JSON.stringify({ error: "Unknown action" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const isOutline = action === "generate_outline";

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: systemPrompt }, ...messages],
        stream: !isOutline,
        ...(isOutline ? { response_format: { type: "json_object" } } : {}),
      }),
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 429) return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (status === 402) return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      const t = await response.text();
      console.error("AI error:", status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    if (isOutline) {
      const data = await response.json();
      const content = data.choices?.[0]?.message?.content || "{}";
      try {
        const parsed = JSON.parse(content);
        return new Response(JSON.stringify(parsed), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      } catch {
        return new Response(JSON.stringify({ chapters: [] }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
      }
    }

    return new Response(response.body, { headers: { ...corsHeaders, "Content-Type": "text/event-stream" } });
  } catch (e) {
    console.error("Error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
