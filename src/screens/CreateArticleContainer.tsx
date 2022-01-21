import { Paper, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { StringLiteralLike } from 'typescript';
import { array, object, string } from 'yup';

interface IArticle {
  title: string;
  prompt: string;
  summary: string;
  category: any;
  content: string;
  tags: any[];
}
const CreateArticleContainer = () => {
  const message = 'This field is required';
  const { values, errors, touched, handleSubmit, setFieldValue } =
    useFormik<IArticle>({
      initialValues: {
        title: '',
        prompt: '',
        summary: '',
        content: '',
        tags: [],
        category: null,
      },
      validationSchema: object().shape({
        title: string().required(message),
        prompt: string().required(message),
        summary: string().required(message),
        content: string().required(message),
        tags: array().min(3),
        category: object().required(message),
      }),
      onSubmit: (values: IArticle) => {
        console.log(values);
      },
    });
  return (
    <div className="m-3">
      <Paper>
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-1">
            <TextField variant="outlined" size="small" />
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default CreateArticleContainer;
