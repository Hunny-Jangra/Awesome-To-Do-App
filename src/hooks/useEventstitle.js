import axios from "axios";
import {useQuery, useMutation, useQueryClient} from "react-query";

const addTitle = (titles) => {
    return axios.post(`http://localhost:4000/event`, titles);
}

const fetchTitles = () => {
  return axios.get(`http://localhost:4000/event`);
}

export const useTitles = (onSuccess, onError) => {
  return useQuery('titles', fetchTitles, {
    onSuccess,
    onError
  })
}

export const useEventstitle = () => {
    const queryClient = useQueryClient();
  return useMutation(addTitle, {
    onSuccess: () => {
        queryClient.invalidateQueries('titles')
    }
  })
}

