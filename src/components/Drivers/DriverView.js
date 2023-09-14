import { useEffect, useState } from "react";
import { getDriverById } from "../../services/driverService";
import { useParams } from "react-router-dom";

export const DriverView = () => {
    const [driver, setDriver] = useState({})
    const { driverId } = useParams()

    useEffect(() => {
        getDriverById(driverId).then(driverObj => {
            setDriver(driverObj)
        })
    }, [driverId])

    return `You clicked on ${driver.driverId}`
}