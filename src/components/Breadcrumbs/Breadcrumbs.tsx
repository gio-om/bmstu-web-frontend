import * as React from 'react';
import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import {Link, useLocation} from "react-router-dom";
import {useAppSelector} from "store/store.ts";

const Breadcrumbs = () => {

    const location = useLocation()

    const astronaut = useAppSelector((state) => state.astronauts.astronaut)

    const flight = useAppSelector((state) => state.flights.flight)

    const crumbs = () => {

        if (location.pathname == '/') {
            return (
                <>
                    <BreadcrumbItem>
                        <Link to="/">
                            Главная
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem></BreadcrumbItem>
                </>
            )
        }

        if (location.pathname == '/astronauts/') {
            return (
                <>
                    <BreadcrumbItem>
                        <Link to="/astronauts/">
                            Астронавты
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem></BreadcrumbItem>
                </>
            )
        }

        if (astronaut) {
            return (
                <>
                    <BreadcrumbItem>
                        <Link to="/astronauts/">
                            Астронавты
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                        <Link to={location.pathname}>
                            {astronaut?.name}
                        </Link>
                    </BreadcrumbItem>
                </>
            )
        }

        if (flight) {
            return (
                <>
                    <BreadcrumbItem active>
                        <Link to="/flights/">
                            Полеты
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                        <Link to={location.pathname}>
                            Полет №{flight?.id}
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem></BreadcrumbItem>
                </>
            )
        }

        if (location.pathname == '/flights/') {
            return (
                <>
                    <BreadcrumbItem active>
                        <Link to={location.pathname}>
                            Полеты
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem></BreadcrumbItem>
                </>
            )
        }

        if (location.pathname == '/login/') {
            return (
                <>
                    <BreadcrumbItem active>
                        <Link to={location.pathname}>
                            Вход
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem></BreadcrumbItem>
                </>
            )
        }

        if (location.pathname == '/register/') {
            return (
                <>
                    <BreadcrumbItem active>
                        <Link to={location.pathname}>
                            Регистрация
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem></BreadcrumbItem>
                </>
            )
        }

        if (location.pathname == '/profile/') {
            return (
                <>
                    <BreadcrumbItem>
                        <Link to="/profile/">
                            Личный кабинет
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem></BreadcrumbItem>
                </>
            )
        }
    };

    return (
        <Breadcrumb className="fs-5">
            {crumbs()}
        </Breadcrumb>
    );
};

export default Breadcrumbs