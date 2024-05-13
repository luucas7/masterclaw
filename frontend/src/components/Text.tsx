

const Text = ({ content, className, onClick, style, italic, color, bold}: {
    content: string,
    className?: string,
    onClick?: () => void,
    style?: object,
    italic?: boolean,
    color?: string
    bold?: boolean
}) => {
    return (
        <p 
        className={className}
        onClick={onClick}
        style={{...style,  fontWeight: bold ? 'bold' : 'normal', fontStyle: italic ? 'italic' : 'normal', color: color, cursor: onClick ? 'pointer' : 'default'}}
        >
            {content}
        </p>
    )
}


export default Text;