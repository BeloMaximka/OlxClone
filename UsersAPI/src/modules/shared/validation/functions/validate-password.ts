import { Context } from "@oak/oak/context";

const regexs = {
    includeDigits: /[0-9]/,
    includeSpecialCharacters: /[`~\!@#\$%\^\&\*\(\)\-_\=\+\[\{\}\]\\\|;:\'",<.>\/\?€£¥₹§±]/
}

export function validatePassword(ctx: Context, password: string) {
    ctx.assert(password, 400, "Password is required");
    ctx.assert(password.length >= 10, 400, "Password must be at least 10 characters long.");
    ctx.assert(regexs.includeDigits.exec(password), 400, "Password must have at least one digit.");
    ctx.assert(regexs.includeSpecialCharacters.exec(password), 400, "Password must have at least one special character.");
}