import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { UserContext } from "../../Context/UserContext";

export default function Register() {
  const { setToken } = useContext(UserContext);

  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const SignUpSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required")
      .matches(/^[A-z].{2,}/, "Must start upper case and min 2 characters"),
    email: Yup.string().required("Email is required").email("Invalid Email"),
    password: Yup.string()
      .required("Please Enter Your Password")
      .matches(
        /^[A-z][a-z0-9]{8,}$/,
        "Password must have a minimum of 8 characters and start with a letter"
      ),
    rePassword: Yup.string()
      .required("Please Enter Your Password")
      .oneOf([Yup.ref("password")], "Not Match", "RePassword is required"),

    phone: Yup.string()
      .required("Please Enter Your Phone Number ")
      .matches(/^01[0125][0-9]{8}/, "Please Enter Egyptian Phone Number"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: handelRegister,
    validationSchema: SignUpSchema,
  });
  async function handelRegister(values) {
    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      console.log(data);
      if (data.message == "success") {
        navigate("/");
        setToken(data.token);
      }
    } catch (error) {
      setErrorMsg("Email already Exist ");
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className=" md:w-[80%] container flex  flex-col justify-center items-center "
      >
        {apiError ? (
          <div
            className="p-4 mb-4 w-full text-sm  rounded-lg  bg-red-500 text-slate-100"
            role="alert"
          >
            {apiError}
          </div>
        ) : (
          ""
        )}
        <h2 className="font-thin text-4xl mb-6   self-start">Register Now :</h2>
        <div className="relative z-0 w-full mb-5 group">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            type="text"
            name="name"
            id="name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-green-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Name
          </label>
        </div>
        {formik.errors.name && formik.touched.name && (
          <div
            className="p-4 mb-4 w-full text-sm  rounded-lg  bg-red-500 text-slate-100"
            role="alert"
          >
            {formik.errors.name}
          </div>
        )}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-green-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
          >
            Email address
          </label>
        </div>
        {formik.errors.email && formik.touched.email && (
          <div
            className="p-4 mb-4 w-full text-sm  rounded-lg  bg-red-500 text-slate-100"
            role="alert"
          >
            {formik.errors.email}
          </div>
        )}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            type="password"
            name="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-green-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        {formik.errors.password && formik.touched.password && (
          <div
            className="p-4 mb-4 w-full text-sm  rounded-lg  bg-red-500 text-slate-100"
            role="alert"
          >
            {formik.errors.password}
          </div>
        )}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rePassword}
            type="password"
            name="rePassword"
            id="rePassword"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-green-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="rePassword"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            RePassword
          </label>
        </div>
        {formik.errors.rePassword && formik.touched.rePassword && (
          <div
            className="p-4 mb-4 w-full text-sm  rounded-lg  bg-red-500 text-slate-100"
            role="alert"
          >
            {formik.errors.rePassword}
          </div>
        )}
        <div className="z-0 w-full mb-0 group">
          <div className="relative z-0 w-full mb-2 group">
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              type="tel"
              name="phone"
              id="phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-green-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone number
            </label>
          </div>
        </div>
        {formik.errors.phone && formik.touched.phone && (
          <div
            className="p-4 mb-4 w-full text-sm  rounded-lg  bg-red-500 text-slate-100"
            role="alert"
          >
            {formik.errors.phone}
          </div>
        )}
        <button
          type="submit"
          className="text-white bg-main hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full md:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 md:self-end "
        >
          {loading ? <i className="fas fa-spinner fa-spin "></i> : " Submit"}
        </button>
      </form>
    </>
  );
}
