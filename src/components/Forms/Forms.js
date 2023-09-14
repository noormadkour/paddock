import { useParams } from "react-router-dom"

export const CommentForm = () => {
    const { driverId } = useParams()
    return `This is the comment form found under each driver`
}

export const LongEditForm = () => {
    //get comment by ID
    return `This is the stand alone form for editing posted comments`
}