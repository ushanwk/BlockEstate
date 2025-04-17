export const FullScreenLoader = () => {
    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 dark:bg-black/30 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-[var(--color-dark-bg-secondary)] shadow-lg dark:shadow-md rounded-xl px-6 py-8 flex flex-col items-center gap-4 w-[260px]">
                {/* Spinner */}
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 dark:border-blue-400"></div>

                {/* Message */}
                <p className="text-center text-sm text-black dark:text-white font-medium">
                    Please wait while we process your request...
                </p>
            </div>
        </div>

    )
}