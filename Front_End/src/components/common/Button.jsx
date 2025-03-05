export const Button = ({ children, bgColor = "#0274F9", hoverColor = "#0060D0", border, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 text-white text-[14px] rounded-[5px] transition duration-300 ease-out ${
                border ? "border-2 border-white" : ""
            }`}
            style={{
                backgroundColor: bgColor,
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = hoverColor)}
            onMouseLeave={(e) => (e.target.style.backgroundColor = bgColor)}
        >
            {children}
        </button>
    );
};