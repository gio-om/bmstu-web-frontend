import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {
    deleteDraftFlight,
    fetchFlight,
    removeFlight, sendDraftFlight,
    triggerUpdateMM,
    updateFlight
} from "store/slices/flightsSlice.ts";
import {Button, Col, Form, Row} from "reactstrap";
import {E_FlightStatus, T_Astronaut} from "modules/types.ts";
import AstronautCard from "components/AstronautCard/AstronautCard.tsx";
import CustomInput from "components/CustomInput/CustomInput.tsx";
import CustomTextarea from "components/CustomTextarea/CustomTextarea.tsx";

const FlightPage = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const {is_authenticated} = useAppSelector((state) => state.user)

    const flight = useAppSelector((state) => state.flights.flight)

    const [name, setName] = useState<string>(flight?.name)

    const [description, setDescription] = useState<string>(flight?.description)

    const [date, setDate] = useState<string>(flight?.date)

    useEffect(() => {
        if (!is_authenticated) {
            navigate("/")
        }
    }, [is_authenticated]);

    useEffect(() => {
        is_authenticated && dispatch(fetchFlight(id))
        return () => dispatch(removeFlight())
    }, []);

    useEffect(() => {
        setName(flight?.name)
        setDescription(flight?.description)
        setDate(flight?.date)
    }, [flight]);

    const sendFlight = async (e) => {
        e.preventDefault()

        await saveFlight()

        await dispatch(sendDraftFlight())

        navigate("/flights/")
    }

    const saveFlight = async (e?) => {
        e?.preventDefault()

        const data = {
            name,
            description
        }

        await dispatch(updateFlight(data))
        await dispatch(triggerUpdateMM())  // вызываем обновление м-м в заявке
        await dispatch(triggerUpdateMM())
    }

    const deleteFlight = async () => {
        await dispatch(deleteDraftFlight())
        navigate("/astronauts/")
    }

    if (!flight) {
        return (
            <div>

            </div>
        )
    }

    const isDraft = flight.status == E_FlightStatus.Draft
    const isCompleted = flight.status == E_FlightStatus.Completed

    return (
        <Form onSubmit={sendFlight} className="pb-5">
            <h2 className="mb-5">{isDraft ? "Черновой полет" : `Полет №${id}` }</h2>
            <Row className="mb-5 fs-5 w-25">
                <CustomInput label="Название" placeholder="Введите название" value={name} setValue={setName} disabled={!isDraft}/>
                <CustomTextarea label="Описание" placeholder="Введите описание" value={description} setValue={setDescription} disabled={!isDraft}/>
                {isCompleted && <CustomInput label="Дата вылета" value={date} disabled={true}/>}  
            </Row>
            <Row>
                {flight.astronauts.length > 0 ? flight.astronauts.map((astronaut:T_Astronaut) => (
                    <Row key={astronaut.id} className="d-flex justify-content-center mb-5">
                        <AstronautCard astronaut={astronaut} showRemoveBtn={isDraft} editMM={isDraft} />
                    </Row>
                )) :
                    <h3 className="text-center">Астронавты не добавлены</h3>
                }
            </Row>
            {isDraft &&
                <Row className="mt-5">
                    <Col className="d-flex gap-5 justify-content-center">
                        <Button color="success" className="fs-4" onClick={saveFlight}>Сохранить</Button>
                        <Button color="primary" className="fs-4" type="submit">Отправить</Button>
                        <Button color="danger" className="fs-4" onClick={deleteFlight}>Удалить</Button>
                    </Col>
                </Row>
            }
        </Form>
    );
};

export default FlightPage