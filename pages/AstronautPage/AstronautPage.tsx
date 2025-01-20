import * as React from 'react';
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {CardImg, Col, Container, Row} from "reactstrap";
import mockImage from "assets/mock.png";
import {T_Astronaut} from "modules/types.ts";
import {AstronautMocks} from "modules/mocks.ts";

type Props = {
    selectedAstronaut: T_Astronaut | null,
    setSelectedAstronaut: React.Dispatch<React.SetStateAction<T_Astronaut | null>>,
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
}

const AstronautPage = ({selectedAstronaut, setSelectedAstronaut, isMock, setIsMock}: Props) => {
    const { id } = useParams<{id: string}>();

    const fetchData = async () => {
        try {
            const env = await import.meta.env;
            const response = await fetch(`${env.VITE_API_URL}/api/astronauts/${id}`)
            const data = await response.json()
            setSelectedAstronaut(data)
        } catch {
            createMock()
        }
    }

    const createMock = () => {
        setIsMock(true)
        setSelectedAstronaut(AstronautMocks.find(astronaut => astronaut?.id == parseInt(id as string)) as T_Astronaut)
    }

    useEffect(() => {
        if (!isMock) {
            fetchData()
        } else {
            createMock()
        }

        return () => setSelectedAstronaut(null)
    }, []);

    if (!selectedAstronaut) {
        return (
            <div>

            </div>
        )
    }

    return (
        <Container>
            <Row>
                <Col md="6">
                    <CardImg src={isMock ? mockImage as string : selectedAstronaut.image} className="mb-3" />
                </Col>
                <Col md="6">
                    <h1 className="mb-3">{selectedAstronaut.name}</h1>
                    <p className="fs-5">Биография: {selectedAstronaut.description}</p>
                    <p className="fs-5">Время в космосе: {selectedAstronaut.space_time}сут.</p>
                    <p className="fs-5">Страна: {selectedAstronaut.country}</p>
                    <p className="fs-5">Специальность: {selectedAstronaut.specialization}</p>
                </Col>
            </Row>
        </Container>
    );
};

export default AstronautPage