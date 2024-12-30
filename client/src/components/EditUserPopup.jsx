import React from "react";
import { useForm } from "react-hook-form";
import { updateUser } from "../utils/api.js";
import toast from 'react-hot-toast';

const EditUserPopup = ({ user, onClose, onUpdate }) => {
    const { register, handleSubmit, setValue } = useForm();

    React.useEffect(() => {
        if (user) {
            setValue("name", user.name);
            setValue("email", user.email);
            setValue("mobile", user.mobile);
        }
    }, [user, setValue]);

    const onSubmit = async (data) => {
        try {
            const updatedUser = await updateUser(user._id, data);
            onUpdate(updatedUser.data.user);
            toast.success('User updated..!')
            onClose();
        } catch (error) {
            console.error("Error updating user:", error.message);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center px-4">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4 text-center">Edit User</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name:</label>
                        <input
                            type="text"
                            {...register("name")}
                            className="border rounded-lg px-3 py-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email:</label>
                        <input
                            type="email"
                            {...register("email")}
                            className="border rounded-lg px-3 py-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Mobile Number:</label>
                        <input
                            type="text"
                            {...register("mobile")}
                            className="border rounded-lg px-3 py-2 w-full"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUserPopup;
