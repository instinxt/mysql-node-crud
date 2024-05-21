import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql
	.createPool({
		host: process.env.MYSQL_HOST,
		user: process.env.MYSQL_USER,
		password: process.env.MYSQL_PASSWORD,
		database: process.env.MYSQL_DATABASE,
	})
	.promise();

export async function getTodos() {
	const [rows] = await pool.query("SELECT * FROM todos");
	return rows;
}

export async function getTodo(id) {
	const [rows] = await pool.query(`SELECT * FROM todos WHERE id = ?`, [id]);
	return rows[0];
}

export async function createTodo(title, description) {
	const [data] = await pool.query(
		`INSERT INTO todos (title, description) VALUES (?, ?)`,
		[title, description]
	);
	const id = data.insertId;
	return getTodo(id);
}

export async function updateTodo(id, title, description) {
	await pool.query(`UPDATE todos SET title = ?, description = ? WHERE id = ?`, [
		title,
		description,
		id,
	]);
	return getTodo(id);
}

export async function deleteTodo(id) {
	await pool.query(`DELETE FROM todos WHERE id = ?`, [id]);
}
