import { useEffect } from "react"

const useTitle = title => {
    useEffect(() => {
        document.title = `${title} - Bloom Store`;
    }, [title])
};

export default useTitle;