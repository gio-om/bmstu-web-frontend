import Header from "components/Header/Header.tsx";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs.tsx";
import AstronautPage from "pages/AstronautPage/AstronautPage.tsx";
import AstronautsListPage from "pages/AstronautsListPage/AstronautsListPage.tsx";
import {Route, Routes} from "react-router-dom";
import {Container, Row} from "reactstrap";
import HomePage from "pages/HomePage/HomePage.tsx";
import {useState} from "react";
import {T_Astronaut} from "modules/types.ts";

function App() {

    const [astronauts, setAstronauts] = useState<T_Astronaut[]>([])

    const [selectedAstronaut, setSelectedAstronaut] = useState<T_Astronaut | null>(null)

    const [isMock, setIsMock] = useState(false);

    return (
        <>
            <Header/>
            <Container className="pt-4">
                <Row className="mb-3">
                    <Breadcrumbs selectedAstronaut={selectedAstronaut}/>
                </Row>
                <Row>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/astronauts/" element={<AstronautsListPage astronauts={astronauts} setAstronauts={setAstronauts} isMock={isMock} setIsMock={setIsMock} />} />
                        <Route path="/astronauts/:id" element={<AstronautPage selectedAstronaut={selectedAstronaut} setSelectedAstronaut={setSelectedAstronaut} isMock={isMock} setIsMock={setIsMock} />} />
                    </Routes>
                </Row>
            </Container>
        </>
    )
}

export default App
