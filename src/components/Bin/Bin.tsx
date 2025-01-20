import {Link} from "react-router-dom";
import {Badge, Button} from "reactstrap";

type Props = {
    isActive: boolean,
    draft_flight_id: string,
    astronauts_count: number
}

const Bin = ({isActive, draft_flight_id, astronauts_count}:Props) => {

    if (!isActive) { 
        return <Button color={"secondary"} className="bin-wrapper" disabled>Корзина</Button>
    }

    return ( // Редирект на страницу заявки если активная 
        <Link to={`/flights/${draft_flight_id}/`} className="bin-wrapper">   
            <Button color={"primary"} className="w-100 bin">
                Корзина
                <Badge>
                    {astronauts_count}
                </Badge>
            </Button>
        </Link>
    )
}

export default Bin