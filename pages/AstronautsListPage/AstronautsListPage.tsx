import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import AstronautCard from "components/AstronautCard/AstronautCard.tsx";
import {ChangeEvent, FormEvent, useEffect} from "react";
import * as React from "react";
import {RootState, useAppSelector} from "src/store/store.ts";
import {updateAstronautName} from "src/store/slices/astronautsSlice.ts";
import {T_Astronaut} from "modules/types.ts";
import {AstronautMocks} from "modules/mocks.ts";
import {useDispatch} from "react-redux";
import "./styles.css"

type Props = {
    astronauts: T_Astronaut[],
    setAstronauts: React.Dispatch<React.SetStateAction<T_Astronaut[]>>
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
}

const AstronautsListPage = ({astronauts, setAstronauts, isMock, setIsMock}:Props) => {

    const dispatch = useDispatch()

    const {astronaut_name} = useAppSelector((state:RootState) => state.astronauts)

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        dispatch(updateAstronautName(e.target.value))
    }

    const createMocks = () => {
        setIsMock(true)
        setAstronauts(AstronautMocks.filter(astronaut => astronaut.name.toLowerCase().includes(astronaut_name.toLowerCase())))
    }

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault()
        await fetchAstronauts()
    }

    const fetchAstronauts = async () => {
        try {
            const env = await import.meta.env;
            const response = await fetch(`${env.VITE_API_URL}/api/astronauts/?astronaut_name=${astronaut_name.toLowerCase()}`)
            const data = await response.json()
            setAstronauts(data.astronauts)
            setIsMock(false)
        } catch {
            createMocks()
        }
    }

    useEffect(() => {
        fetchAstronauts()
    }, []);

    return (
        <Container>
            <Row className="mb-5">
                <Col md="6">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col xs="8">
                                <Input value={astronaut_name} onChange={handleChange} placeholder="Поиск..."></Input>
                            </Col>
                            <Col>
                                <Button color="primary" className="w-100 search-btn">Поиск</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            <Row>
                {astronauts?.map(astronaut => (
                    <Col key={astronaut.id} sm="12" md="6" lg="4">
                        <AstronautCard astronaut={astronaut} isMock={isMock} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default AstronautsListPage