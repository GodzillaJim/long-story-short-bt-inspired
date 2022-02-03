import { Edit, Home, Notes } from "@mui/icons-material";
import {
  CircularProgress,
  FormControlLabel,
  FormGroup,
  IconButton,
  Pagination,
  Paper,
  Switch,
  TableCell,
  TableRow,
} from "@mui/material";
import { format } from "date-fns";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { v4 } from "uuid";

import CustomError from "../components/CustomError";
import CustomSelect from "../components/CustomSelect";
import DataList from "../components/DataList";
import TopSection from "../components/TopSection";
import { IArticle } from "../data/Articles";
import {
  fetchAllArticlesAction,
  fetchCategoriesAction,
} from "../redux/actions/BlogActions";
import { RootState } from "../redux/combineReducers";
import { CREATE_BLOG_RESET } from "../redux/constants/ArticleConstants";

import "./ArticlesView.css";
import { SomeContainer } from "./Dashboard";
import { useStyles as customStyles } from "../styles/styles";
import { toast } from "react-toastify";
import CustomToastify from "../components/CustomToastify";
import { ICategory } from "../types";

const ArticlesView = () => {
  const [page] = useState<number>(1);
  const dispatch = useDispatch();
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<any>();
  const [published, setPublished] = useState<boolean>(false);
  const [archived, setArchived] = useState<boolean>(false);
  const customClasses = customStyles();
  const {
    loading,
    error,
    blog: categories,
  } = useSelector((state: RootState) => state.categories);
  const {
    loading: loadingAllArticles,
    error: allArticleError,
    articles,
  } = useSelector((state: RootState) => state.allArticles);
  useEffect(() => {
    if (!loadingAllArticles && !allArticleError && !articles) {
      dispatch(fetchAllArticlesAction());
    }
  }, [loadingAllArticles, allArticleError, articles, dispatch]);
  useEffect(() => {
    if (!loading && !categories && !error) {
      dispatch(fetchCategoriesAction());
    }
    if (error) {
      toast.error(error);
    }
  }, [categories, loading, error, dispatch]);
  const items = [
    {
      name: "Admin",
      link: "/",
      isActive: false,
      icon: <Home className={customClasses.icon} />,
    },
    {
      name: "Articles",
      link: "/articles",
      isActive: true,
      icon: <Notes className={customClasses.icon} />,
    },
  ];
  const categoryList = useMemo(() => {
    let temp = categories || [];
    temp = temp.map((cat: ICategory) => ({
      ...cat,
      label: cat.name,
      value: cat.name,
    }));
    return temp;
  }, [categories]);
  const articleList = useMemo(() => {
    let temp = articles || [];
    if (category) {
      temp = temp.filter((cat: IArticle) => cat.category === category.name);
    }
    if (title !== "") {
      temp = temp.filter((article: IArticle) =>
        article.title.toLowerCase().includes(title.toLowerCase())
      );
    }
    temp = temp.filter((article: IArticle) => article.archived === archived);
    return temp.filter((article: IArticle) => article.published === published);
  }, [title, category, published, archived, articles]);
  const headers = ["ID", "Title", "Category", "Content", "Created On", ""];
  const navigate = useNavigate();
  const cellStyle = {
    fontFamily: "Sans Serif",
    width: "calc((100% - 48px) / 6)",
    paddingTop: "4px",
    paddingBottom: "4px",
    paddingRight: "8px",
    paddingLeft: "8px",
    fontSize: "12px",
  };

  return (
    <div className="w-full">
      <SomeContainer>
        <div className="flex flex-col mb-4 h-100 gap-5">
          <div className="articles-top-section">
            <CustomToastify />
            <TopSection
              items={items}
              onClick={() => {
                dispatch({ type: CREATE_BLOG_RESET });
                navigate("/articles/create");
              }}
              actionText={"Create a Blog"}
            />
          </div>
          <div className="search-bar">
            <div className="grid grid-cols-3 px-3 py-2 gap-3">
              <div className="col-span-1">
                <input
                  className="search-bar-title"
                  name="title"
                  value={title}
                  disabled={loadingAllArticles}
                  placeholder="Enter article title to search"
                  onChange={(event) => setTitle(event.target.value)}
                />
              </div>
              <div className="col-span-1">
                {loading && (
                  <CircularProgress variant="indeterminate" size={20} />
                )}
                {(categories || error) && (
                  <CustomSelect
                    isLoading={loading}
                    isSearchable={true}
                    isClearable
                    isDisabled={loadingAllArticles}
                    options={categoryList}
                    handleChange={setCategory}
                    placeholder="Select category"
                  />
                )}
              </div>
              <div className="col-span-1">
                <div className="flex flex-row gap-5 justify-center">
                  <div>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Switch
                            color="secondary"
                            size="small"
                            disabled={loadingAllArticles}
                            checked={published}
                            onChange={() => setPublished(!published)}
                          />
                        }
                        componentsProps={{ typography: { fontSize: "12px" } }}
                        label="Published"
                      />
                    </FormGroup>
                  </div>
                  <div>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Switch
                            color="secondary"
                            size="small"
                            disabled={loadingAllArticles}
                            checked={archived}
                            onChange={() => setArchived(!published)}
                          />
                        }
                        componentsProps={{ typography: { fontSize: "12px" } }}
                        label="Archived"
                      />
                    </FormGroup>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="articles-table text-center">
            {loadingAllArticles && <CircularProgress variant="indeterminate" />}
            {allArticleError && (
              <CustomError
                message={allArticleError}
                onClick={() => dispatch(fetchAllArticlesAction())}
              />
            )}
            {articles && (
              <DataList
                onRenderRow={(item: IArticle) => (
                  <TableRow key={`key-${v4()}`}>
                    <TableCell sx={cellStyle}>{item.id}</TableCell>
                    <TableCell sx={cellStyle}>{item.title}</TableCell>
                    <TableCell sx={cellStyle}>{item.category}</TableCell>
                    <TableCell sx={cellStyle}>
                      {`${item.content.substring(0, 100)}...`}
                    </TableCell>
                    <TableCell sx={cellStyle}>
                      {format(item.createdOn, "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell sx={{ width: "48px", padding: 0 }}>
                      <IconButton
                        onClick={() => navigate(`/articles/${item.id}`)}
                      >
                        <Edit fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )}
                headers={headers}
                items={articleList}
              />
            )}
          </div>
          <div className="flex justify-center">
            {articleList.length > 10 && (
              <Paper className="p-1">
                <Pagination page={page} count={articleList.length} />
              </Paper>
            )}
          </div>
        </div>
      </SomeContainer>
    </div>
  );
};

export default ArticlesView;
