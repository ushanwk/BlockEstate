export const Button = ({
                           children,
                           hoverColor,       // Custom hover color (optional)
                           border,           // Boolean for white border
                           large,            // Boolean for large size
                           onclick,          // Click handler
                           red,              // Boolean for red outline style
                           green,            // Boolean for green outline style
                           bgColor,          // Custom background color (optional)
                           textColor = "white" // Default text color
                       }) => {
    // Default colors
    const defaultBg = "var(--color-primary)";
    const defaultHover = "#0060D0";
    const redColor = 'rgb(239 68 68)';
    const greenColor = 'rgb(34 197 94)';

    // Determine button style based on props
    const getButtonStyle = () => {
        if (red) {
            return {
                backgroundColor: 'transparent',
                color: redColor,
                border: `1px solid ${redColor}`
            };
        }
        if (green) {
            return {
                backgroundColor: 'transparent',
                color: greenColor,
                border: `1px solid ${greenColor}`
            };
        }
        return {
            backgroundColor: bgColor || defaultBg,
            color: textColor,
            border: border ? "1px solid white" : 'none'
        };
    };

    // Handle hover effects
    const handleMouseEnter = (e) => {
        if (red) {
            e.target.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
        } else if (green) {
            e.target.style.backgroundColor = 'rgba(34, 197, 94, 0.1)';
        } else {
            e.target.style.backgroundColor = hoverColor || (bgColor ? darkenColor(bgColor) : defaultHover);
        }
    };

    // Handle mouse leave effects
    const handleMouseLeave = (e) => {
        if (red || green) {
            e.target.style.backgroundColor = 'transparent';
        } else {
            e.target.style.backgroundColor = bgColor || defaultBg;
        }
    };

    return (
        <button
            onClick={onclick}
            className={`font-medium w-full px-4 py-2 text-[12px] rounded-[5px] transition duration-300 ease-out ${
                border ? "border-1 border-white" : ""
            } ${
                large ? "text-[14px] px-5 py-3" : ""
            }`}
            style={getButtonStyle()}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </button>
    );
};

// Helper function to darken colors for hover effect
function darkenColor(color, amount = 0.2) {
    if (color.startsWith('#')) {
        return color; // Simplified for example - implement proper hex darkening if needed
    }
    if (color.startsWith('rgb')) {
        // RGB color darkening
        return color.replace(/\d+/g, match => Math.max(0, parseInt(match) * (1 - amount)));
    }
    return color;
}