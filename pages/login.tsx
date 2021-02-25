import Login from "../components/SignUpComponents/Login";
import Head from "next/head";

const LoginPage = () => {
  return (
    <div className="w-full flex flex-row justify-center">
      <Head>
        <title>Login | Sellpoint</title>
      </Head>
      <Login />
    </div>
  );
};

export default LoginPage;
