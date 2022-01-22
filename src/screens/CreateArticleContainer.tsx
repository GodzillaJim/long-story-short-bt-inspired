import { Edit, Home, Notes } from '@mui/icons-material';
import {
  Autocomplete,
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router';
import { array, object, string } from 'yup';
import CustomTabs from '../components/CustomTabs';
import CustomRichTextEditor from '../components/richtexteditor/CustomRichTextEditor';
import TopSection from '../components/TopSection';
import { getCategories } from '../data/Articles';

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
  const getCategoriesList = () => {
    return getCategories().map((cat) => ({ ...cat, label: cat.name }));
  };
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
        prompt: string().optional(),
        summary: string().required(message),
        content: string().required(message),
        tags: array().min(3),
        category: object().required(message),
      }),
      onSubmit: (values: IArticle) => {
        console.log(values);
      },
    });
  const items = [
    {
      name: 'Admin',
      link: '/',
      isActive: false,
      icon: <Home sx={{ mr: 0.5 }} fontSize="medium" />,
    },
    {
      name: 'Articles',
      link: '/articles',
      isActive: false,
      icon: <Notes sx={{ mr: 0.5 }} fontSize="medium" />,
    },
    {
      name: 'Write',
      link: '/articles/create',
      isActive: true,
      icon: <Edit sx={{ mr: 0.5 }} fontSize="medium" />,
    },
  ];
  const navigate = useNavigate();
  //TODO: Fetch all categories
  const basicDetails = (
    <Paper>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-2 gap-5">
          <div className="col-span-1">
            <TextField
              name="title"
              value={values.title}
              onChange={(e) => setFieldValue('title', e.target.value)}
              label={'Title'}
              variant="outlined"
              size="small"
              helperText={touched.title ? errors.title : undefined}
              fullWidth
            />
          </div>
          <div className="col-span-1">
            <Autocomplete
              options={getCategoriesList()}
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  name="category"
                  value={values.category}
                  onChange={(e) => setFieldValue('category', e.target.value)}
                  label={'Category'}
                  variant="outlined"
                  size="small"
                  fullWidth
                  helperText={touched.category ? message : undefined}
                />
              )}
            />
          </div>
        </div>
        <Divider />
        <div className="text-input">
          <CustomRichTextEditor />
        </div>
        <Divider />
        <div>
          <div className="grid grid-cols-1">
            <div className="col-span-1">
              <TextField
                name="summary"
                value={values.summary}
                onChange={(e) => setFieldValue('summary', e.target.value)}
                variant="outlined"
                size="small"
                label="Summary"
                fullWidth
                multiline
                rows={3}
                helperText={touched.summary ? errors.summary : undefined}
              />
            </div>
          </div>
        </div>
        <Divider />
        <div className="save-buttons">
          <div className="flex flex-row gap-5 justify-end">
            <div>
              <Button
                type="button"
                onClick={() => navigate('/articles')}
                color="primary"
                variant="outlined">
                Cancel
              </Button>
            </div>
            <div>
              <Button type="submit" color="primary" variant="contained">
                Save Draft
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Paper>
  );
  return (
    <div className="flex flex-col gap-3 m-3">
      <div className="my-2">
        <TopSection items={items} breadCrumbsOnly />
      </div>
      <Paper>
        <CustomTabs
          items={[
            { header: 'Basic Details', content: basicDetails },
            {
              header: 'More Details',
              content: MoreDetails(),
            },
          ]}
        />
      </Paper>
    </div>
  );
};

const MoreDetails = () => {
  return <div>Hello world</div>;
};
export default CreateArticleContainer;
