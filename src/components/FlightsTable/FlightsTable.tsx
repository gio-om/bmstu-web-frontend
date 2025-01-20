import {useNavigate} from "react-router-dom";
import {useMemo} from "react";
import {formatDate} from "src/utils/utils.ts";
import {T_Flight} from "modules/types.ts";
import CustomTable from "components/CustomTable/CustomTable.tsx";

// Определяем колонки - надстройка над CustomTable
const FlightsTable = ({flights}:{flights:T_Flight[]}) => {
    const navigate = useNavigate()

    const handleClick = (flight_id) => {
        navigate(`/flights/${flight_id}`)
    }

    const STATUSES = {
        1: "Введен",
        2: "В работе",
        3: "Завершен",
        4: "Отменён",
        5: "Удалён"
    }

    const columns = useMemo(
        () => [
            {
                Header: '№',
                accessor: 'id',
            },
            {
                Header: 'Статус',
                accessor: 'status',
                Cell: ({ value }) => STATUSES[value]
            },
            {
                Header: 'Дата вылета',
                accessor: 'date',
                Cell: ({ value }) => formatDate(value)
            },
            {
                Header: 'Дата создания',
                accessor: 'date_created',
                Cell: ({ value }) => formatDate(value)
            },
            {
                Header: 'Дата формирования',
                accessor: 'date_formation',
                Cell: ({ value }) => formatDate(value)
            },
            {
                Header: 'Дата завершения',
                accessor: 'date_complete',
                Cell: ({ value }) => formatDate(value)
            }
        ],
        []
    )

    return (
        <CustomTable columns={columns} data={flights} onClick={handleClick}/>
    )
};

export default FlightsTable