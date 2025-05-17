import { createContext, useContext } from "react";

// Dummy current user for demonstration
const dummyUser = {
  id: 1,
  username: "demoUser",
  displayName: "Demo User",
  avatarUrl: "",
};

const UserContext = createContext(dummyUser);

export const useUser = () => useContext(UserContext);

export default UserContext;
