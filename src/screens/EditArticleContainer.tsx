import React from 'react';
import { useParams } from 'react-router';

const EditArticleContainer = () => {
  const { id } = useParams();
  return <div>{id}</div>;
};

export default EditArticleContainer;
