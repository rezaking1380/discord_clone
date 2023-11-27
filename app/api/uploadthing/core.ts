import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 

const handelAuth = () => {
    const {userId} = auth();
    if(!userId) throw new Error("Unauthorized");
    return {userId: userId}
}
 
export const ourFileRouter = {
  serverImage: f({image: {maxFileSize: "2MB", maxFileCount: 1}})
  .middleware(() => handelAuth())
  .onUploadComplete(() => {}),
  massageFile: f(["image","pdf"])
  .middleware(() => handelAuth())
  .onUploadComplete(() => {}),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;