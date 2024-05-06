import React, {useState} from "react";
import {useNavigate, Link} from "react-router-dom";

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<null|string>(null);

  const navigate = useNavigate();

  async function sendLogin() {

    setError(null);

    const response = await fetch('/api/user/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        'email': email,
        'password': password
      }),
    }).catch(err => console.log(err));

    if (!response!.ok) {
       setError("Incorrect email or password");
       return;
    }


    navigate(0);
  }

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sendLogin();
  }


  return (
    <>
      <section className="py-24">
        <form className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0" noValidate onSubmit={onFormSubmit}>

          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <div className="space-y-4 md:space-y-6">
                <span className="mt-2 text-sm text-red-500">
                  {error}
                </span>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email" name="email" id="email" value={email} autoFocus
                         onChange={(event) => {setEmail(event.target.value)}} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="password" name="password" id="password" value={password}
                         onChange={(event) => {setPassword(event.target.value)}} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                </div>
                <div className="text-right">
                  <a href="/forgot" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                </div>
                <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300
                font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={sendLogin}>Sign in</button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?
                  <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500 mx-1">Sign up</Link>
                </p>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
}
