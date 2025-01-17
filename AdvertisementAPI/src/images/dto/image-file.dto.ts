import { ReadStream } from "fs";

export interface ImageFile {
    contentType: string,
    content: ReadStream
}