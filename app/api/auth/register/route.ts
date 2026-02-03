import { Hono } from "hono";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/hash";
import { z } from "zod";

const app = new Hono().basePath("/api/auth/register");

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

app.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const parsed = schema.parse(body);

    const existing = await prisma.user.findUnique({ where: { email: parsed.email } });
    if (existing) return c.json({ error: "Email already exists" }, 400);

    const hashed = await hashPassword(parsed.password);
    const user = await prisma.user.create({
      data: { name: parsed.name, email: parsed.email, password: hashed },
    });

    return c.json({ id: user.id, name: user.name, email: user.email });
  } catch (err: any) {
    return c.json({ error: "Invalid input" }, 400);
  }
});

export async function POST(req: Request) {
  return app.fetch(req);
}