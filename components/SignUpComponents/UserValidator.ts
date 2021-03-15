import { UserEntity } from "../Types";

const validateUser = (user: Partial<UserEntity>): boolean => {
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
