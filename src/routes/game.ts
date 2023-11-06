import { prisma } from '../../prisma/prisma.js';
import express, { Request, Response } from 'express';

const router = express.Router();

router.post('/game',async (req:Request, res: Response) => {
    try {
        const { apiReference, startedAt, finishedAt } = req.body;
        const creatGame = await prisma.game.create({
            data: {
                apiReference,
                startedAt,
                finishedAt,
            },
        });
        res.status(200).json(creatGame);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar jogo.'})
    }
});

router.get("/game/:apiReference", async (req: Request, res: Response) => {
    try {
      const { apiReference } = req.params;
      const game = await prisma.game.findMany({
        where: { 
            apiReference 
        },
      });
      res.json(game).status(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar jogo.'})
    }
});

router.get("/game/id/:gameId", async (req: Request, res: Response) => {
    try {
      const { gameId } = req.params;
      const game = await prisma.game.findMany({
        where: { 
            gameId 
        },
      });
      res.json(game).status(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar jogo.'})
    }
});

router.put('/game/:gameId',async (req:Request, res: Response) => {
    try {
        const {startedAt, finishedAt } = req.body;
        const { gameId } = req.params;
        const updatetGame = await prisma.game.update({
            where: {
                gameId
            },
            data: {
                startedAt,
                finishedAt,
            },
        });
        res.status(200).json(updatetGame);
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar jogo.'})
    }
});

router.delete('/game/:gameId',async (req:Request, res: Response) => {
    try {
        const { gameId } = req.params;
        const deletetGame = await prisma.game.delete({
            where: {
                gameId
            },
        });
        res.status(200).json({ message: 'Jogo excluido.'})
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao excluir jogo.'})
    }
});

export default router;
