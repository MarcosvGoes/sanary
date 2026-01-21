import { Button } from "@/shared/components/ui/button";
import { Loader2 } from "lucide-react";

type SocialLoginButton = {
    text: string;
    onClick?: () => void;
    provider?: "google" | "facebook" | "";
    icon: any;
    loading?: boolean;
    selected?: boolean;
};

export default function SocialButtonSignin({
    text,
    onClick,
    icon,
    loading = false,
    selected = false,
}: SocialLoginButton) {
    return (
        <Button
            type="button"
            variant="outline"
            onClick={onClick}
            className="flex bg-transparent cursor-pointer mb-0 py-5 mx-auto border-muted-foreground shadow-[0_3px_10px_rgb(0,0,0,0.2)] max-w-[250px] rounded-full w-full items-center gap-x-2"
            disabled={loading}
        >
            {selected ? <Loader2 className="w-4 h-4 animate-spin" /> : icon}
            <span>{text}</span>
        </Button>
    );
}
