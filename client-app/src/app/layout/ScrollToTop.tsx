import { useEffect } from "react"
import { withRouter } from "react-router-dom";

const ScrollToTop = ({ childern, location: { pathname } }: any) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return childern;
}

export default withRouter(ScrollToTop);