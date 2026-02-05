// import { prisma } from "@/lib/prisma";
// import { comparePassword } from "@/lib/hash";
// import { signToken } from "@/lib/jwt";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const { email, password } = await req.json();

//   const user = await prisma.user.findUnique({
//     where: { email },
//   });

//   if (!user)
//     return NextResponse.json(
//       { error: "Invalid credentials" },
//       { status: 401 }
//     );

//   const valid = await comparePassword(password, user.password);

//   if (!valid)
//     return NextResponse.json(
//       { error: "Invalid credentials" },
//       { status: 401 }
//     );

//   const token = signToken({
//     id: user.id,
//     email: user.email,
//   });

//   return NextResponse.json({ token });
// }
import { Hono } from "hono";
import { prisma } from "@/lib/prisma";
import { comparePassword } from "@/lib/hash";
import { signJwt } from "@/lib/jwt";
import { z } from "zod";
import { cookies } from "next/headers"


const app = new Hono().basePath("/api/auth/login");

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
});

app.post("/", async (c) => {
  try {
    const body = await c.req.json();
    const parsed = schema.parse(body);
    const cookieStore = await cookies()

    const user = await prisma.user.findUnique({ where: { email: parsed.email } });
    if (!user) return c.json({ error: "Invalid credentials" }, 401);

    const valid = await comparePassword(parsed.password, user.password);
    if (!valid) return c.json({ error: "Invalid credentials" }, 401);

    const token = signJwt({ userId: user.id });
      cookieStore.set("token", token, {
      httpOnly: true,
      path: "/",
    });
    
    return c.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err: any) {
    return c.json({ error: "Error occurs",err }, 400);
  }
});

export async function POST(req: Request) {
  return app.fetch(req);
}
