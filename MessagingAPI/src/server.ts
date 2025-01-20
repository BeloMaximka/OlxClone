// src/server.ts
import app from 'app';
import express from 'express';
import { WebSocketServer, WebSocket } from 'ws';
import { z } from 'zod';
import db from "./database";

const messageSchema = z.object({
  authorId: z.number().positive(),
  conversationId: z.number().positive(),
  text: z.string().min(1, 'Message text cannot be empty'),
});

type Message = z.infer<typeof messageSchema>;

const PORT = process.env.PORT || 3000;

const wss = new WebSocketServer({ noServer: true });

wss.on('connection', (socket: WebSocket, req) => {
  console.log('WebSocket connection established.');

  socket.on('message', async (data) => {
    try {
      const parsedData = JSON.parse(data.toString());
      const validatedData: Message = messageSchema.parse(parsedData);

      const { authorId, conversationId, text } = validatedData;

      const [result] = await db.execute(
        `INSERT INTO Messages (AuthorId, ConversationId, Text, WasRead)
         VALUES (?, ?, ?, 0)`,
        [authorId, conversationId, text]
      );

      const newMessageId = (result as any).insertId;

      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(
            JSON.stringify({ id: newMessageId, authorId, conversationId, text })
          );
        }
      });
    } catch (error: any) {
      console.error('Error handling message:', error);
      socket.send(JSON.stringify({ error: error.message || 'Invalid data' }));
    }
  });

  socket.on('close', () => {
    console.log('WebSocket connection closed.');
  });
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on('upgrade', (req, socket, head) => {
  wss.handleUpgrade(req, socket, head, (ws) => {
    wss.emit('connection', ws, req);
  });
});
