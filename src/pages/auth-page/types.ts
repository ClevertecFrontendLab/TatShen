export interface IForm{
    email: string;
    password: string;
    repeatPassword?: string;
    isEmailValid:boolean;
    isPasswordValid: boolean;
    isRepeatPasswordValid?: boolean
  }

export  const initialFormState: IForm ={
    email:'',
    password:'',
    repeatPassword:'',
    isEmailValid:false,
    isPasswordValid:false,
    isRepeatPasswordValid:false
  }

  export interface IChangePasswordForm{
    password: string;
    repeatPassword: string;
    isPasswordValid: boolean;
    isRepeatPasswordValid: boolean
  }


  export  const initialChangePasswordFormState: IChangePasswordForm ={
    password:'',
    repeatPassword:'',
    isPasswordValid:false,
    isRepeatPasswordValid:false
  }