export interface IRegisterInput {
  name: "email" | "password" | "username";
  placeholder: string;
  type: string;
  validation: {
    required: boolean;
    minLength?: number;
    pattern?: RegExp;
  };
}

export interface IErrorResponse {
  error: {
    // details?: {
    //   errors: {
    //     message: string;
    //   }[];
    // };
    message?: string;
  };
}
