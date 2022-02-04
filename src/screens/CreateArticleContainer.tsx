import { Edit, Home, Notes } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { v4 } from "uuid";
import { array, object, string } from "yup";
import { a11yProps, TabPanel } from "../components/CustomTabs";
import CustomRichTextEditor from "../components/richtexteditor/CustomRichTextEditor";
import TopSection from "../components/TopSection";
import { getCategories } from "../data/Articles";
import { ToastContainer, toast } from "react-toastify";
import MoreDetailsScreen from "./MoreDetailsScreen";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/combineReducers";
import {
  createBlogAction,
  fetchCategoriesAction,
} from "../redux/actions/BlogActions";
import { useStyles as customStyles } from "../styles/styles";
import CustomButton from "../components/CustomButton";
import CustomSelect from "../components/CustomSelect";
import { ICategory, IArticle } from "../types";

const CreateArticleContainer = () => {
  const message = "This field is required";
  const customClasses = customStyles();
  const [activeTab, setActiveTab] = useState<number>(0);
  const { loading, error, blog } = useSelector(
    (state: RootState) => state.createBlog
  );

  const dispatch = useDispatch();
  const formik = useFormik<IArticle>({
    initialValues: {
      title: "Sample Title",
      prompt: "Sample Prompt",
      summary: "Sample summary",
      content: "Sample content",
      tags: [],
      category: "",
      id: 0,
      createdOn: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      published: false,
      archived: false,
      comments: [],
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
      // dispatch(createBlogAction(values));
    },
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (blog) {
      toast.success("Blog created successfully. Redirecting to details page", {
        onOpen: () => {},
        onClose: () => {
          navigate(`/articles/${blog.id}`);
        },
      });
    }
    if (error) {
      toast.error("Blog creation failed");
    }
  }, [loading, blog, error, navigate]);
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
      isActive: false,
      icon: <Notes className={customClasses.icon} />,
    },
    {
      name: "Write",
      link: "/articles/create",
      isActive: true,
      icon: <Edit className={customClasses.icon} />,
    },
  ];
  //TODO: Fetch all categories

  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);
  return (
    <div className="flex flex-col gap-3 m-3">
      <div className="my-2">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <TopSection items={items} breadCrumbsOnly />
      </div>
      <div>
        <form className="mb-3" noValidate onSubmit={formik.handleSubmit}>
          <Paper>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={activeTab}
                  onChange={(e: any, newValue: any) => setActiveTab(newValue)}
                  className="ml-3"
                  aria-label="create article container"
                >
                  <Tab
                    sx={{ fontSize: "12px" }}
                    label={"Basic Details"}
                    {...a11yProps(0)}
                  />
                  <Tab
                    sx={{ fontSize: "12px" }}
                    label={"More Details"}
                    {...a11yProps(1)}
                  />
                </Tabs>
              </Box>
              <TabPanel index={0} value={activeTab}>
                <BasicDetails loading={loading} {...formik} />
              </TabPanel>
              <TabPanel index={1} value={activeTab}>
                <MoreDetailsScreen loading={loading} {...formik} />{" "}
              </TabPanel>
            </Box>
            <div className="save-buttons text-right pr-4 pb-3">
              {loading && <CircularProgress variant="indeterminate" />}
              {!loading && (
                <div className="flex flex-row gap-5 justify-end">
                  <div>
                    <CustomButton
                      type={"button"}
                      disabled={loading}
                      onClick={() =>
                        activeTab === 0
                          ? navigate("/articles")
                          : setActiveTab(0)
                      }
                      color="primary"
                      variant="outlined"
                    >
                      {activeTab === 0 ? "Cancel" : "Previous"}
                    </CustomButton>
                  </div>
                  <div>
                    <Button
                      type={"button"}
                      onClick={() =>
                        activeTab === 0 ? setActiveTab(1) : formik.submitForm()
                      }
                      color="primary"
                      disabled={
                        activeTab === 1 && formik.values.tags.length < 5
                      }
                      variant="contained"
                    >
                      {activeTab === 0 ? "Next" : "Save"}
                    </Button>
                  </div>
                </div>
              )}
            </div>
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
  loading: boolean;
}) => {
  const { setFieldValue, errors, values, touched, loading } = props;
  const getCategoriesList = () => {
    return getCategories();
  };
  const dispatch = useDispatch();
  const handleTitleChange = (e: any) => {
    setFieldValue("title", e.target.value);
  };
  const {
    blog: categories,
    loading: categoryLoading,
    error: categoryError,
  } = useSelector((state: RootState) => state.categories);
  useEffect(() => {
    if (!categoryLoading && !categoryError && !categories) {
      dispatch(fetchCategoriesAction());
    }
  }, [categories, categoryLoading, categoryError, dispatch]);

  const categoryList = useMemo(() => {
    let temp = categories || [];
    temp = temp.map((category: ICategory) => ({
      ...category,
      label: category.name,
      value: category.name,
    }));
    return temp;
  }, [categories]);
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-5">
        <div className="col-span-1 pr-4">
          <TextField
            key={`article-title`}
            id="title"
            value={values.title}
            onChange={handleTitleChange}
            label={"Title"}
            variant="outlined"
            size="small"
            helperText={touched.title ? errors.title : undefined}
            fullWidth
            disabled={loading}
            InputProps={{ sx: { fontSize: "12px" } }}
            InputLabelProps={{ sx: { fontSize: "12px" } }}
          />
        </div>
        <div className="col-span-1 pr-4">
          <FormControl fullWidth size="small">
            <InputLabel
              sx={{ fontSize: "12px" }}
              margin="dense"
              id="demo-simple-select-label"
            >
              Category
            </InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={values.category}
              label="Category"
              placeholder="Select article category"
              onChange={(e: any) => setFieldValue("category", e.target.value)}
              inputProps={{ sx: { fontSize: "12px" } }}
              sx={{
                sx: {
                  fontSize: "12px",
                  paddingBottom: "10px",
                  paddingTop: "6px",
                  height:"18px"
                },
              }}
            >
              {categoryList.map((cat: any) => (
                <MenuItem
                  sx={{ fontSize: "12px" }}
                  key={`key-${v4()}`}
                  value={cat.value}
                >
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
          loading={loading}
          handleChange={(newValue: string) =>
            setFieldValue("content", newValue)
          }
        />
      </div>
      <Divider />
      <div>
        <div className="grid grid-cols-1">
          <div className="col-span-1">
            <TextField
              name="summary"
              disabled={loading}
              value={values.summary}
              onChange={(e) => setFieldValue("summary", e.target.value)}
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
    </div>
  );
};
export default CreateArticleContainer;
