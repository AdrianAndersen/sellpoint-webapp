import Typography from "@material-ui/core/Typography";
import Login from "../components/SignUpComponents/Login";
const LoginPage = () => {
  return (
    <div className="w-full h-5/6 bg-green-400 p-10 text-center">
      <Typography variant="h6" className="h-full flex flex-col justify-center">
        <Login />
      </Typography>
    </div>
  );
};

export default LoginPage;
