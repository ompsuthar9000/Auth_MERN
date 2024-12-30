import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { createUser } from "../utils/api.js";

const Register = () => {
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  const navigate = useNavigate(); // Initialize useNavigate

  const onSubmit = async ({ email, name, password, mobile, profilePicture }) => {
    const payload = {
      email, name, password, mobile, profilePicture: profilePicture[0]
    };
    try {
      toast.promise(
        createUser(payload),
         {
           loading: 'Saving...',
           success: <b>New User Created.!</b>,
           error: <b>Something went wrong</b>,
         }
       );
      reset();
    } catch (error) {
      toast.error(error.message);
      toast(error.response?.data?.error || "Something went wrong");
    }
  };

  const password = watch('password'); // Watch password for validation in confirmPassword field

  return (
    <>

      <div className='w-full flex justify-end items-center p-4'>
      <Toaster />
        <button
          onClick={() => navigate('/')} // Navigate to the "/" route on click
          className="bg-blue-500 text-white py-2 px-3 rounded hover:bg-blue-600 transform -translate-x-2" // Adjust button position to the left
        >
          All Users
        </button>
      </div>
      <div className="max-w-sm mx-auto mt-8 px-6 py-4 border rounded-lg shadow-sm bg-white">
        <h1 className="text-xl font-bold text-center mb-6">Register User</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-1">Name</label>
            <input
              className="w-full border rounded p-2"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded p-2"
              {...register('email', { required: 'Email is required' })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block mb-1">Mobile</label>
            <input
              className="w-full border rounded p-2"
              type="number"
              {...register('mobile', { required: 'Mobile is required' })}
            />
            {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              className="w-full border rounded p-2"
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters long' },
              })}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <div>
            <label className="block mb-1">Confirm Password</label>
            <input
              type="password"
              className="w-full border rounded p-2"
              {...register('confirmPassword', {
                required: 'Confirm Password is required',
                validate: value => value === password || 'Passwords do not match',
              })}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          </div>
          <div>
            <label className="block mb-1">Profile Picture</label>
            <input
              type="file"
              className="w-full"
              {...register('profilePicture', { required: 'Profile picture is required' })}
            />
            {errors.profilePicture && <p className="text-red-500 text-sm">{errors.profilePicture.message}</p>}
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
