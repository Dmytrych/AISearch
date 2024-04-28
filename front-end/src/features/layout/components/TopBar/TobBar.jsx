import {AppBar, Box, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

export default function TopBar({ onMenuClick }) {
    return (<AppBar position="static">
        <Toolbar>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={onMenuClick}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                AI Search
            </Typography>
            <Box>
                Profile
            </Box>
        </Toolbar>
    </AppBar>)
}