const validateUser = (user: any): boolean => {
  return (
    user.name && user.phoneNumber && user.password && user.role && user.location
  );
};

export default validateUser;
