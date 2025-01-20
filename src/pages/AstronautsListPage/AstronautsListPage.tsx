import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import {ChangeEvent, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {fetchAstronauts, updateAstronautName} from "store/slices/astronautsSlice.ts";
import AstronautCard from "components/AstronautCard/AstronautCard.tsx";
import Bin from "components/Bin/Bin.tsx";

const AstronautsListPage = () => {

    const dispatch = useAppDispatch()

    const {astronauts, astronaut_name} = useAppSelector((state) => state.astronauts)

    const {is_authenticated} = useAppSelector((state) => state.user)  // Стейт аутентифирцирован ли юзер, чтобы показать корззину

    const {draft_flight_id, astronauts_count} = useAppSelector((state) => state.flights)  

    const hasDraft = draft_flight_id != null  // Есть ли черновик

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        dispatch(updateAstronautName(e.target.value))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchAstronauts())
    }

    useEffect(() => {
        dispatch(fetchAstronauts())
    }, [])

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
                {is_authenticated &&  // Для аутентифицированного 
                    <Col className="d-flex flex-row justify-content-end" md="6">
                        <Bin isActive={hasDraft} draft_flight_id={draft_flight_id} astronauts_count={astronauts_count} />
                    </Col>
                }
            </Row>
            <Row className="mt-5 d-flex">
                {astronauts?.map(astronaut => (
                    <Col key={astronaut.id} className="mb-5 d-flex justify-content-center" sm="12" md="6" lg="4">
                        <AstronautCard astronaut={astronaut} showAddBtn={is_authenticated} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default AstronautsListPage