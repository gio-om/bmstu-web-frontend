import {Route, Routes} from "react-router-dom";
import {Container, Row} from "reactstrap";
import "./styles.css"
import HomePage from "pages/HomePage/HomePage.tsx";
import LoginPage from "pages/LoginPage/LoginPage.tsx";
import RegisterPage from "pages/RegisterPage/RegisterPage.tsx";
import AstronautsListPage from "pages/AstronautsListPage/AstronautsListPage.tsx";
import AstronautPage from "pages/AstronautPage/AstronautPage.tsx";
import FlightsPage from "pages/FlightsPage/FlightsPage.tsx";
import FlightPage from "pages/FlightPage/FlightPage.tsx";
import ProfilePage from "pages/ProfilePage/ProfilePage.tsx";
import Header from "components/Header/Header.tsx";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs.tsx";

function App() {
    return (
        <div>
            <Header />
            <Container className="pt-4">
                <Row className="mb-3">
                    <Breadcrumbs />
                </Row>
                <Row>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login/" element={<LoginPage />} />
                        <Route path="/register/" element={<RegisterPage />} />
                        <Route path="/astronauts/" element={<AstronautsListPage />} />
                        <Route path="/astronauts/:id/" element={<AstronautPage />} />
                        <Route path="/flights/" element={<FlightsPage />} />
                        <Route path="/flights/:id/" element={<FlightPage />} />
                        <Route path="/profile/" element={<ProfilePage />} />
                    </Routes>
                </Row>
            </Container>
        </div>
    )
}

export default App
