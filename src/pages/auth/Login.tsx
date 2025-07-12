import { useState } from 'react';
import { toast } from 'react-toastify';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import useStore from '../../context/store';
import { useLogin } from '../../hooks';
import { Btn } from '../../components/btn';
import { AxiosError } from 'axios';

// --- Types ---
interface LoginFormValues {
  username: string;
  password: string;
}

interface User {
  id: string;
  email: string;
  name: string;
  // boshqa kerakli maydonlar
}

export const SigninPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({ mode: 'onTouched' });

  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const login = useStore((state) => state.login);
  const { mutate: createLogin } = useLogin();

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    createLogin(data, {
      onSuccess: (userData: User) => {
        toast.success('Login successfully');
        login(userData);
        navigate('/');
      },
      onError: (error: unknown) => {
        console.error(error);
        toast.error('Login failed');
      },
    });
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Username</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="emilys"
                  {...register('username', { required: true })}
                  className="h-10"
                />
                {errors.username && (
                  <span className="text-red-600 text-xs">
                    This field is required
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1 relative">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type={visible ? 'text' : 'password'}
                  {...register('password', { required: true })}
                  className="h-10"
                />
                {errors.password && (
                  <span className="text-red-600 text-xs">
                    This field is required
                  </span>
                )}
                <button
                  type="button"
                  className="absolute right-3 top-[50%] translate-y-[-50%]"
                  onClick={() => setVisible(!visible)}
                >
                  {visible ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              <Btn disabled={!isValid} type="submit" className="w-full">
                Login
              </Btn>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SigninPage;
