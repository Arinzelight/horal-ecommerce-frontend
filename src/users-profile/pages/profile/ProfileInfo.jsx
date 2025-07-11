const ProfileInfo = ({ title, data }) => {
  return (
    <div className=" md:px-6 h-[230px]">
      <h2 className="text-lg font-semibold px-4 text-gray-900 bg-primary-50 py-2 rounded-t-lg">
        {title}
      </h2>
      <div className="bg-white rounded-b-lg shadow-md">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-2 px-4"
          >
            <span className="text-neutral-400 font-medium">{item.label}</span>
            <span className="text-neutral-700 text-right">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileInfo;
