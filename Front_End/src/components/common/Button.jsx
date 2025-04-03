export const Button = ({
                           children,
                           hoverColor,       // Custom hover color (optional)
                           border,           // Boolean for white border
                           large,            // Boolean for large size
                           onclick,          // Click handler
                           red,              // Boolean for red outline style
                           bgColor,          // Custom background color (optional)
                           textColor = "white" // Default text color
                       }) => {
    // Default colors
    const defaultBg = "var(--color-primary)";
    const defaultHover = "#0060D0";

    return (
        <button
            onClick={onclick}
            className={`font-medium w-full px-4 py-2 text-[12px] rounded-[5px] transition duration-300 ease-out ${
                border ? "border-1 border-white" : ""
            } ${
                large ? "text-[14px] px-5 py-3" : ""
            }`}
            style={{
                backgroundColor: red ? 'transparent' : (bgColor || defaultBg),
                color: red ? 'rgb(239 68 68)' : textColor,
                border: red ? '1px solid rgb(239 68 68)' : 'none'
            }}
            onMouseEnter={(e) => {
                if (!red) {
                    e.target.style.backgroundColor = hoverColor || (bgColor ? darkenColor(bgColor) : defaultHover);
                } else {
                    e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                }
            }}
            onMouseLeave={(e) => {
                if (!red) {
                    e.target.style.backgroundColor = bgColor || defaultBg;
                } else {
                    e.target.style.backgroundColor = 'transparent';
                }
            }}
        >
            {children}
        </button>
    );
};

// Helper function to darken colors for hover effect
function darkenColor(color, amount = 0.2) {

    if (color.startsWith('#')) {

        return color;
    }
    if (color.startsWith('rgb')) {
        // RGB color darkening
        return color.replace(/\d+/g, match => Math.max(0, parseInt(match) * (1 - amount)));
    }
    return color;
}