import React, { useMemo, useState, useEffect, useCallback } from "react";
import { Home, Category, Assignment, Delete } from "@mui/icons-material";
import {
  TableRow,
  TableCell,
  Typography,
  Paper,
  TextField,
  Divider,
  CircularProgress,
  List,
  ListItem,
  Button,
  ListItemText,
  IconButton,
} from "@mui/material";
import { v4 } from "uuid";
import { format, parseISO } from "date-fns";
import { useFormik } from "formik";
import { object, string, date } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

import TopSection from "../components/TopSection";
import { IArticle, ICategory } from "../data/Articles";
import DataList from "../components/DataList";
import { RootState } from "../redux/combineReducers";
import CustomError from "../components/CustomError";
import {
  archiveCategoryAction,
  deleteCategoryAction,
  fetchCategoriesAction,
  getCategoryAction,
  getCategoryArticlesAction,
  unArchiveCategoryAction,
  updateCategoryAction,
} from "../redux/actions/BlogActions";

import { SomeContainer } from "./Dashboard";

import "./CategoriesView.css";
import CustomSearchBox from "../components/CustomSearchBox";
import CustomToastify from "../components/CustomToastify";

import AddCategoryContainer from "./AddCategoryContainer";
import { useStyles as customStyles } from "../styles/styles";
import {
  ARCHIVE_CATEGORY_RESET,
  DELETE_CATEGORY_RESET,
  UNARCHIVE_CATEGORY_RESET,
  UPDATE_ARTICLE_RESET,
} from "../redux/constants/ArticleConstants";
import CustomSwitch from "../components/CustomSwitch";

