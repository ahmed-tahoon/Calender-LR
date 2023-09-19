import { useEffect, useState } from "react";
import AuthenticationLogo from "components/icons/AuthenticationLogo"
import AuthenticationLayout from "layouts/AuthenticationLayout"
import { Link, useSearchParams } from "react-router-dom"
import axios from 'axios';
import ErrorAlert from "components/common/ErrorAlert";
import PasswordStrengthBar from "react-password-strength-bar";
import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

// Axios
axios.defaults.withCredentials = true

export default function Register() {
    let [searchParams, setSearchParams] = useSearchParams();
    const [errorMessage, setErrorMessage] = useState(null);
    const [validationErrors, setValidationErrors] = useState({});
    const [name, setName] = useState(searchParams.get('name') ? searchParams.get('name') : null);
    const [email, setEmail] = useState(searchParams.get('email') ? searchParams.get('email') : null);
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [isAgree, setIsAgree] = useState(false);
    const [isSignedUp, setIsSignedUp] = useState(false);
    const [signUpButtonText, setsignUpButtonText] = useState('Sign up');
    const [signUpButtonDisabled, setsignUpButtonDisabled] = useState(false);

    // Set page title
    useEffect(() => {
        document.title = 'Register';
    }, []);

    function register() {
        axios.defaults.baseURL = import.meta.env.VITE_API_ENDPOINT;

        setsignUpButtonText('Signing up...');
        setsignUpButtonDisabled(true);

        // Get user detail
        axios.post('/api/register', {
            name: name,
            email: email,
            password: password,
        })
          .then(function (response) {
            // handle success
            //console.log(response.data);
            if(response.data.status === 'error') {
              setErrorMessage(response.data.message);
              setsignUpButtonText('Sign up');
              setsignUpButtonDisabled(false);

            }

            if(response.data.status === 'success') {
                localStorage.setItem("login_token", response.data.token);
                setsignUpButtonDisabled('Sign up success, please wait..');
                window.location.href = '/verify-email';
                setIsSignedUp(true)
            }
          })
          .catch(function (error) {
            // handle error
            //setIsLoaded(true);
            setsignUpButtonText('Sign up');
            setsignUpButtonDisabled(false);
            if(error.response.data.errors) {
                setValidationErrors(error.response.data.errors);
            }
          })
          .then(function () {
            //setIsLoaded(true);
          });
      }

    return (
        <AuthenticationLayout>
            <div>
                <AuthenticationLogo />
                <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Sign up for free</h2>
                <p className="mt-2 text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-grandkit-600 hover:text-grandkit-500">
                        Sign in
                    </Link>
                </p>
            </div>

            <div className="mt-8">
                {/* <div>
                    <div>
                        <p className="text-sm font-medium text-gray-700">Sign in with</p>

                        <div className="mt-1 grid grid-cols-3 gap-3">
                            <div>
                                <a href="#"
                                    className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50">
                                    <span className="sr-only">Sign in with Facebook</span>
                                    <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd"
                                            d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                                            clipRule="evenodd" />
                                    </svg>
                                </a>
                            </div>

                            <div>
                                <a href="#"
                                    className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50">
                                    <span className="sr-only">Sign in with Twitter</span>
                                    <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                                    </svg>
                                </a>
                            </div>

                            <div>
                                <a href="#"
                                    className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50">
                                    <span className="sr-only">Sign in with GitHub</span>
                                    <svg className="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd"
                                            d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                                            clipRule="evenodd" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="relative mt-6">
                        <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">Or continue with</span>
                        </div>
                    </div>
                </div> */}

                <form className="mt-8"
                        onSubmit={(e) => {
                            e.preventDefault();
                            login();
                        }}
                    >
                    <div className="space-y-6">
                        {errorMessage && <ErrorAlert title={errorMessage} />}

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Full Name <span className="text-red-800">*</span>
                            </label>
                            <div className="mt-1">
                                <input placeholder="Enter your name here" value={name || ''} onChange={(ev) => setName(ev.target.value)} name="name" type="text" autoComplete="name" required
                                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-grandkit-500 focus:outline-none focus:ring-grandkit-500 sm:text-sm" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address <span className="text-red-800">*</span>
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <input
                                    value={email || ''}
                                    placeholder="Enter email here"
                                    id="email"
                                    name="email"
                                    onChange={(ev) => setEmail(ev.target.value)}
                                    type="email"
                                    className={ (validationErrors.email) ? 'block w-full pr-10 border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-800 focus:border-red-800 sm:text-sm rounded-md' : 'shadow-sm focus:ring-grandkit-500 focus:border-grandkit-500 block w-full sm:text-sm border-gray-300 rounded-md'}
                                />
                                {validationErrors.email && <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <ExclamationCircleIcon className="h-5 w-5 text-red-800" aria-hidden="true" />
                                </div>}
                            </div>
                            {validationErrors.email && <p className="mt-2 text-sm text-red-800">{validationErrors.email}</p>}
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password <span className="text-red-800">*</span>
                            </label>
                            <div className="mt-1 mb-1">
                                <input placeholder="Enter password here" id="password" onChange={(ev) => setPassword(ev.target.value)} name="password" type="password" required
                                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-grandkit-500 focus:outline-none focus:ring-grandkit-500 sm:text-sm" />
                            </div>
                            <PasswordStrengthBar password={password} />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="repeat_password" className="block text-sm font-medium text-gray-700">
                                Repeat Password <span className="text-red-800">*</span>
                            </label>
                            <div className="mt-1">
                                <input placeholder="Repeat your password here" id="repeat_password" onChange={(ev) => setRepeatPassword(ev.target.value)} name="repeat_password" type="password" required
                                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-grandkit-500 focus:outline-none focus:ring-grandkit-500 sm:text-sm" />
                            </div>
                            {(repeatPassword && password !== repeatPassword) && <p className="mt-2 text-sm text-red-800">Passwords do not match</p>}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input id="remember-me" name="remember-me" type="checkbox"
                                    onChange={(ev) => setIsAgree(ev.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 text-grandkit-600 focus:ring-grandkit-500" />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    I agree to the <a rel="nofollow" target="_blank" href="#" className="font-medium text-grandkit-600 hover:text-grandkit-500">term and conditions</a>
                                </label>
                            </div>
                        </div>

                        <div>
                            <button onClick={register} type="submit" disabled={signUpButtonDisabled || !isAgree || !name || !password || !email || password !== repeatPassword}
                                className="flex w-full justify-center rounded-md border border-transparent bg-grandkit-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-grandkit-700 focus:outline-none focus:ring-2 focus:ring-grandkit-500 focus:ring-offset-2 disabled:bg-gray-600 disabled:opacity-70">
                                {signUpButtonText}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AuthenticationLayout>
    )
}
