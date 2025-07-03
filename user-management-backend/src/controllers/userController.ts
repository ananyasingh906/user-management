import { Request, Response } from "express";
import { pool } from "../db";
import { validationResult } from "express-validator";
import { User } from "../models/User";
import xlsx from "xlsx";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await pool.query("SELECT * FROM users ORDER BY id DESC");
    res.json(rows);
  } catch (err: any) {
    console.error("Database error in getUsers():", err);
    res.status(500).json({ message: "Database error", error: err.message });
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const user: User = req.body;

  await pool.query(
    "INSERT INTO users (first_name, last_name, email, phone_number, pan_number) VALUES (?, ?, ?, ?, ?)",
    [user.first_name, user.last_name, user.email, user.phone_number, user.pan_number]
  );

  res.json({ message: "User created successfully" });
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  const user: User = req.body;

  await pool.query(
    "UPDATE users SET first_name=?, last_name=?, email=?, phone_number=?, pan_number=? WHERE id=?",
    [user.first_name, user.last_name, user.email, user.phone_number, user.pan_number, id]
  );

  res.json({ message: "User updated successfully" });
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  await pool.query("DELETE FROM users WHERE id=?", [id]);
  res.json({ message: "User deleted successfully" });
};

export const bulkUpload = async (req: Request, res: Response): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ message: "No file uploaded" });
    return;
  }

  const workbook = xlsx.read(req.file.buffer);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = xlsx.utils.sheet_to_json<User>(sheet);

  const errors: any[] = [];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    console.log("Rows:", row);
    if (!row.first_name || !row.last_name || !row.email || !row.phone_number || !row.pan_number) {
      errors.push({ row: i + 2, error: "All fields are required" });
      continue;
    }
    if (!emailRegex.test(row.email)) {
      errors.push({ row: i + 2, error: "Invalid email format" });
      continue;
    }
    if (!/^\d{10}$/.test(row.phone_number)) {
      errors.push({ row: i + 2, error: "Phone must be 10 digits" });
      continue;
    }
    if (!panRegex.test(row.pan_number)) {
      errors.push({ row: i + 2, error: "Invalid PAN format" });
      continue;
    }
  }

  if (errors.length > 0) {
    res.status(400).json({ errors });
    return;
  }

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    for (const row of rows) {
      await conn.query(
        "INSERT INTO users (first_name, last_name, email, phone_number, pan_number) VALUES (?, ?, ?, ?, ?)",
        [row.first_name, row.last_name, row.email, row.phone_number, row.pan_number]
      );
    }
    await conn.commit();
    res.json({ message: "All users uploaded successfully" });
  } catch (err) {
    await conn.rollback();
    res.status(500).json({ message: "Error during upload", error: err });
  } finally {
    conn.release();
  }
};

export const downloadSample = async (req: Request, res: Response): Promise<void> => {
  const wb = xlsx.utils.book_new();
  const ws = xlsx.utils.json_to_sheet([
    {
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@example.com",
      phone_number: "1234567890",
      pan_number: "ABCDE1234F"
    }
  ]);

  xlsx.utils.book_append_sheet(wb, ws, "Sample");
  const buffer = xlsx.write(wb, { type: "buffer", bookType: "xlsx" });
  res.setHeader("Content-Disposition", "attachment; filename=sample_template.xlsx");
  res.send(buffer);
};
