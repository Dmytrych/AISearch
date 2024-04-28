import {Box, Card, CardContent, CardMedia, Chip, Stack, Typography} from "@mui/material";
import Link from "next/link";
import {StyledApplicationTitle} from "./ApplicationListCard.styled";

export function ApplicationListCard({ title, subtitle, description, labels, url }) {
    return (
        <Card sx={{ display: 'flex', height: "200px", gap: 1 }}>
            <CardMedia
                component="img"
                sx={{ width: 200 }}
                image="images/img.png"
                alt="Live from space album cover"
            />
            <CardContent>
                <Stack direction="column" justifyContent="space-between" height="100%">
                    <Box>
                        <Link href={url} target="_blank">
                            <StyledApplicationTitle variant="h5" color="inherit">
                                {title}
                            </StyledApplicationTitle>
                        </Link>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            {subtitle}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {description}
                        </Box>
                    </Box>
                    {labels?.length ? <Stack direction="row" gap={1}>{
                        labels.map((label, index) => <Chip key={index} label={label}/>)
                    }</Stack> : null}
                </Stack>
            </CardContent>
        </Card>
    );
}