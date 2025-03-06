export const Button = ({ children, bgColor, hoverColor, border, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`w-full py-2 text-white text-[14px] rounded-[5px] transition duration-300 ease-out ${
                border ? "border-1 border-white" : ""
            }`}
            style={{
                backgroundColor: bgColor || "var(--color-primary)",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = hoverColor || "#0060D0")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = bgColor || "var(--color-primary)")}
        >
            {children}
        </button>
    );
};