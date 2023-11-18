

import Container from '@mui/material/Container';
import Layout from '../../components/Layout';
import Paper from '@mui/material/Paper';
import UserDetails from "../../components/MuiComponent/PhotoGrapherProfile/UserDetails"

const ProfilePage = ({ data }) => {
    return (
        <Layout>
        <Container component="main" maxWidth="md" sx={{ mt: 8 }}>
            <Paper variant="outlined" sx={{ my: { xs: 2, md: 4 }, p: { xs: 2, md:1 } }}>
                <UserDetails data={data} />
            </Paper>
        </Container>
        </Layout>
    )
}

export default ProfilePage

export async function getServerSideProps() {

    return {
        props: {
            data: {},
        },
    }
}