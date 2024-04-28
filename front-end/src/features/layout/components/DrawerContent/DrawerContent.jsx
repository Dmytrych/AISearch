import {
    Box,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import MailIcon from '@mui/icons-material/Mail';

const items = ['Inbox', 'Starred', 'Send email', 'Drafts'];

export default function DrawerContent({ onSelect }) {
    return (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={onSelect}
            onKeyDown={onSelect}
        >
            <List>
                {items.map((text, index) => (
                    <ListItemButton key={text}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <MenuIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItemButton>
                ))}
            </List>
        </Box>
    )
}