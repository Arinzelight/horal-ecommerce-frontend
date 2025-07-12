
 import { useNavigate } from "react-router-dom";
 import ProfileInfo from "./ProfileInfo";
 import SectionHeader from "../../../sellers-dashboard/components/SectionHeader";
 import MyProfile from "../../../sellers-dashboard/pages/settings/account-settings/profile/MyProfile";
 import useProfile from "../../../hooks/useProfile";
 import InitialLoader from "../../../components/InitialLoader";

 const UserProfile = () => {
   const navigate = useNavigate();
   const { currentProfile, isProfileLoading, profileError } = useProfile();

   const user = currentProfile;


   const handleEditProfile = () => {
     navigate("edit");
   };

   if (isProfileLoading) {
     return (
       <div className="py-32">
         <div className="flex justify-center items-center h-64">
           <InitialLoader />
         </div>
       </div>
     );
   }

   if (profileError) {
     return (
       <div className="py-6">
         <div className="flex justify-center items-center h-64">
           <div className="text-red-500">Error loading profile</div>

           <button
             className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
             onClick={() => {
               // Retry logic can be implemented here
               window.location.reload();
             }}
           >
             Retry
           </button>
         </div>
       </div>
     );
   }

   const profileData = {
     fullName: user?.full_name,
     email: user?.email,
     phone: user?.phone_number || "NA",
    //  joinDate: user?.joinDate || "NA",
     location: {
       street_address: user?.location?.street_address || "NA",
       local_govt: user?.location?.local_govt || "NA",
       state: user?.location?.state || "NA",
       landmark: user?.location?.landmark || "NA",
       country: user?.location?.country || "NA",
     },
     profilePicture:
       user?.image ||
       "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
   };

   return (
     <div className="py-6">
       <div className="">
         {/* Header */}
         <SectionHeader title="My Profile" />

         {/* Profile Information */}
         <div className="mt-8">
           <MyProfile
             isSeller={false}
             profileData={profileData}
             onEdit={handleEditProfile}
           />
         </div>
       </div>
     </div>
   );
 };
 export default UserProfile;