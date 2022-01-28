import React, {useMemo, useState, useEffect} from 'react';
import {Home, Category, Assignment} from '@mui/icons-material';
import {TableRow, TableCell, Typography, Paper, TextField, Divider, CircularProgress, List, ListItem, Button, ListItemText} from '@mui/material';
import {v4} from 'uuid';
import {format} from 'date-fns';
import {useFormik} from "formik";
import {object, string, date} from "yup";
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router';
import {toast} from "react-toastify";

import TopSection from '../components/TopSection';
import {getCategories, IArticle, ICategory} from '../data/Articles';
import DataList from '../components/DataList';
import {RootState} from '../redux/combineReducers';
import CustomError from '../components/CustomError';
import {getCategoryArticlesAction, updateCategoryAction} from '../redux/actions/BlogActions';

import {SomeContainer} from './Dashboard';

import "./CategoriesView.css";
import CustomSearchBox from '../components/CustomSearchBox';
import CustomToastify from '../components/CustomToastify';
import CustomDialog from '../components/CustomDialog';

import AddCategoryContainer from './AddCategoryContainer';

const CategoriesView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<ICategory | null>(null);
  const [page, setPage] = useState<number>(1);
  const [name, setName] = useState<string>('');
  const [addCategory, setAddCategory] = useState<boolean>(false);
  const {id} = useParams();

  const message = "This is required";
  const {setFieldValue, errors, touched, values, setValues} = useFormik<ICategory>({
    initialValues: {
      id: '',
      name: '',
      createdAt: new Date(),
      label: "",
      value: ''},
    validationSchema: object().shape({
      id: string(),
      name: string().required(message),
      createdAt: date(),
      label: string(),
      value: string(),
    }),
    onSubmit: (vals: ICategory) => {
      console.log(vals);
    },
  });
  const items = [
    {
      name: 'Admin',
      link: '/',
      isActive: false,
      icon: <Home sx={{mr: 0.5}} fontSize="medium" />,
    },
    {
      name: 'Tags',
      link: '/categories',
      isActive: false,
      icon: <Category sx={{mr: 0.5}} fontSize="medium" />,
    },
    {
      name: activeCategory ? activeCategory.name : "All",
      link: `/categories/${activeCategory?.id}`,
      isActive: true,
      icon: <Assignment sx={{mr: 0.5}} fontSize="medium" />,
    },
  ];
  const {loading, error, articles} = useSelector((state: RootState) => state.categoryArticles);
  const {loading: updating, error: updatingError, success} = useSelector((state: RootState) => state.updateCategory);
  const handleAddCategory = () => {
    setAddCategory(!addCategory);
  };
  useEffect(() => {
    if (success) {
      toast.success("Update successful");
    }
    if (updatingError) {
      toast.error(updatingError);
    }
  }, [updating, updatingError, success]);
  const handleSetCategory = (category: ICategory) => {
    setActiveCategory(category);
    setValues({...category});
    dispatch(getCategoryArticlesAction(category.id));
  };
  const headers = ['ID', 'Category', 'created On'];
  const categories = useMemo(() => {
    const start = page === 1 ? page : page * 10;
    let temp = getCategories().slice(start, start + 10);
    if (name && name !== "") {
      temp = temp.filter((cat: ICategory) => cat.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()));
    }
    return temp;
  }, [page, name]);
  const handleUpdateCategory = () => {
    dispatch(updateCategoryAction(values));
  };
  useEffect(() => {
    if (id) {
      setActiveCategory(categories.find((category: ICategory) => category.id.toLocaleLowerCase() === id) || null);
    }
  }, [id, categories]);
  return (
    <div>
      <SomeContainer>
        <div className="flex flex-col">
        <CustomToastify/>
          <div>
            <TopSection
              items={items}
              onClick={handleAddCategory}
              actionText="Add Category"
            />
          </div>
          <div className="category-search-box-container">
            <Paper className="mt-3 mb-3">
            <div className="flex flex-row justify-center">
              <div className="py-3">
              <CustomSearchBox placeholder={"Search category..."} maxWidth="400px" value={name} onChange={setName} />
              </div>
            </div>
            </Paper>
          </div>
          <div className="category-table">
            <div className="grid grid-cols-2 gap-3 table-container">
              <div className="col-span-1">
                <Paper style={{height: "100%"}}>
                <DataList
                  onRenderRow={(item: ICategory) =>
                    <TableRow onClick={() => handleSetCategory(item)} selected={activeCategory ? activeCategory.id === item.id : undefined} hover key={`key-${v4()}`}>
                      <TableCell>
                        {item.id}
                      </TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{format(item.createdAt, "dd/MM/yyyy")}</TableCell>
                    </TableRow>} headers={headers} items={categories} />
                </Paper>
              </div>
              <div className="col-span-1">
                {!activeCategory && <Typography variant="caption">Select category to view details</Typography>}
                {activeCategory && <Paper style={{height: "100%"}} >
                  <div className="flex flex-col p-3 gap-5 h-100">
                    <div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                        <TextField label="ID" size="small" variant="outlined" aria-readonly disabled value={values.id} />
                        </div>
                        <div>
                          <TextField label="Created On" size="small" variant="outlined" disabled value={format(values.createdAt, "dd/MM/yyyy")} />
                        </div>
                      </div>
                    </div>
                    <Divider/>
                    <div>
                      <div className="grid grid-cols-5 gap-1">
                        <div className="col-span-4">
                      <TextField fullWidth label="Category Name" size="small" variant="outlined" value={values.name} onChange={(event) => setFieldValue("name", event.target.value)} helperText={touched.name ? errors.name : undefined} />
                        </div>
                        <div className={ updating ? "col-span-1 text-center mt-1" : "text-center"}>
                          { updating && <CircularProgress variant="indeterminate" size={20} /> }
                          {!updating && <Button className="custom-button" disabled={values.name === activeCategory.name} variant="outlined" onClick={handleUpdateCategory} >UPDATE</Button>}
                        </div>
                      </div>
                    </div>
                    <Divider/>
                    <div className="article-list h-100 overflow-auto">
                      <div className="flex flex-col gap-2">
                        <div><Typography variant="h6" fontWeight="bold" >Articles</Typography>
                      </div>
                      <div className="text-center">
                        { loading && <CircularProgress variant="indeterminate" /> }
                        { error && <CustomError onClick={() => handleSetCategory(activeCategory)} message={error} /> }
                        { articles && <List key={`key-${v4()}`}>
                            {articles.map((article: IArticle, index: number) =>
                            (<ListItem style={{cursor: "pointer"}} onClick={() => navigate(`/articles/${article.id}`)} key={`key-${v4()}`} >
                                <ListItemText primary={ `${index + 1}. ${article.title}`} />
                            </ListItem>))}
                        </List> }
                      </div>
                      </div>
                    </div>
                  </div>
                  </Paper>}
              </div>
            </div>
          </div>
          <AddCategoryContainer open={addCategory} onClose={() => setAddCategory(!addCategory)} />
        </div>
      </SomeContainer>
    </div>
  );
};

export default CategoriesView;
