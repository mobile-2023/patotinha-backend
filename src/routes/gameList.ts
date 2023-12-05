import { prisma } from '../../prisma/prisma.js';
import express, { Request, Response } from 'express';


const router = express.Router();

//CREATE
router.post('/gamelist',async (req:Request, res: Response) => {
    const { name, userId } = req.body;


    try {
        const createdGameList = await prisma.gameList.create({
            data: {
                name: name, 
                userId: userId,
            },
        });
        res.status(201).json(createdGameList);
    }catch (error) {
        res.status(500).json({ error: 'Erro ao criar lista de jogos.'})
    }
    
});


//READ
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
      return res.status(500).json({ error: 'Usuário não encontrado.' });
    }

    const gameLists = user.gameLists;

    res.status(200).json(gameLists);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter a lista de jogos do usuário.' });
  }
});

//UPDATE
router.put('/gameList/:listId', async (req: Request, res: Response) => {
    const listId = parseInt(req.params.listId, 10);
    const { name } = req.body;

    try {
        const updateGameList = await prisma.gameList.update({
            where: {
                listId: listId,
            },
            data: {
                name,
            },
        });

        res.status(200).json(updateGameList);
    }catch (error) {
        res.status(500).json({error: `Erro ao atualizar a lista de jogos.`})
    }
    
});


//DELETE
router.delete('/gameList/:listId',async (req: Request, res: Response) => {
    const listId = parseInt(req.params.listId, 10);

    try{
        await prisma.gameList.delete({
            where: {
                listId: listId, 
            }, 
        });
        res.status(200).json({ message: 'Lista de jogos excluida.'})
    } catch (error){
        res.status(500).json({error: 'Erro ao excluir a lista.'})
    }
    
})

export default router;
