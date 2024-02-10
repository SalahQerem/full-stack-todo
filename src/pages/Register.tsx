import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import InputErrorMessage from "../components/error/InputErrorMessage";
import { REGISTER_FORM } from "../data";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../validation";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";
import { useState } from "react";
import { AxiosError } from "axios";
import { IErrorResponse } from "../interfaces";
import { Link, useNavigate } from "react-router-dom";

interface IFormInput {
  username: string;
  email: string;
  password: string;
}

const Register = () => {
  const [isloading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      setLoading(true);
      const { status } = await axiosInstance.post("/auth/local/register", data);
      if (status == 200) {
        toast.success("You will navigate to login page after 2 seconds!", {
          position: "top-left",
          duration: 1500,
          style: {
            backgroundColor: "black",
            color: "white",
            width: "fit-content",
          },
        });

        setTimeout(() => {
            navigate('/login');
        }, 2000);
      }
    } catch (err) {
      const errorObj = err as AxiosError<IErrorResponse>;
      toast.error(`${errorObj.response?.data.error.message}`, {
        position: "top-left",
        duration: 1500,
      });
    } finally {
      setLoading(false);
    }
  };

  const renderRegisterForm = REGISTER_FORM.map(
    ({ type, name, placeholder, validation }, index) => (
      <div className="input-group" key={index}>
        <Input
          type={type}
          placeholder={placeholder}
          {...register(name, validation)}
        />
        {errors[name] && <InputErrorMessage msg={errors[name]?.message} />}
      </div>
    )
  );
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-center font-semibold mb-4 text-3xl">
        Register to get access!
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {renderRegisterForm}
        <Button isLoading={isloading} fullWidth>
          Register
        </Button>
        <div className="flex items-center justify-center space-x-2">
            <p className="font-semibold text-gray-500">Have an account ?</p>
            <Link to='/login' className="font-semibold text-indigo-600 underline">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
