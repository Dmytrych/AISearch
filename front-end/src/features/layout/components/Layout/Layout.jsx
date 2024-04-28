import {Box} from "@mui/material";
import AppDrawer from "../AppDrawer";
import DrawerContent from "../DrawerContent";
import TopBar from "../TopBar";
import {useState} from "react";

export default function Layout({ children }) {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    return (
        <Box>
            <TopBar onMenuClick={toggleDrawer(true)}/>
            <AppDrawer open={drawerOpen} onClose={toggleDrawer(false)}>
                <DrawerContent onSelect={toggleDrawer(false)}/>
            </AppDrawer>
            <Box>{children}</Box>
        </Box>
    )
}