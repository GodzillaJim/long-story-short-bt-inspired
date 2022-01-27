import React, {useMemo, useState} from 'react';
import {Home, Category} from '@mui/icons-material';
import {TableRow, TableCell, Typography, Paper, TextField, Divider} from '@mui/material';
import {v4} from 'uuid';
import {format} from 'date-fns';
import {useFormik} from "formik";
import {object, string, date} from "yup";

import TopSection from '../components/TopSection';
import {getCategories, ICategory} from '../data/Articles';
import DataList from '../components/DataList';

import {SomeContainer} from './Dashboard';

const CategoriesView = () => {
  const [activeCategory, setActiveCategory] = useState<ICategory | null>(null);
  const [page, setPage] = useState<number>(1);
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
      link: '/tags',
      isActive: true,
      icon: <Category sx={{mr: 0.5}} fontSize="medium" />,
    },
  ];
  const handleAddCategory = () => {
    // More stuff
  };
  const handleSetCategory = (category: ICategory) => {
    setActiveCategory(category);
    setValues({...category});
  };
  const headers = ['ID', 'Category', 'created On'];
  const categories = useMemo(() => {
    const start = page === 1 ? page : page * 10;
    return getCategories().slice(start, start + 10);
  }, [page]);
  return (
    <div>
      <SomeContainer>
        <div className="flex flex-col">
          <div>
            <TopSection
              items={items}
              onClick={handleAddCategory}
              actionText="Add Category"
            />
          </div>
          <div className="category-table">
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-1">
                <DataList
                  onRenderRow={(item: ICategory) =>
                    <TableRow onClick={() => handleSetCategory(item)} selected={activeCategory ? activeCategory.id === item.id : undefined} hover key={`key-${v4()}`}>
                      <TableCell>
                        {item.id}
                      </TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{format(item.createdAt, "dd/MM/yyyy")}</TableCell>
                    </TableRow>} headers={headers} items={categories} />

              </div>
              <div className="col-span-1">
                {!activeCategory && <Typography variant="caption">Select category to view details</Typography>}
                {activeCategory && <Paper>
                  <div className="flex flex-col p-3 gap-5">
                    <div>
                      <div className="grid grid-cols-2" gap-3>
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
                      <TextField fullWidth label="Category Name" size="small" variant="outlined" value={values.name} onChange={(event) => setFieldValue("name", event.target.value)} helperText={touched.name ? errors.name : undefined} />
                    </div>
                    <Divider/>
                    <div className="article-list">
                      <Typography variant="h6" fontWeight="bold" >Articles</Typography>
                    </div>
                  </div>
                  </Paper>}
              </div>
            </div>
          </div>
        </div>
      </SomeContainer>
    </div>
  );
};

export default CategoriesView;
