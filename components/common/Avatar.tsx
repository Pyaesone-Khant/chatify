import { cn } from "@/services/cn";
import Image, { ImageProps } from "next/image";

interface AvatarProps extends ImageProps {
    src: string;
    alt: string;
    size?: number;
    className?: string;
}

export function Avatar({
    src = "/next.svg",
    alt = "Avatar",
    size = 48,
    className,
    ...props
}: AvatarProps) {
    return (
        <Image
            src={src}
            alt={alt}
            width={size}
            height={size}
            quality={100}
            className={cn("rounded-full border border-black/20 object-contain aspect-square", className)}
            {...props}
        />
    )
}
