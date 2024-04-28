import {ApplicationList} from "../features/applications-list/components/ApplicationList/ApplicationList";
import {Box} from "@mui/material";

export default function Home() {
  return <Box pt={2}>
    <ApplicationList/>
  </Box>;
}
