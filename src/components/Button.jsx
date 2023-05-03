const Button = ({innerHTML , Click , className}) => {
    return (
        <button onClick={Click} className={className}>
            {innerHTML}
        </button>
    )
}

export default Button