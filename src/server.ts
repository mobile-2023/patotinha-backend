import express, { Express, Request, Response } from "express";
import 'dotenv/config'

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
	res.send('<h1>Hello World!</h1>');
})

app.listen(port, () => {
	console.log(`Servidor iniciado na porta: ${port}`);
})
