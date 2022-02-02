import { boolean } from "@sigodenjs/fake";
import { LoremIpsum } from "lorem-ipsum";
import { v4 } from "uuid";

export const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});
export interface IArticle {
  id: string;
  title: string;
  content: string;
  published: boolean;
  summary: string;
  prompt: string;
  category: string;
  tags: string[];
  comments: {
    firstName: string;
    lastName: string;
    content: string;
    date: Date;
  }[];
  author: string;
  archived: boolean;
  createdOn: Date;
}
export const getArticles = () => {
  const temp: IArticle[] = [];
  for (let numOfArticles = 0; numOfArticles < 10; numOfArticles++) {
    const article = {
      id: `key-${v4()}`,
      title: lorem.generateWords(6),
      content: `<p>/t${lorem.generateParagraphs(
        3
      )}</p><p>${lorem.generateParagraphs(3)}</p>`,
      published: lorem.generator.generateRandomInteger(1, 100) % 2 === 0,
      summary: lorem.generateParagraphs(1),
      prompt: lorem.generateParagraphs(1),
      category: lorem.generateWords(1),
      tags: [
        lorem.generateWords(1),
        lorem.generateWords(1),
        lorem.generateWords(1),
      ],
      comments: [
        {
          firstName: lorem.generateWords(1),
          lastName: lorem.generateWords(1),
          content: lorem.generateSentences(3),
          date: new Date(),
        },
        {
          firstName: lorem.generateWords(1),
          lastName: lorem.generateWords(1),
          content: lorem.generateSentences(3),
          date: new Date(),
        },
        {
          firstName: lorem.generateWords(1),
          lastName: lorem.generateWords(1),
          content: lorem.generateSentences(3),
          date: new Date(),
        },
      ],
      author: lorem.generateWords(1),
      archived: lorem.generator.generateRandomInteger(1, 100) % 2 === 0,
      createdOn: new Date(),
    } as IArticle;
    temp.push(article);
  }
  return temp;
};

export interface ICategory {
  name: string;
  createdOn: Date;
  id: string;
  label: string;
  value: string;
  archived: boolean;
}
export const getCategories = () => {
  const temp = [];
  for (let numOfCategories = 0; numOfCategories < 100; numOfCategories++) {
    temp.push({
      name: lorem.generateWords(1),
      createdOn: new Date(),
      id: v4(),
      label: lorem.generateWords(1),
      value: lorem.generateWords(1),
      archived: false,
    } as ICategory);
  }
  return temp;
};

export interface ITags {
  name: string;
}
export const getTags = () => {
  const temp = [];
  for (let numOfTags = 0; numOfTags < 100; numOfTags++) {
    temp.push({ name: lorem.generateWords(1) } as ITags);
  }
  return temp;
};
