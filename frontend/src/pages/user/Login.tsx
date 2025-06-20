import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { loginUser, setStatus } from "../../store/userSlice"
import { Status } from "../../globals/types/types"

const Login = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {status , user} = useAppSelector((state) => state.user)

    const [data , setData] = useState({
        email : '',
        password : ""
    })

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        const {name , value} = e.target;
        setData({
            ...data,
            [name] : value
        })
    }

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(loginUser(data))
    }

    useEffect(() => {
        if(status == Status.Success) {
            navigate("/")
            dispatch(setStatus(Status.Loading))
        }
    },[status,navigate,dispatch])
  return (
    <>
          <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
  <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
    <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
      <div className="mt-12 flex flex-col items-center">
        <div className="w-full flex-1 mt-8">
          <div className="my-12 border-b text-center">
            <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
              Log In with e-mail <h1 className="text-2xl">{user?.username}</h1>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mx-auto max-w-xs">
              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
              />
              <input
                className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
              />
              <button
                className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
              >
                <svg
                  className="w-6 h-6 -ml-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="8.5" cy="7" r="4" />
                  <path d="M20 8v6M23 11h-6" />
                </svg>
                <span className="ml-3">Log In</span>
              </button>
            </div>
          </form>
          <div className="mt-4 text-gray-600 text-center">
            <span className="text-sm">Don't have an account? </span>
            <Link to="/register" className="text-indigo-500 hover:text-indigo-700 font-semibold">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
    <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
      <div
        className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
        }}
      ></div>
    </div>
  </div>
</div>
    </>
  )
}

export default Login