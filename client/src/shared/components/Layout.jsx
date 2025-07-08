import { Outlet, Link } from "react-router-dom";
import Footer from "./Footer";

const Layout = () => {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/docs">Documentos</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contatos</Link>
                    </li>
                </ul>
            </nav>

            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Layout;
