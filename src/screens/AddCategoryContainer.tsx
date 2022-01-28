import { TextField, Button, CircularProgress } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import CustomDialog from "../components/CustomDialog";
import CustomToastify from "../components/CustomToastify";
import { addCategoryAction } from "../redux/actions/BlogActions";
import { RootState } from "../redux/combineReducers";

interface IAddCategoryContainer {
  open: boolean;
  onClose: () => void;
}
const AddCategoryContainer = (props: IAddCategoryContainer) => {
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector(
    (state: RootState) => state.addCategory
  );
  const { values, setFieldValue, submitForm } = useFormik<{
    categories: string;
  }>({
    initialValues: { categories: "" },
    onSubmit: (vals) => {
      const arrCat = vals.categories
        .split(",")
        .map((ele: string) => ele.trim());
      dispatch(addCategoryAction(arrCat));
    },
  });
  React.useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Category(ies) created successfully!");
      setFieldValue("categories", "");
    }
  }, [loading, error, success]);
  const handleCreateCategories = () => {
    submitForm();
  };
  return (
    <div>
      <CustomDialog
        title="Create Category"
        open={props.open}
        onClose={() => props.onClose()}
      >
        <div className="flex flex-col gap-3">
          <div>
            <TextField
              InputLabelProps={{ shrink: true }}
              fullWidth
              label="Category"
              placeholder="Category1, Category2,Category3, etc"
              multiline
              value={values.categories}
              onChange={(event) =>
                setFieldValue("categories", event.target.value)
              }
              rows={5}
              size="small"
              variant="outlined"
              name="new-category"
            />
          </div>
          <div className="flex justify-end">
            {loading && <CircularProgress variant="indeterminate" size={20} />}
            {!loading && (
              <Button
                disabled={values.categories === ""}
                onClick={handleCreateCategories}
                variant="outlined"
              >
                Create
              </Button>
            )}
          </div>
          <CustomToastify />
        </div>
      </CustomDialog>
    </div>
  );
};

export default AddCategoryContainer;
