import React from 'react';
import { useParams } from 'react-router';

const EditArticleContainer = () => {
  const { id } = useParams();
  //TODO Fetch article by id
  return <div>{id}</div>;
};

export default EditArticleContainer;
