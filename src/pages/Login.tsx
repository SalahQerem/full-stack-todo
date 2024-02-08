import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

interface IProps{
    
}

const login = ({}: IProps) => {
    
    return (
        <div className="max-w-md mx-auto">
            <h2 className="text-center font-semibold text-3xl mb-4">Login to get access!</h2>
            <form className="space-y-4">
                <Input placeholder="Email addrress"/>
                <Input placeholder="Password"/>

                <Button fullWidth>Login</Button>
            </form>
        </div>
    )
}

export default login;