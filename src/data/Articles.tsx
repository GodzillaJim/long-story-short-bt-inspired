interface IArticle {
  id: string;
  title: string;
  content: string;
  published: boolean;
  summary: string;
  prompt: string;
  category: string;
  tags: string[];
  comments: { firstName: string; lastName: string; content: string }[];
}
export const getArticles = () => {
  const temp: IArticle[] = [];
  for (let a = 0; a < 100; a++) {
    const article = {};
  }
};
