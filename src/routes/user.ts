import { Router } from "express";
import { prisma } from "../../prisma/prisma.js";

const router: Router = Router();

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

router.get("/", async (request, reply) => {
  try {
    const users = await prisma.user.findMany();
    return reply.json(users).status(200);
  } catch (error) {
    console.log(error);
    reply.json(error);
  }
});

router.get('/:userId', async (request, reply) => {
  const userId = request.params.userId;

  try {
    const user = await prisma.user.findUnique({
      where: {
        userId: userId,
      },
      include: {
        gameLists: {
          include: {
            games: true,
          },
        },
      },
    });

    if (!user) {
      return reply.status(404).json({ error: 'Usuário não encontrado.' });
    }

    reply.status(200).json(user);
  } catch (error) {
    reply.status(500).json({ error: 'Erro ao obter o usuário.' });
  }
});

/* Update User */
router.put("/:userId", async (request, reply) => {
  const  userId  = request.params.userId;
  const { username, email, password } = request.body;
  try {
    await prisma.user.update({
      where: { userId },
      data: {
        username: username,
        email: email,
        password: password,
      },
    });
    reply.sendStatus(200);
  } catch (error) {
    console.error(error);
    reply.json(error);
  }
});

/* Delete User */
router.delete("/:userId", async (request, reply) => {
  const { userId } = request.params;
  try {
    await prisma.user.delete({
      where: { userId },
    });
    reply.sendStatus(200);
  } catch (error) {
    console.error(error);
    reply.json(error);
  }
});

/* Authentication */
router.post("/login", async (request, reply) => {
  const { email, password } = request.body;

  try {
    const isRegistered = await prisma.user.findMany({
      where: { email: email },
    });
    if (isRegistered.length > 0) {
      if (password === isRegistered[0].password) {
        console.log("Logando");
        reply.json({userId: isRegistered[0].userId}).sendStatus(200);
      } else {
        console.log("Senha incorreta");
        reply.sendStatus(401);
      }
    } else {
      reply.json({ error: "User not found" }).status(401);
    }
  } catch (error) {
    reply.json(error);
  }
});

export default router;
