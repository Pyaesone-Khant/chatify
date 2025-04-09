import { cn } from "@/services/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: "primary" | "secondary" | "ghost" | "danger";
    className?: string;
}

export function Button({
    children,
    variant = "primary",
    className,
    ...props
}: ButtonProps) {
    return (
        <button
            className={cn(`rounded-md px-4 py-2 font-medium transition-colors duration-200 text-base`, className, {
                "cursor-not-allowed opacity-50": props.disabled,
                "cursor-pointer": !props.disabled,
                "bg-gradient-to-br from-red-400 to-purple-600 text-white hover:bg-blue-700": variant === "primary",
                "bg-gray-200 text-gray-800 hover:bg-gray-300": variant === "secondary",
                "bg-transparent text-blue-600 hover:bg-blue-50": variant === "ghost",
                "bg-red-600 text-white hover:bg-red-700": variant === "danger",
            })}
            {...props}
        >
            {children}
        </button>
    )
}
