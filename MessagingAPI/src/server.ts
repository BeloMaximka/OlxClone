import app from "app";
import { WebSocketServer, WebSocket } from "ws";
import { z } from "zod";
import db from "./database";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error("Missing JWT_SECRENT env variable");
}

const messageSchema = z.object({
  authorId: z.number().positive(),
  conversationId: z.number().positive(),
  text: z.string().min(1, "Message text cannot be empty"),
});

const authorizationSchema = z.object({
  token: z.string().min(1, "JWT token is required"),
  conversationId: z.number().positive(),
});

const PORT = process.env.PORT || 3000;
const wss = new WebSocketServer({ noServer: true });

type WebSocketWithData = WebSocket & { id: number };
type AuthMessage = z.infer<typeof authorizationSchema>;
type Message = z.infer<typeof messageSchema>;

const conversations: Record<number, WebSocket[]> = {};
wss.on("connection", (socket: WebSocketWithData, req) => {
  console.log("WebSocket connection established.");
  let currentConversationId = -1;
  socket.on("message", async (data) => {
    try {
      const parsedData = JSON.parse(data.toString());

      try {
        const authorizationData: AuthMessage =
          authorizationSchema.parse(parsedData);
        authorizationData.token;
        try {
          jwt.verify(authorizationData.token, JWT_SECRET as string);
        } catch (error) {
          console.log(error);
          return;
        }

        currentConversationId = authorizationData.conversationId;
        conversations[authorizationData.conversationId] ??= [];
        conversations[authorizationData.conversationId].push(socket);
        return;
      } catch (error) {
        console.log(error);
      }
      const validatedData: Message = messageSchema.parse(parsedData);

      const { authorId, conversationId, text } = validatedData;

      const [result] = await db.execute(
        `INSERT INTO Messages (AuthorId, ConversationId, Text, WasRead)
         VALUES (?, ?, ?, 0)`,
        [authorId, conversationId, text]
      );

      const newMessageId = (result as any).insertId;

      conversations[conversationId]?.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(
            JSON.stringify({ id: newMessageId, authorId, conversationId, text })
          );
        }
      });
    } catch (error: any) {
      console.error("Error handling message:", error);
      socket.send(JSON.stringify({ error: error.message || "Invalid data" }));
    }
  });

  socket.on("close", () => {
    console.log("WebSocket connection closed.");
  });
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on("upgrade", (req, socket, head) => {
  wss.handleUpgrade(req, socket, head, (ws) => {
    wss.emit("connection", ws, req);
  });
});
