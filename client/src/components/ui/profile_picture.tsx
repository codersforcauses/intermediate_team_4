// function ProfilePicture({ }) {
const ProfilePicture = () => {
  return (
    <div className="relative flex justify-between">
      <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-blue-500">
        <div className="absolute top-5 h-12 w-12 rounded-full bg-blue-200"></div>
        <div className="absolute -bottom-2 left-1/2 h-12 w-16 -translate-x-1/2 rounded-full bg-blue-200"></div>
      </div>
    </div>
  );
};
export default ProfilePicture;
