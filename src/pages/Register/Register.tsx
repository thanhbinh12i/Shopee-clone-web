import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { registerAccount } from "src/apis/auth.api"
import Input from "src/components/Input"
import { schema, Schema } from "src/utils/rules"
import omit from 'lodash/omit'
import { isAxiosUnprocessableEntityError } from "src/utils/utils"
import { ErrorResponse } from "src/types/utils.type"
import Button from "src/components/Button"
import { useContext } from "react"
import { AppContext } from "src/contexts/app.context"

type FormData = Pick<Schema, 'email' | 'password' | 'confirm_password'>
const registerSchema = schema.pick(['email', 'password', 'confirm_password'])

export default function Register() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    // watch,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  })
  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, "confirm_password">) => registerAccount(body)
  })
  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ["confirm_password"]);
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate("/")
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<FormData, 'confirm_password'>, {
                message: formError[key as keyof Omit<FormData, 'confirm_password'>],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })
  // const values = watch();
  return (
    <>
      <div className='bg-orange'>
        <div className='container'>
          <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
            <div className='lg:col-span-2 lg:col-start-4'>
              <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
                <div className='text-2xl'>Đăng ký</div>
                <Input
                  name='email'
                  register={register}
                  type='email'
                  className='mt-8'
                  errorMessage={errors.email?.message}
                  placeholder='Email'
                />
                <Input
                  name='password'
                  register={register}
                  type='password'
                  className='mt-2'
                  errorMessage={errors.password?.message}
                  classNameEye='absolute right-[5px] h-5 w-5 cursor-pointer top-[12px]'
                  placeholder='Password'
                  autoComplete='on'
                />
                <Input
                  name='confirm_password'
                  register={register}
                  type='password'
                  className='mt-2'
                  errorMessage={errors.confirm_password?.message}
                  classNameEye='absolute right-[5px] h-5 w-5 cursor-pointer top-[12px]'
                  placeholder='Confirm Password'
                  autoComplete='on'
                />
                <div className='mt-2'>
                  <Button className='w-full bg-red-500 px-2 py-4 text-center text-sm uppercase text-white hover:bg-red-600'
                  // isLoading={registerAccountMutation.isLoading}
                  // disabled={registerAccountMutation.isLoading}
                  >
                    Đăng ký
                  </Button>
                </div>
                <div className='mt-8 flex items-center justify-center'>
                  <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                  <Link className='ml-1 text-red-400' to='/login'>
                    Đăng nhập
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}