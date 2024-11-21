import { RefreshCw } from "lucide-react"

export const LogoSwitch = () => {
    return (
        <div className="relative w-32 h-32 flex items-center justify-center">
            <div className="absolute inset-0 border-4 border-indigo-300 rounded-full" />
            <div className="absolute inset-2 border-4 border-indigo-300 rounded-full" />
            <div className="absolute inset-4 border-4 border-indigo-300 rounded-full" />
            <RefreshCw className="w-16 h-16 text-indigo-300" />
        </div>
    )
}
