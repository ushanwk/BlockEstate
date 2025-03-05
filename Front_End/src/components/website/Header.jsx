import ThemeToggle from "../common/ThemeToggle.jsx";

export const Header = () => {
    return (
        <header>
            <h1 className="dark:text-white">This is a header</h1>
            <ThemeToggle />
        </header>
    )
}