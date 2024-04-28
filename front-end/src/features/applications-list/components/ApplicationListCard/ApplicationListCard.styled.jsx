import {styled, Typography} from "@mui/material";

export const StyledApplicationTitle = styled(Typography)(({theme}) => ({
    ":hover": {
        textDecoration: "underline",
        color: theme.palette.primary.main
    }
}))