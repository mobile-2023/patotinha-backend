import { prisma } from "../../prisma/prisma.js";
import { Router, Request, Response } from "express";

const router = Router();

/* 
CRUD 
CREATE -> DONE
READ -> DONE
UPDATE -> DONE
DELETE -> DONE
*/

interface commentInterface {
  content: string;
  userId: string;
}

router.post("/:gameId", async (req: Request, res: Response) => {
  try {
    let { gameId } = req.params;
    let { content, userId }: commentInterface = req.body;

    const user = await prisma.user.findUnique({
      where: {
        userId,
      },
    });

    const game = await prisma.game.findUnique({
      where: {
        gameId,
      },
    });

    if (user != null && game !== null) {
      const createComment = await prisma.comment.create({
        data: {
          content,
          userId,
          gameId,
        },
      });
      res.json(createComment).status(200);
    }
  } catch (error) {
    console.error(error);
    res.json({
      error,
    });
  }
});

router.put("/:commentId", async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    const updateComment = await prisma.comment.update({
      where: {
        commentId,
      },
      data: {
        content,
      },
    });

    res.json(updateComment).status(200);
  } catch (error) {
    console.error(error);
    res.json({
      error,
    });
  }
});

router.get("/:userId/all", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const comments = await prisma.comment.findMany({
      where: { userId },
      include: {
        game: true,
      },
    });
    res.json(comments).status(200);
  } catch (error) {
    console.error(error);
    res.json({
      error,
    });
  }
});

router.get(
  "/user/:userId/id/:commentId",
  async (req: Request, res: Response) => {
    try {
      const { userId, commentId } = req.params;
      const comment = await prisma.comment.findUnique({
        where: {
          commentId,
        },
        include: {
          game: true,
        },
      });

      if (comment?.userId === userId) {
        res.json(comment).status(200);
      }
    } catch (error) {
      console.error(error);
      res.json({
        error,
      });
    }
  }
);

router.delete("/delete/:commentId", async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const deletedComment = await prisma.comment.delete({
      where: {
        commentId,
      },
    });

    res
      .json({
        message: "Comment deleted",
      })
      .status(200);
  } catch (error) {
    console.error(error);
    res.json({
      error,
    });
  }
});

export default router;
