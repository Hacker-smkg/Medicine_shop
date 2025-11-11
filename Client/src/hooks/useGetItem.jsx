import { useState } from "react";

const useGetItem = () => {
    const [render, setRender] = useState(); // Fixed typo "rander" -> "render"
    
    return { render, setRender }; // Ensure return statement is correct
};

export default useGetItem;