const CategoriesView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const customClasses = customStyles();
  const [activeCategory, setActiveCategory] = useState<ICategory | null>(null);
  const [name, setName] = useState<string>("");
  const [addCategory, setAddCategory] = useState<boolean>(false);
  const { id } = useParams();

  const message = "This is required";
  const { setFieldValue, errors, touched, values, setValues } =
    useFormik<ICategory>({
      initialValues: {
        id: "",
        name: "",
        createdOn: new Date(),
        label: "",
        value: "",
        archived: false,
      },
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
      name: "Admin",
      link: "/",
      isActive: false,
      icon: <Home className={customClasses.icon} />,
    },
    {
      name: "Categories",
      link: "/categories",
      isActive: false,
      icon: <Category className={customClasses.icon} />,
    },
    {
      name: activeCategory ? activeCategory.name : "All",
      link: `/categories/${activeCategory?.id}`,
      isActive: true,
      icon: <Assignment className={customClasses.icon} />,
    },
  ];
  const { loading, error, articles } = useSelector(
    (state: RootState) => state.categoryArticles
  );
  const {
    loading: updating,
    error: updatingError,
    success,
  } = useSelector((state: RootState) => state.updateCategory);
  const {
    blog: allCategories,
    loading: loadingCategories,
    error: categoriesError,
  } = useSelector((state: RootState) => state.categories);
  useEffect(() => {
    if (!allCategories && !loadingCategories && !categoriesError) {
      dispatch(fetchCategoriesAction());
    }
  }, [allCategories, loadingCategories, categoriesError, dispatch]);
  const handleAddCategory = () => {
    setAddCategory(!addCategory);
  };
  useEffect(() => {
    if (success) {
      toast.success("Update successful", {
        onClose: () => dispatch({ type: UPDATE_ARTICLE_RESET }),
      });
    }
    if (updatingError) {
      toast.error(updatingError, {
        onClose: () => dispatch({ type: UPDATE_ARTICLE_RESET }),
      });
    }
  }, [updating, updatingError, success, dispatch]);
  const handleSetCategory = useCallback(
    (category: ICategory) => {
      setActiveCategory(category);
      setValues({ ...category });
      dispatch(getCategoryArticlesAction(category.name));
    },
    [dispatch, setValues]
  );
  const headers = ["ID", "Category", "created On", ""];
  const categories = useMemo(() => {
    let temp = allCategories || [];
    temp = temp.map((c: any) => ({ ...c, createdOn: parseISO(c.createdOn) }));
    if (name && name !== "") {
      temp = temp.filter((cat: ICategory) =>
        cat.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())
      );
    }
    return temp;
  }, [name, allCategories]);
  const handleUpdateCategory = () => {
    dispatch(updateCategoryAction(values));
  };
  const {
    loading: activeCategoryLoading,
    error: activeCategoryError,
    category,
  } = useSelector((state: RootState) => state.activeCategory);
  useEffect(() => {
    if (id) {
      if (!category && !activeCategoryLoading && !activeCategoryError) {
        dispatch(getCategoryAction(id));
      }
      if (category && id + "" !== category.id + "") {
        dispatch(getCategoryAction(id));
      }
    }
  }, [
    id,
    category,
    activeCategoryLoading,
    activeCategoryError,
    dispatch,
    setValues,
  ]);
  useEffect(() => {
    if (category) {
      setValues({ ...category, createdOn: parseISO(category.createdOn) });
      setActiveCategory({
        ...category,
        createdOn: parseISO(category.createdOn),
      });
    }
  }, [category, setValues]);
  const handleReFetchCategories = () => {
    dispatch(fetchCategoriesAction());
  };
  const {
    loading: deleting,
    success: deleted,
    error: deleteError,
  } = useSelector((state: RootState) => state.deleteCategory);
  useEffect(() => {
    if (deleted) {
      toast.success("Category deleted successfully!", {
        onClose: () => dispatch({ type: DELETE_CATEGORY_RESET }),
      });
    }
    if (deleteError) {
      toast.error("Deletion failed", {
        onClose: () => dispatch({ type: DELETE_CATEGORY_RESET }),
      });
    }
  }, [deleting, deleted, deleteError, dispatch]);
  const handleDelete = (category: ICategory) => {
    setActiveCategory(category);
    dispatch(deleteCategoryAction(category.id));
  };
  const handleArchive = () => {
    if (activeCategory) {
      if (activeCategory.archived) {
        dispatch(unArchiveCategoryAction(activeCategory.id));
      } else {
        dispatch(archiveCategoryAction(activeCategory.id));
      }
    }
  };
  const {
    loading: archiving,
    error: archiveError,
    success: archived,
  } = useSelector((state: RootState) => state.archiveCategory);
  const {
    loading: unArchiving,
    error: unArchiveError,
    success: unArchived,
  } = useSelector((state: RootState) => state.unArchiveCategory);
  useEffect(() => {
    if (archived) {
      toast.success("Category Archived", {
        onClose: () => {
          dispatch({ type: ARCHIVE_CATEGORY_RESET });
        },
      });
    }
    if (archiveError) {
      toast.error(archiveError, {
        onClose: () => {
          dispatch({ type: ARCHIVE_CATEGORY_RESET });
        },
      });
    }
  }, [archiveError, archived, dispatch, navigate]);
  useEffect(() => {
    if (unArchived) {
      toast.success("Unarchived successfully", {
        onClose: () => dispatch({ type: UNARCHIVE_CATEGORY_RESET }),
      });
    }
    if (unArchiveError) {
      toast.error(unArchiveError, {
        onClose: () => {
          dispatch({ type: UNARCHIVE_CATEGORY_RESET });
        },
      });
    }
  }, [unArchived, unArchiveError, dispatch]);
  const handleRefreshActiveCategory = () => {
    if (id) {
      dispatch(getCategoryAction(id));
    }
  };
  return (
    <div>
      <SomeContainer>
        <div className="flex flex-col">
          <CustomToastify />
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
                  <CustomSearchBox
                    placeholder={"Search category..."}
                    maxWidth="400px"
                    value={name}
                    onChange={setName}
                  />
                </div>
              </div>
            </Paper>
          </div>
          <div className="category-table">
            <div className="grid grid-cols-2 gap-3 table-container">
              <div className="col-span-1">
                <Paper className="text-center pt-2" style={{ height: "100%" }}>
                  {categoriesError && (
                    <CustomError
                      message={categoriesError}
                      onClick={handleReFetchCategories}
                    />
                  )}
                  {loadingCategories && (
                    <CircularProgress size={20} variant="indeterminate" />
                  )}
                  {allCategories && (
                    <DataList
                      onRenderRow={(item: ICategory) => (
                        <TableRow
                          sx={{ height: "fit-content" }}
                          onClick={() => navigate(`/categories/${item.id}`)}
                          selected={
                            activeCategory
                              ? activeCategory.id === item.id
                              : undefined
                          }
                          hover
                          key={`key-${v4()}`}
                        >
                          <TableCell className="px-2 py-1">{item.id}</TableCell>
                          <TableCell className="px-2 py-1">
                            {item.name}
                          </TableCell>
                          <TableCell className="px-2 py-1">
                            {format(item.createdOn, "dd/MM/yyyy")}
                          </TableCell>
                          <TableCell className="px-2 py-1">
                            {deleting &&
                              activeCategory &&
                              activeCategory.id === item.id && (
                                <CircularProgress
                                  size={20}
                                  variant="indeterminate"
                                />
                              )}
                            {(!deleting ||
                              (activeCategory &&
                                activeCategory.id !== item.id)) && (
                              <IconButton onClick={() => handleDelete(item)}>
                                <Delete />
                              </IconButton>
                            )}
                          </TableCell>
                        </TableRow>
                      )}
                      headers={headers}
                      items={categories}
                    />
                  )}
                </Paper>
              </div>
              <div className="col-span-1">
                {!activeCategory && (
                  <Typography variant="caption">
                    Select category to view details
                  </Typography>
                )}
                {activeCategory && (
                  <Paper
                    className="text-center pt-2"
                    style={{ height: "100%" }}
                  >
                    {activeCategoryError && (
                      <CustomError
                        message={activeCategoryError}
                        onClick={handleRefreshActiveCategory}
                      />
                    )}
                    {activeCategoryLoading && (
                      <CircularProgress size={20} variant="indeterminate" />
                    )}
                    {category && (
                      <div className="flex flex-col p-3 gap-5 h-100">
                        <div>
                          <div className="grid grid-cols-3 gap-3">
                            <div>
                              <TextField
                                label="ID"
                                size="small"
                                variant="outlined"
                                aria-readonly
                                disabled
                                value={values.id}
                              />
                            </div>
                            <div>
                              <TextField
                                label="Created On"
                                size="small"
                                variant="outlined"
                                disabled
                                value={format(values.createdOn, "dd/MM/yyyy")}
                              />
                            </div>
                            <div>
                              <CustomSwitch
                                value={
                                  activeCategory && activeCategory.archived
                                }
                                loading={archiving || unArchiving}
                                onChange={handleArchive}
                                label={"Archived"}
                              />
                            </div>
                          </div>
                        </div>
                        <Divider />
                        <div>
                          <div className="grid grid-cols-5 gap-1">
                            <div className="col-span-4">
                              <TextField
                                fullWidth
                                label="Category Name"
                                size="small"
                                variant="outlined"
                                value={values.name}
                                onChange={(event) =>
                                  setFieldValue("name", event.target.value)
                                }
                                helperText={
                                  touched.name ? errors.name : undefined
                                }
                              />
                            </div>
                            <div
                              className={
                                updating
                                  ? "col-span-1 text-center mt-1"
                                  : "text-center"
                              }
                            >
                              {updating && (
                                <CircularProgress
                                  variant="indeterminate"
                                  size={20}
                                />
                              )}
                              {!updating && (
                                <Button
                                  className="custom-button"
                                  disabled={values.name === activeCategory.name}
                                  variant="outlined"
                                  onClick={handleUpdateCategory}
                                >
                                  UPDATE
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                        <Divider />
                        <div className="article-list h-100 overflow-auto">
                          <div className="flex flex-col gap-2">
                            <div>
                              <Typography variant="h6" fontWeight="bold">
                                Articles
                              </Typography>
                            </div>
                            <div className="text-center">
                              {loading && (
                                <CircularProgress
                                  size={20}
                                  variant="indeterminate"
                                />
                              )}
                              {error && (
                                <CustomError
                                  onClick={() =>
                                    handleSetCategory(activeCategory)
                                  }
                                  message={error}
                                />
                              )}
                              {articles && (
                                <List key={`key-${v4()}`}>
                                  {articles.map(
                                    (article: IArticle, index: number) => (
                                      <ListItem
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                          navigate(`/articles/${article.id}`)
                                        }
                                        key={`key-${v4()}`}
                                      >
                                        <ListItemText
                                          primary={`${index + 1}. ${
                                            article.title
                                          }`}
                                        />
                                      </ListItem>
                                    )
                                  )}
                                </List>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Paper>
                )}
              </div>
            </div>
          </div>
          <AddCategoryContainer
            open={addCategory}
            onClose={() => setAddCategory(!addCategory)}
          />
        </div>
      </SomeContainer>
    </div>
  );
};

export default CategoriesView;
