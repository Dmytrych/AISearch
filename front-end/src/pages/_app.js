import "../styles/global.css"
import Layout from "../features/layout/components/Layout";

export default function App({ Component, pageProps }) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}