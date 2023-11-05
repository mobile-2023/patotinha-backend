import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/gameList/:userId', async (req: Request, res: Response) => {
  const userId = req.params.userId;

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
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    const gameLists = user.gameLists;

    res.status(200).json(gameLists);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter a lista de jogos do usuário.' });
  }
});

export default router;
