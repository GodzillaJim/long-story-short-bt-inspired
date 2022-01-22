import { LoremIpsum } from 'lorem-ipsum';
import { v4 } from 'uuid';

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
  comments: { firstName: string; lastName: string; content: string }[];
  author: string;
  archived: boolean;
}
export const getArticles = () => {
  const temp: IArticle[] = [];
  for (let a = 0; a < 10; a++) {
    const article = {
      id: `key-${v4()}`,
      title: lorem.generateWords(6),
      content: lorem.generateParagraphs(4),
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
        },
        {
          firstName: lorem.generateWords(1),
          lastName: lorem.generateWords(1),
          content: lorem.generateSentences(3),
        },
        {
          firstName: lorem.generateWords(1),
          lastName: lorem.generateWords(1),
          content: lorem.generateSentences(3),
        },
      ],
      author: lorem.generateWords(1),
      archived: lorem.generator.generateRandomInteger(1, 100) % 2 === 0,
    } as IArticle;
    temp.push(article);
  }
  return temp;
};

interface ICategory {
  name: string;
  createdAt: Date;
  id: string;
  label: string;
  value: string;
}
export const getCategories = () => {
  const temp = [];
  for (let a = 0; a < 100; a++) {
    temp.push({
      name: lorem.generateWords(1),
      createdAt: new Date(),
      id: v4(),
      label: lorem.generateWords(1),
      value: lorem.generateWords(1),
    } as ICategory);
  }
  return temp;
};

interface ITags {
  name: string;
}
export const getTags = () => {
  const temp = [];
  for (let a = 0; a < 100; a++) {
    temp.push({ name: lorem.generateWords(1) } as ITags);
  }
  return temp;
};
