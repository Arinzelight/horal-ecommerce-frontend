import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import { useSelector, useDispatch } from "react-redux";
import AddressUpdate from "./components/AddressUpdate";
import PasswordUpdate from "./components/PasswordUpdate";

const Settings = () => {
  const app = null;
  const currentUser = useSelector((state) => state.user.currentUser);

  const { userInfo } = useSelector((state) => state.user);

  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(
    currentUser?.pictureUrl || null
  );
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [accountFormData, setAccountFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const filePickerRef = useRef();
  const dispatch = useDispatch();

  // =================== Image change ========================

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  // =================== Image Upload ========================

  const uploadImage = async () => {
    () => {
      console.log("Image upload complete");
    };
  };

  // =================== Acount Update ========================

  const handleAccountChange = (e) => {
    setAccountFormData({
      ...accountFormData,
      [e.target.id]: e.target.value.trim(),
    });
  };

  const handleAccountSubmit = async (e) => {
    e.preventDefault();
    //  Account settings dispatch logic
    console.log("Account Form Data:", accountFormData);
  };

  return (
    <div className="flex flex-col items-center justify-center  mb-10 gap-4  text-sm ">
      <div className=" shadow rounded-md md:w-[880px] w-full mr-8">
        <h1 className="border-b border-gray-300 px-5 py-4 font-semibold text-[1rem]">
          Account Settings
        </h1>
        {/* Account settings form */}
        <form className="p-5" onSubmit={handleAccountSubmit}>
          <div className="flex sm:flex-row flex-col sm:justify-start sm:items-center gap-[5rem]">
            <div className="sm:w-[60%] flex flex-col gap-2 w-full">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <label htmlFor="text">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    placeholder="Jamie"
                    defaultValue={currentUser?.firstName || userInfo?.firstName}
                    onChange={handleAccountChange}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="text">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    placeholder="Abdulfatai"
                    defaultValue={currentUser?.lastName || userInfo?.lastName}
                    autoComplete="off"
                    onChange={handleAccountChange}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="JaneDoe@gmail.com"
                    defaultValue={currentUser?.email || userInfo?.email}
                    autoComplete="off"
                    onChange={handleAccountChange}
                  />
                </div>
                <div className="w-full flex flex-col gap-1">
                  <label htmlFor="text">Phone Number</label>
                  <input
                    type="text"
                    id="phone"
                    placeholder="(+234) 701-234-5678"
                    defaultValue={currentUser?.phone || userInfo?.phone}
                    autoComplete="off"
                    onChange={handleAccountChange}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="relative h-[180px] w-[180px]">
                <img
                  className="w-full h-full object-cover rounded-[50%]"
                  src={
                    imageFileUrl ||
                    currentUser?.pictureUrl ||
                    userInfo?.pictureUrl ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  }
                  alt="profile pic"
                />
                {imageFileUploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-[50%]">
                    progess bar
                  </div>
                )}
              </div>
              <input
                type="file"
                id="pictureUrl"
                ref={filePickerRef}
                onChange={handleImageChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => filePickerRef.current.click()}
                className="text-primary text-xs font-semibold py-2 px-5 border-2 border-primary hover:bg-primary hover:text-white rounded-[1.2rem]"
              >
                Choose Image
              </button>
              {imageFileUploadError && (
                <p className="text-red-600 text-xs mt-2">
                  {imageFileUploadError}
                </p>
              )}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="bg-primary rounded-[1rem] hover:opacity-90  text-xs py-2 px-5 mt-4 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  Updating... <ClipLoader color="#fff" top={1} size={15} />
                </span>
              ) : (
                "Save Changes"
              )}
            </button>
            {updateUserError && (
              <p className="text-red-600 text-xs mt-2">{updateUserError}</p>
            )}
          </div>
        </form>
      </div>
      {/* Address Update component */}
      <AddressUpdate />
      {/* Password Update component */}
      <PasswordUpdate />
    </div>
  );
};

export default Settings;
