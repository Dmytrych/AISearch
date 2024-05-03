import {
    CircularProgress,
    Container,
    Stack,
} from "@mui/material";
import ApplicationListCard from "../ApplicationListCard";
import useSWR from "swr";
import {API_ENDPOINTS, fetcher} from "../../../../services/fetcher";

export function ApplicationList() {

    const queryParams = {
        name: "asd"
    }
    const { data: applications, isLoading, error } = useSWR(API_ENDPOINTS.applications(), fetcher)

    if (isLoading) {
        return <CircularProgress/>
    }

    return (
        <Container>
            <Stack gap={1}>
                {applications.map((application, index) =>
                    <ApplicationListCard
                        key={index}
                        imageUrl={application.imageName ? API_ENDPOINTS.image(application.imageName) : null}
                        url={application.url}
                        title={application.name}
                        subtitle={application.subtitle}
                        description={application.description}
                        labels={application.labels}
                    />)}
            </Stack>
        </Container>
    );
}