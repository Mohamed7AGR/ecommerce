import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { CartContext } from "../../Context/CartContext";
export default function CheckOut() {
  // State for API error message and loading state
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const { cacheOnDelivery, onlinePayment } = useContext(CartContext);

  // State to determine if the user is opting for online payment
  const [isOnline, setIsOnline] = useState(false);
  // Validation schema for form fields
  const ShippingSchema = Yup.object().shape({
    details: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
  });
  // Formik setup
  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: handleShipping,
    validationSchema: ShippingSchema,
  });
  // Function to handle form submission
  async function handleShipping(values) {
    try {
      setLoading(true);
      let response;
      if (isOnline) {
        response = await onlinePayment(values);

        window.location.href = response.data.session.url;
      } else {
        response = await cacheOnDelivery(values);
      }
      formik.resetForm();
    } catch (error) {
      setApiError(error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="md:w-[50%] container flex flex-col mt-20 items-center"
      >
        {apiError && (
          <div
            className="p-4 mb-4 w-full text-sm rounded-lg bg-red-500 text-slate-100"
            role="alert"
          >
            {apiError}
          </div>
        )}

        {/* Input for details */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.details}
            type="text"
            name="details"
            id="details"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-green-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="details"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
          >
            Details
          </label>
        </div>
        {formik.errors.details && formik.touched.details && (
          <div
            className="p-4 mb-4 w-full text-sm rounded-lg bg-red-500 text-slate-100"
            role="alert"
          >
            {formik.errors.details}
          </div>
        )}

        {/* Input for phone */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.phone}
            type="tel" // Changed to 'tel' for better handling of phone numbers
            name="phone"
            id="phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-green-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
          >
            Phone
          </label>
        </div>
        {formik.errors.phone && formik.touched.phone && (
          <div
            className="p-4 mb-4 w-full text-sm rounded-lg bg-red-500 text-slate-100"
            role="alert"
          >
            {formik.errors.phone}
          </div>
        )}

        {/* Input for city */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
            type="text"
            name="city"
            id="city"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-green-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="city"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-8 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-8"
          >
            City
          </label>
        </div>
        {formik.errors.city && formik.touched.city && (
          <div
            className="p-4 mb-4 w-full text-sm rounded-lg bg-red-500 text-slate-100"
            role="alert"
          >
            {formik.errors.city}
          </div>
        )}

        {/* Checkbox for online payment option */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="checkbox"
            value={"online"}
            onChange={(e) => setIsOnline(e.target.checked)}
          />
          <label htmlFor="" className="mx-3">
            Online Payment
          </label>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="text-white bg-main hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full md:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 md:self-end mb-10"
          disabled={loading} // Disable button when loading
        >
          {loading ? (
            <i className="fas fa-spinner fa-spin"></i>
          ) : isOnline ? (
            "Pay Online"
          ) : (
            "Pay Now"
          )}
        </button>
      </form>
    </>
  );
}
