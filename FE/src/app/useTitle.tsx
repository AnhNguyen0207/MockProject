import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../features/titleSlice";

const useTitle = (ele?:  string, title?: string) => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setTitle({
        title: ele || '',
      })
    );
    document.title = title || "Sapo Web";
  }, [dispatch, ele, title]);
};

export default useTitle;
