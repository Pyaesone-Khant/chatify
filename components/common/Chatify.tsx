import { cn } from "@/services/cn"

export function Chatify({
    size = "lg",
}: {
    size?: "sm" | "md" | "lg" | "xl"
}) {
    return (
        <h2
            className={cn("text-5xl font-bold font-ubuntu uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-red-600", {
                "text-3xl": size === "sm",
                "text-4xl": size === "md",
                "text-5xl": size === "lg",
                "text-6xl": size === "xl",
            })}
        >
            Chatify
        </h2>
    )
}
