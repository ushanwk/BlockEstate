import ThemeToggle from "./ThemeToggle.jsx";

export const Header = () => {
    return (
        <header class="bg-white dark:bg-black">
            <h1 className="dark:text-white">This is a header</h1>
            <ThemeToggle />
        </header>
    )
}