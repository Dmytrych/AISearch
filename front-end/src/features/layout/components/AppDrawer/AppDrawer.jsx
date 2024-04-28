import {Drawer} from "@mui/material";

export default function AppDrawer({ open, onClose, children }) {
    return (
        <Drawer
            anchor='left'
            open={open}
            onClose={onClose}
        >
            {children}
        </Drawer>
    )
}