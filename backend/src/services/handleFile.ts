import { Request } from "express";
import multer from "multer";

const storage = multer.diskStorage({
        destination : function(req:Request,file:Express.Multer.File,cb:any) {
            const allowedFiles = ["image/jpg","image/png","image/jpeg"];
            if(!allowedFiles.includes(file.mimetype)) {
                return console.log("This file type is not allowed !!")
            }
            cb(null,"./src/storage")
        },
        filename : function(req : Request, file:Express.Multer.File, cb:any) {
            cb(null,Date.now() + "-" + file.originalname)
        },
    })
    
export {storage , multer}