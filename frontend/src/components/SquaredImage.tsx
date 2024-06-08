const SquaredImage = ({ src, alt } :{
    src: string,
    alt: string
}) => {
    return (
        <div className="deck-image">
        <img 
        src={src} 
        alt={alt}
        />
        </div>
    )
    };

export default SquaredImage;