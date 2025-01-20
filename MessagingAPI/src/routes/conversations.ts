import express from "express";
import { z, ZodError } from "zod";
import db from "../database";
import { authenticateJWT, authorizeRoles, Roles } from "../middleware/auth";
import { RowDataPacket } from "mysql2";

const router = express.Router();

const conversationSchema = z.object({
  advertisementId: z.number().positive(),
  customerId: z.number().positive(),
  isClosed: z.boolean().optional(),
});

const idSchema = z.object({
  id: z.string().regex(/^\d+$/, "ID must be numeric"),
});

router.get(
  "/",
  authenticateJWT,
  authorizeRoles([Roles.Admin]),
  async (req, res) => {
    try {
      const [rows] = await db.execute("SELECT * FROM Conversations");
      res.json(rows);
    } catch (error) {
      console.error("Error fetching conversations:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.get(
  "/:id",
  authenticateJWT,
  authorizeRoles([Roles.Admin, Roles.User]),
  async (req, res) => {
    try {
      const { id } = idSchema.parse(req.params);
      const [rows] = await db.execute<RowDataPacket[]>(
        "SELECT * FROM Conversations WHERE Id = ?",
        [Number(id)]
      );

      if (rows.length === 0) {
        res.status(404).json({ error: "Conversation not found" });
      }

      res.json(rows);
    } catch (error) {
      console.error("Error fetching conversation:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.post(
  "/",
  authenticateJWT,
  authorizeRoles([Roles.Admin, Roles.User]),
  async (req, res) => {
    try {
      const validated = conversationSchema.parse(req.body);
      const [result] = await db.execute(
        `INSERT INTO Conversations (AdvertisementId, CustomerId, IsClosed)
         VALUES (?, ?, ?)`,
        [
          validated.advertisementId,
          validated.customerId,
          validated.isClosed || 0,
        ]
      );
      res.status(201).json({ id: (result as any).insertId });
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          error: "Bad Request",
          message: "Invalid input data",
          details: error.errors,
        });
      } else {
        console.error("Error creating conversation:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    }
  }
);

router.put(
  "/:id",
  authenticateJWT,
  authorizeRoles([Roles.Admin]),
  async (req, res) => {
    try {
      const { id } = idSchema.parse(req.params);
      const validated = conversationSchema.parse(req.body);

      const [result] = await db.execute(
        `UPDATE Conversations SET AdvertisementId = ?, CustomerId = ?, IsClosed = ? WHERE Id = ?`,
        [
          validated.advertisementId,
          validated.customerId,
          validated.isClosed || 0,
          Number(id),
        ]
      );

      if ((result as any).affectedRows === 0) {
        res.status(404).json({ error: "Conversation not found" });
      }

      res.json({ success: true });
    } catch (error) {
      console.error("Error updating conversation:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.delete(
  "/:id",
  authenticateJWT,
  authorizeRoles([Roles.Admin]),
  async (req, res) => {
    try {
      const { id } = idSchema.parse(req.params);

      const [result] = await db.execute(
        "DELETE FROM Conversations WHERE Id = ?",
        [Number(id)]
      );

      if ((result as any).affectedRows === 0) {
        res.status(404).json({ error: "Conversation not found" });
      }

      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting conversation:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default router;
