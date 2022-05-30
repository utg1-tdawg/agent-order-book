import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { IconButton } from "@mui/material";

function HomeButton() {
  const navigate = useNavigate();
  return (
    <IconButton edge="start" color="inherit" onClick={() => navigate("/")}>
      <HomeIcon />
    </IconButton>
  );
}

export default HomeButton;
