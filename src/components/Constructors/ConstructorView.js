import { useParams } from "react-router-dom"
import { getConstructorById } from "../../services/constructorService";
import { useEffect } from "react";

export const ConstructorView = ({ constructorObj }) => {
    const { constructorId } = useParams();

    

    return "This is the constructor view"
}