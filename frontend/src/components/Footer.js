import * as React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import CopyrightIcon from "@mui/icons-material/Copyright";
export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <Box
      component="section"
      sx={{
        p: 2,
        backgroundColor: "primary.light",
        color: "#fff",
        flexGrow: 1,
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          display: "flex",
          justifyContent: "center",
          height: "30px",
        }}
      >
        Shoe Store
        <IconButton color="inherit">
          <CopyrightIcon />
          <Typography variant="subtitle1">{currentYear}</Typography>
        </IconButton>
      </Typography>
    </Box>
  );
}

// import * as React from "react";
// import CssBaseline from "@mui/material/CssBaseline";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import Link from "@mui/material/Link";

// function Copyright() {
//   return (
//     <Typography variant="body2" color="text.secondary">
//       {"Copyright © "}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

// TODO remove, this demo shouldn't need to reset the theme.
// const defaultTheme = createTheme();

// export default function StickyFooter() {
//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           minHeight: "30vh",
//         }}
//       >
//         <Box
//           component="footer"
//           sx={{
//             py: 3,
//             px: 2,
//             mt: "auto",
//             backgroundColor: (theme) =>
//               theme.palette.mode === "light"
//                 ? theme.palette.grey[200]
//                 : theme.palette.grey[800],
//           }}
//         >
//           <Container maxWidth="sm">
//             <Typography variant="body1">
//               My sticky footer can be found here.
//             </Typography>
//             <Copyright />
//           </Container>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// }
