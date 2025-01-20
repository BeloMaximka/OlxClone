import jwt from "jsonwebtoken";
import express from "express";

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error("Missing JWT_SECRENT env variable");
}

export enum Roles {
  Admin = "admin",
  User = "user",
}

interface DecodedToken {
  userId: number;
  roles: Roles[];
}

export const authenticateJWT = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET as string) as DecodedToken;
    req.user = decoded; // Attach user information to the request
    next(); // Proceed to the next middleware
  } catch (err) {
    res.status(403).json({ error: "Invalid or expired token" });
  }
};

export const authorizeRoles = (allowedRoles: Roles[]) => {
  return (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): void => {
    const user = req.user;

    let hasSufficientRole = false;
    allowedRoles.forEach((role) => {
      if (user?.roles.includes(role)) {
        hasSufficientRole = true;
      }
    });
    
    if (!hasSufficientRole) {
      res
        .status(403)
        .json({ error: "Forbidden: Insufficient role permissions" });
      return;
    }

    next();
  };
};

declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}
