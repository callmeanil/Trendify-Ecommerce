const RatingStars = ({ rating, count }) => {
    const stars = Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1
        if (starValue <= Math.floor(rating)) {
            return <i key={index} className="bi bi-star-fill text-warning"></i>
        }
        else if (starValue - 0.5 <= rating) {
            return <i key={index} className="bi bi-star-half text-warning"></i>
        }
        else {
            return <i key={index} className="bi bi-star text-warning"></i>
        }
    })
    return (
        <div className="d-flex align-items-center">
            <div className="me-2">{stars}</div>
            <span className="text-muted">({count} reviews)</span>
        </div>
    )
}

export default RatingStars
