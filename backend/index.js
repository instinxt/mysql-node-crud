import express from "express";
import {
	getTodo,
	getTodos,
	updateTodo,
	deleteTodo,
	createTodo,
} from "./config/db.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/todos", async (req, res) => {
	const todos = await getTodos();
	if (!todos) {
		res.status(404).json({ message: "No todos exists" });
	}
	res.status(200).json(todos);
});

app.get("/todo/:id", async (req, res) => {
	const id = req.params.id;
	const todo = await getTodo(id);

	if (!todo) {
		res.status(404).json({ message: "Data not found" });
	}
	res.status(200).json(todo);
});

app.post("/todo", async (req, res) => {
	const { title, description } = req.body;
	const createdTodo = await createTodo(title, description);

	res.status(200).json(createdTodo);
});

app.put("/todo/:id", async (req, res) => {
	const { id } = req.params;
	const { title, description } = req.body;

	const todoExists = await getTodo(id);
	if (!todoExists) {
		res.status(404).json({ message: "Todo doesn't exist" });
	}

	const updatedTodo = await updateTodo(id, title, description);
	res.status(200).json(updatedTodo);
});

app.delete("/todo/:id", async (req, res) => {
	const { id } = req.params;

	const todoExists = await getTodo(id);
	if (!todoExists) {
		res.status(404).json({ message: "Todo doesn't exists" });
	}

	await deleteTodo(id);
	res.status(200).json({ message: "Todo deleted successfully" });
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something broke!");
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
