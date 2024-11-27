import { Logo } from "./Logo"
import RegistrationForm from "./Registration-form"

export const RegisterUserPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-950 to-purple-950">
            <div className="max-w-md w-full space-y-8 p-8 bg-gradient-to-br from-indigo-950 to-purple-950 rounded-xl shadow-md border border-purple-500">
                <Logo />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                    Create your account
                </h2>
                <RegistrationForm />
            </div>
        </div>
    )
}