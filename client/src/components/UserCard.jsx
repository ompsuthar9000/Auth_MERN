import { Trash2 ,Pencil} from 'lucide-react';
const UserCard = ({ user, onEdit, onDelete }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg p-4 flex items-center mb-4  gap-2 max-sm:flex-col">
            {/* Profile Picture */}
            <div className="w-1/5 flex justify-center">
                <img
                    src={user.profilePicture}
                    alt={`${user.name}'s Profile`}
                    className="w-12 h-12 rounded-full object-cover"
                />
            </div>

            {/* User Information */}
            <div className="w-2/5">
                <h3 className=" max-sm:text-sm font-semibold">{user.name}</h3>
            </div>
            <div className="w-1/5">
            
                <p className="text-sm text-gray-600">{user.mobile}</p>
            </div>
            {/* Email */}
            <div className="w-2/5 text-center">
                <p className="text-sm text-gray-800">{user.email}</p>
            </div>

            {/* Actions */}
            <div className="w-1/5 text-center flex justify-center gap-4 max-md:flex-col max-md:w-fit">
                <button
                    onClick={() => onEdit(user)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 max-md:w-fit"
                >
                    <Pencil className='max-md:size-4'/>
                </button>
                <button
                    onClick={() => onDelete(user._id)} // Ensure `_id` is used for deletion
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 max-md:w-fit"
                >
                   <Trash2 className='max-md:size-4'/>
                </button>
            </div>
        </div>
    );
};

export default UserCard;