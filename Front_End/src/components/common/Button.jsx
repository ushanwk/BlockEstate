export const Button = ({ children, hoverColor, border, onClick, large }) => {
    return (
        <button
            onClick={onClick}
            className={`font-medium w-full px-4 py-2 text-white text-[12px] rounded-[5px] transition duration-300 ease-out bg-[var(--color-primary)] ${
                border ? "border-1 border-white" : ""
            }
            ${
                large ? "text-[14px] px-5 py-3" : ""
            }
            `}
            onMouseEnter={(e) => (e.target.style.backgroundColor = hoverColor || "#0060D0")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "var(--color-primary)")}
        >
            {children}
        </button>
    );
};