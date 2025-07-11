import {FaStar} from "react-icons/fa"

export default function StarRating({ rating, size = "md", showValue = true }) {
    const sizeClass = {
        sm: "h-3 w-3",
        md: "h-4 w-4",
        lg: "h-5 w-5",
    }

    return (
        <div className="flex items-center ">
            <FaStar className={`${sizeClass[size]} text-secondary fill-secondary`} />
            {showValue && <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>}
        </div>
    )
}
