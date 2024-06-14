import { useState } from "react";
import { useGetShoesQuery } from "../slices/shoesApiSlice";
import { useGetCategoriesQuery } from "../slices/categoryApiSlice";
import {
  Grid,
  Typography,
  Select,
  InputLabel,
  FormControl,
  MenuItem,
} from "@mui/material";
import Shoe from "../components/Shoe";
function HomeScreen() {
  const { data: shoes, isLoading, isError } = useGetShoesQuery();

  const { data: categories } = useGetCategoriesQuery();

  const [category, setCategory] = useState("All");
  const [gender, setGender] = useState("all");

  const handleGender = (event) => {
    setGender(event.target.value);
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  let filterItems;

  if (category === "All" && gender === "all") {
    filterItems = shoes;
  } else if (category === "All" && gender !== "all") {
    filterItems = shoes.filter((shoe) => shoe.gender === gender);
  } else if (category !== "All" && gender === "all") {
    filterItems = shoes.filter((shoe) => shoe.category.name === category);
  } else {
    filterItems = shoes.filter(
      (shoe) => shoe.category.name === category && shoe.gender === gender
    );
  }

  return (
    <>
      <Typography variant="h2" sx={{ py: 2 }}>
        Our Collection
      </Typography>
      <>
        <FormControl sx={{ mb: 3, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={category}
            label="Category"
            onChange={handleChange}
          >
            <MenuItem value="All">All</MenuItem>
            {categories?.map((cat) => (
              <MenuItem value={cat.name} key={cat._id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ ml: 3, mb: 3, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper">Gender</InputLabel>
          <Select
            labelId="demo-simple-select-helper"
            id="demo-simple-select"
            value={gender}
            label="Gender"
            onChange={handleGender}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </FormControl>
      </>

      {isLoading ? (
        <Typography> Loading...</Typography>
      ) : isError ? (
        <Typography>Error</Typography>
      ) : (
        <>
          <Grid container spacing={2}>
            {filterItems.map((shoe) => (
              <Grid item xs={4} key={shoe._id}>
                <Shoe shoe={shoe} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </>
  );
}

export default HomeScreen;
