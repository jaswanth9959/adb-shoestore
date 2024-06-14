import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { Rating, Fab } from "@mui/material";
import { Link } from "react-router-dom";
export default function RecipeReviewCard({ shoe }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader title={shoe.name} subheader={`By ${shoe.brand}`} />
      <Link to={`/shoe/${shoe._id}`} style={{ textDecoration: "none" }}>
        <CardMedia
          component="img"
          height="194"
          image={`http://localhost:5000${shoe.image}`}
          alt={shoe.name}
        />
      </Link>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {shoe.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ mb: 2 }}>
        <Rating
          name="read-only"
          value={shoe.rating}
          readOnly
          size="large"
          sx={{ marginRight: "auto" }}
        />
        <Fab
          variant="extended"
          size="small"
          sx={{
            bgcolor: "primary.light",
            color: "#fff",
            "&:hover": { bgcolor: "primary.light" },
          }}
        >
          <AttachMoneyIcon />
          <Typography>{shoe.price}</Typography>
        </Fab>
      </CardActions>
    </Card>
  );
}
