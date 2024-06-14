import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  Divider,
} from "@mui/material";

// Sample data for reviews

const ReviewList = ({ reviews }) => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 720,
        bgcolor: "background.paper",
        margin: "auto",
        mt: 4,
      }}
    >
      <Typography variant="h5" gutterBottom align="center">
        Customer Reviews
      </Typography>
      <List>
        {reviews.map((review) => (
          <React.Fragment key={review._id}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={`${review.name} - ${review.rating} Star${
                  review.rating > 1 ? "s" : ""
                }`}
                secondary={review.comment}
              />
            </ListItem>
            <Divider component="li" />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default ReviewList;
