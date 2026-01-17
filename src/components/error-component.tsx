import { motion } from "framer-motion";

const AppErrorComponent = ({
    title = "Error",
    message = "Something went wrong. Please try again.",
}) => {
    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-xl sm:p-8"
            >
                <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                    className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100"
                >
                    <span className="text-3xl text-red-600">⚠</span>
                </motion.div>

                <h2 className="mb-2 text-xl font-semibold sm:text-2xl">
                    {title}
                </h2>

                <p className="mb-6 text-sm text-gray-600 sm:text-base">
                    {message}
                </p>
            </motion.div>
        </div>
    );
};

export default AppErrorComponent;