import { Hono } from "hono";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const app = new Hono().basePath("/api/notes");

const noteSchema = z.object({
  title: z.string(),
  content: z.string(),
  userId: z.string(),
  tags: z.array(z.string()).optional(),
  summary: z.string().optional(),
});

app.get("/", async (c) => {
  const q = c.req.query("q") || "";
  const notes = await prisma.note.findMany({
    where: { title: { contains: q, mode: "insensitive" } },
    orderBy: { createdAt: "desc" },
  });
  return c.json(notes);
});

app.post("/", async (c) => {
  const body = await c.req.json();  
  body.userId="06f9a4ce-dea7-4414-931d-39615d74d496"
  console.log(body);
  const data = noteSchema.parse(body);
  const note = await prisma.note.create({ data });
  return c.json(note);
});

app.put("/", async (c) => {
  const { id, ...data } = await c.req.json();
  const note = await prisma.note.update({ where: { id }, data });
  return c.json(note);
});

app.delete("/", async (c) => {
  const { id } = await c.req.json();
  await prisma.note.delete({ where: { id } });
  return c.json({ success: true });
});

// // export default app;

export async function GET(req: Request) {
  return app.fetch(req);
}
export async function POST(req: Request) {
  return app.fetch(req);
}
export async function PUT(req: Request) {
  return app.fetch(req);
}
export async function DELETE(req: Request) {
  return app.fetch(req);
}

