import Layout from "../components/layout/Layout";
import Main from "../components/main/Main";
import { URL } from "../utils/utils";

const Home = () => {
  return (
    <Layout url={URL}>
      <Main />
    </Layout>
  );
};

export default Home;
