import { Hono } from "hono";
import { GoogleGenAI } from "@google/genai";
import { z } from "zod";

const app = new Hono().basePath("/api/ai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

const schema = z.object({
  type: z.enum(["summary", "improve", "tags"]),
  text: z.string(),
});

app.post("/", async (c) => {
  const { type, text } = schema.parse(await c.req.json());

  let prompt = "";
  if (type === "summary") prompt = `Summarize in 3 bullet points:\n${text}`;
  if (type === "improve") prompt = `Improve grammar and clarity:\n${text}`;
  if (type === "tags") prompt = `Generate 5 tags:\n${text}`;

  const res = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ],
  });

  const output =
    res.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

  return c.json({ result: output });
});

export async function POST(req: Request) {
  return app.fetch(req);
}
