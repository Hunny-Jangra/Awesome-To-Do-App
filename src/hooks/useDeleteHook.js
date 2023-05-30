import { useQuery } from "react-query";
import axios from "axios";

const useDeleteHook = async ({id}) => {
    const {data} = await axios.delete(`http://localhost:4000/event/${id}`);
    return data;
  
}

export default useDeleteHook