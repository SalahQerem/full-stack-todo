import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { IErrorResponse } from "../interfaces";
import InputErrorMessage from "../components/error/InputErrorMessage";
import { LOGIN_FORM } from "../data";
import { loginSchema } from "../validation";
import { Link } from "react-router-dom";

interface IFormInput {
  identifier: string;
  password: string;
}

const login = () => {
  const [isloading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      setLoading(true);
      const { status, data: resData } = await axiosInstance.post(
        "/auth/local",
        data
      );
      if (status == 200) {
        toast.success("You will navigate to Home page after 2 seconds!", {
          position: "top-left",
          duration: 1500,
          style: {
            backgroundColor: "black",
            color: "white",
            width: "fit-content",
          },
        });

        localStorage.setItem("userData", JSON.stringify(resData));

        setTimeout(() => {
          location.replace("/");
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

  const renderLoginForm = LOGIN_FORM.map(
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
      <h2 className="text-center font-semibold text-3xl mb-4">
        Login to get access!
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {renderLoginForm}

        <Button fullWidth isLoading={isloading}>
          Login
        </Button>
        <div className="flex items-center justify-center space-x-2">
          <p className="font-semibold text-gray-500">Register new account ?</p>
          <Link
            to="/register"
            className="font-semibold text-indigo-600 underline"
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default login;
