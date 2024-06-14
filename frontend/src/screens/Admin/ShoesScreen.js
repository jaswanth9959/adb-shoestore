import React from "react";
import { useGetShoesQuery } from "../../slices/shoesApiSlice";
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

function ShoesScreen() {
  const navigate = useNavigate();
  const { data: shoes, isLoading } = useGetShoesQuery();
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
        <Typography variant="h3">All Shoes</Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            onClick={() => navigate("/admin/shoes/add")}
          >
            Add Shoe
          </Button>
        </Box>

        <TableContainer component={Paper} sx={{ my: 3 }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Brand</TableCell>
                <TableCell align="center">Stock</TableCell>
                <TableCell align="center">Category</TableCell>
                <TableCell align="center">Gender</TableCell>
                <TableCell align="center">Color</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Action</TableCell>
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
                  {shoes.map((shoe) => (
                    <TableRow key={shoe._id}>
                      <TableCell align="center" component="th" scope="row">
                        {shoe.name}
                      </TableCell>
                      <TableCell align="center">{shoe.brand}</TableCell>
                      <TableCell align="center">{shoe.stock}</TableCell>
                      <TableCell align="center">{shoe.category.name}</TableCell>
                      <TableCell align="center">{shoe.gender}</TableCell>
                      <TableCell align="center">{shoe.color}</TableCell>
                      <TableCell align="center">${shoe.price}</TableCell>
                      <TableCell align="center">
                        <Button
                          onClick={() =>
                            navigate(`/admin/shoe/edit/${shoe._id}`)
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

export default ShoesScreen;
