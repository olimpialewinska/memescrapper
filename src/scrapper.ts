import axios, { AxiosError } from "axios";
import { load } from "cheerio";

function scrapper(url: string): Promise<string> {
  const HTMLData = axios
    .get(url)
    .then((res) => res.data)
    .catch((error: AxiosError) => {
      console.log(error.message);
      console.error(error.toJSON());
    });

  return HTMLData;
}

async function extractedData(url: string) {
  const HTMLData = await scrapper(url);
  const $ = load(HTMLData);
  const imageSources: string[] = [];
  $('img').each((index, element) => {
    const imageURL = $(element).attr('data-original');
    imageSources.push(imageURL? imageURL : '');
  });
  return imageSources;
}

export { extractedData };
