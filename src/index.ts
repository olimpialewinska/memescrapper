import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { extractData } from "./scrapper.js";
import { db } from "./firebase.js";
import { addDoc, collection, getDocs } from "firebase/firestore";



dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

interface Image {
  imageUrl: string;
  date: number;
}

let images: Image[] = [];

const getImages = async () => {
  const querySnapshot = await getDocs(collection(db, "Meme"));
  const newImages: Image[] = [];
  querySnapshot.forEach((doc) => {
    newImages.push(doc.data() as Image);
  });
  return newImages;
};

images = await getImages();


app.get("/", async (req: Request, res: Response) => {
  res.send(images);
});

app.get("/:number?", async (req: Request, res: Response) => {
  const number = req.params.number;
  if (number) {
    const newImages = images.slice(parseInt(number), parseInt(number)+10);
    res.send(newImages);
  } else {
    res.send(images);
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

const cacheImages = async () => {
  const newImages = await extractData("https://funnyjunk.com/");
  newImages.forEach((image) => {
    if (!images.find(x => x.imageUrl === image)) {
      const data: Image = {
        imageUrl: image,
        date: Date.now(),
      }
      addDoc(collection(db, "Meme"), data);
      images.push(data);
    }
  });
};

setInterval(async () => {
  await cacheImages();
}, 60 * 60 * 1000);

await cacheImages();
