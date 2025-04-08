import { createContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setLoading(false);

      return;
    }

    try {
      const response = await axios.get("http://localhost:8000/api/me", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUser(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
