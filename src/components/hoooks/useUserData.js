import axios from "axios";
import { useCallback, useState } from "react";

const useUserData = (username="atultingre") => {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    // const [repositories, setRepositories] = useState([]);
  
    const handleApiCall = useCallback(async () => {
      if (username !== "") {
        setIsLoading(true);
        try {
          const [user, repo, follow] = await Promise.all([
            axios.get(`https://api.github.com/users/${username}`),
            axios.get(`https://api.github.com/users/${username}/repos`),
          ]);
          setUserData(user.data);
          setRepositories(repo.data);
          setIsLoading(false);
        } catch (error) {
          console.error(error);
          setIsLoading(false);
          
        }
      }
    }, [username]);
  
    const handleSearch = useCallback(() => {
      handleApiCall();
    }, [handleApiCall]);
  
    return { userData, repositories, isLoading, handleSearch, following };
  };
  
  export default useUserData;
  