import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

type Props = {
  title: string;
  subtitle: string;
  rightChildren?: React.ReactNode;
};

const Header = ({ title, subtitle, rightChildren }: Props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const RightChildren = rightChildren;
  return (
    <Box mb="30px" display={"flex"} justifyContent={"space-between"}>
      <Box>
        <Typography
          variant="h2"
          color={colors.grey[100]}
          fontWeight="bold"
          sx={{ m: "0 0 5px 0" }}
        >
          {title}
        </Typography>
        <Typography variant="h5" color={colors.greenAccent[400]}>
          {subtitle}
        </Typography>
      </Box>
      <Box>{RightChildren}</Box>
    </Box>
  );
};

export default Header;
