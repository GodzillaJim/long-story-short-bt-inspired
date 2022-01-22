import { Edit, Home, Notes } from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tab,
  Tabs,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { v4 } from 'uuid';
import { array, object, string } from 'yup';
import { a11yProps, TabPanel } from '../components/CustomTabs';
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
  const [activeTab, setActiveTab] = useState<number>(0);

  const formik = useFormik<IArticle>({
    initialValues: {
      title: '',
      prompt: '',
      summary: '',
      content: '',
      tags: [],
      category: '',
    },
    validationSchema: object().shape({
      title: string().required(message),
      prompt: string().optional(),
      summary: string().required(message),
      content: string().required(message),
      tags: array().min(3),
      category: string().required(message),
    }),
    onSubmit: (values: IArticle) => {
      console.log(values);
    },
  });
  useEffect(() => console.log(formik.values), [formik.values]);
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
  //TODO: Fetch all categories
  return (
    <div className="flex flex-col gap-3 m-3">
      <div className="my-2">
        <TopSection items={items} breadCrumbsOnly />
      </div>
      <div>
        <form>
          <Paper>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={activeTab}
                  onChange={(e: any, newValue: any) => setActiveTab(newValue)}
                  className="ml-3"
                  aria-label="basic tabs example">
                  <Tab label={'Basic Details'} {...a11yProps(0)} />
                  <Tab label={'More Details'} {...a11yProps(1)} />
                </Tabs>
              </Box>
              <TabPanel index={0} value={activeTab}>
                <BasicDetails {...formik} />
              </TabPanel>
            </Box>
          </Paper>
        </form>
      </div>
    </div>
  );
};

const BasicDetails = (props: {
  setFieldValue: (text: string, value: any) => void;
  errors: any;
  values: any;
  touched: any;
}) => {
  const { setFieldValue, errors, values, touched } = props;
  const [title, setTitle] = useState<string>('');
  const getCategoriesList = () => {
    return getCategories();
  };
  const handleTitleChange = (e: any) => {
    setTitle(e.target.value || '');
    setFieldValue('title', e.target.value);
  };
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-5">
        <div className="col-span-1">
          <TextField
            key={`article-title`}
            id="title"
            value={title}
            onChange={handleTitleChange}
            label={'Title'}
            variant="outlined"
            size="small"
            helperText={touched.title ? errors.title : undefined}
            fullWidth
          />
        </div>
        <div className="col-span-1">
          <FormControl fullWidth size="small">
            <InputLabel margin="dense" id="demo-simple-select-label">
              Category
            </InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={values.category}
              label="Category"
              placeholder="Select article category"
              onChange={(e: any) => setFieldValue('category', e.target.value)}>
              {getCategoriesList().map((cat: any) => (
                <MenuItem key={`key-${v4()}`} value={cat.value}>
                  {cat.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <Divider />
      <div className="text-input">
        <CustomRichTextEditor
          value={values.content}
          handleChange={(newValue: string) =>
            setFieldValue('content', newValue)
          }
        />
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
            <Button type="button" color="primary" variant="contained">
              Save Draft
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
const MoreDetails = () => {
  return <div>Hello world</div>;
};
export default CreateArticleContainer;
