import React from "react";
import { useGetCategoriesQuery } from "../../slices/categoryApiSlice";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function CategoryScreen() {
  const navigate = useNavigate();
  const { data: categories, isLoading } = useGetCategoriesQuery();
  return (
    <div>
      <Button
        variant="contained"
        onClick={() => navigate("/admin/dashboard")}
        sx={{ my: 3 }}
      >
        Dashboard
      </Button>
      <Box sx={{ minHeight: 601 }}>
        <Typography variant="h3">All Categories</Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            onClick={() => navigate("/admin/category/add")}
          >
            Add Category
          </Button>
        </Box>

        <TableContainer component={Paper} sx={{ my: 3 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Category Name</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <Typography variant="body1" component="span">
                  Loading.....
                </Typography>
              ) : (
                <>
                  {" "}
                  {categories.map((category) => (
                    <TableRow key={category._id}>
                      <TableCell align="center" component="th" scope="row">
                        {category._id}
                      </TableCell>
                      <TableCell align="center">{category.name}</TableCell>
                      <TableCell align="center">
                        <Button
                          onClick={() =>
                            navigate(`/admin/category/update/${category._id}`)
                          }
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}

export default CategoryScreen;
