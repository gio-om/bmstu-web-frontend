import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {Col, Container, Row} from "reactstrap";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {fetchAstronaut, removeSelectedAstronaut} from "store/slices/astronautsSlice.ts";

const AstronautPage = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()

    const {astronaut} = useAppSelector((state) => state.astronauts)

    useEffect(() => {
        dispatch(fetchAstronaut(id))
        return () => dispatch(removeSelectedAstronaut())
    }, []);

    if (!astronaut) {
        return (
            <div>

            </div>
        )
    }

    return (
        <Container>
            <Row>
                <Col md="6">
                    <img
                        alt=""
                        src={astronaut.image}
                        className="w-100"
                    />
                </Col>
                <Col md="6">
                    <h1 className="mb-3">{astronaut.name}</h1>
                    <p className="fs-5">Биография: {astronaut.description}</p>
                    <p className="fs-5">Время в космосе: {astronaut.space_time}сут.</p>
                </Col>
            </Row>
        </Container>
    );
};

export default AstronautPage