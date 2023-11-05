import { Router } from "express";
import { prisma } from "../../prisma/prisma.js";

const router: Router = Router();

router.get("/", async (request, reply) => {
  try {
    const users = await prisma.user.findMany();
    return reply.json(users).status(200);
  } catch (error) {
    console.log(error);
    reply.json(error);
  }
});

router.post("/", async (request, reply) => {
  console.log(request.body);

  const { username, email, password } = request.body;

  const isRegistered = await prisma.user.findMany({ where: { email: email } });

  if (isRegistered.length === 0) {
    await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });

    reply.sendStatus(200);
  } else {
    reply.sendStatus(401);
  }
});

/* Authentication */
router.post("/login", async (request, reply) => {
  const { email, password } = request.body;

  try {
    const isRegistered = await prisma.user.findMany({ where: { email: email } });
    if (isRegistered.length > 0) {
      if (password === isRegistered[0].password) {
        console.log("Logando");
        reply.sendStatus(200)
      } else {
      console.log("Senha incorreta");
      reply.sendStatus(401)
      }
    }else{
      reply.json({ error: "User not found" }).status(401);
    }
  } catch (error) {
    reply.json(error);
  }
});

export default router;
