import { User } from "../Types";

const validateUser = (user: Partial<User>): boolean => {
  return (
    user != undefined &&
    user.name != undefined &&
    user.username != undefined &&
    user.phoneNumber != undefined &&
    user.password != undefined &&
    user.role != undefined &&
    user.location != undefined
  );
};

export default validateUser;
