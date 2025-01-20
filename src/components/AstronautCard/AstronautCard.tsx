import {Button, Card, CardBody, CardText, CardTitle, Col, Row} from "reactstrap";
import {Link, useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {T_Astronaut} from "modules/types.ts";
import {useEffect, useState} from "react";
import CustomInput from "components/CustomInput/CustomInput.tsx";
import {addAstronautToFlight, fetchAstronauts} from "store/slices/astronautsSlice.ts";
import {removeAstronautFromDraftFlight, updateAstronautValue} from "store/slices/flightsSlice.ts";
import {CustomDropdownBoolean} from "components/CustomDropdownBoolean/CustomDropdownBoolean.tsx";

type Props = {
    astronaut: T_Astronaut,
    showAddBtn?: boolean,
    showRemoveBtn?: boolean,
    editMM?: boolean,
}

const AstronautCard = ({astronaut,  showAddBtn=false, showRemoveBtn=false, editMM=false}:Props) => {

    const dispatch = useAppDispatch()

    const {is_superuser} = useAppSelector((state) => state.user)

    const {save_mm} = useAppSelector(state => state.flights)  // Флаг меняется после сохранения заявки (стейт)

    const [local_leader, setLocal_leader] = useState(astronaut.leader)  // Храним занчение м-м
    
    const location = useLocation()

    const isFlightPage = location.pathname.includes("flights")

    const handeAddToDraftFlight = async () => {
        await dispatch(addAstronautToFlight(astronaut.id))
        await dispatch(fetchAstronauts())
    }

    const handleRemoveFromDraftFlight = async () => {
        await dispatch(removeAstronautFromDraftFlight(astronaut.id))
    }

    useEffect(() => {
        save_mm && updateValue()  // Проверка стейта    
    }, [save_mm]);

    const updateValue = async () => {  // Обновляем значение
        dispatch(updateAstronautValue({
            astronaut_id: astronaut.id,
            leader: local_leader
        }))
    }

    if (isFlightPage) {
        return (
            <Card key={astronaut.id}>
                <Row>
                    <Col>
                        <img
                            alt=""
                            src={astronaut.image}
                            style={{"width": "100%"}}
                        />
                    </Col>
                    <Col md={8}>
                        <CardBody>
                            <CardTitle tag="h5">
                                {astronaut.name}
                            </CardTitle>
                            <CardText>
                                Время в космосе: {astronaut.space_time}сут.
                            </CardText>  
                            <CustomDropdownBoolean label={"Лидер"} selectedItem={local_leader} setSelectedItem={setLocal_leader} disabled={!editMM || is_superuser} />
                            <Col className="d-flex gap-5">
                                <Link to={`/astronauts/${astronaut.id}`}>
                                    <Button color="primary" type="button">
                                        Открыть
                                    </Button>
                                </Link>
                                {showRemoveBtn &&
                                    <Button color="danger" onClick={handleRemoveFromDraftFlight}>
                                        Удалить
                                    </Button>
                                }
                            </Col>
                        </CardBody>
                    </Col>
                </Row>
            </Card>
        );
    }

    return (
        <Card key={astronaut.id} style={{width: '18rem' }}>
            <img
                alt=""
                src={astronaut.image}
                style={{"height": "200px"}}
            />
            <CardBody>
                <CardTitle tag="h5">
                    {astronaut.name}
                </CardTitle>
                <CardText>
                    Время в космосе: {astronaut.space_time}сут.
                </CardText>
                <Col className="d-flex justify-content-between">
                    <Link to={`/astronauts/${astronaut.id}`}>
                        <Button color="primary" type="button">
                            Открыть
                        </Button>
                    </Link>
                    {showAddBtn &&
                        <Button color="secondary" onClick={handeAddToDraftFlight}>
                            Добавить
                        </Button>
                    }
                </Col>
            </CardBody>
        </Card>
    );
};

export default AstronautCard