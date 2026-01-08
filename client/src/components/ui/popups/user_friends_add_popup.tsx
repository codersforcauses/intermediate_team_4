import { removeFriend, sendFriendRequest } from "../../../lib/api/friends";
import { OtherUsers } from "../user_tables/user_friends_add_table";

const FriendAddItemModal = ({
  user,
  onClose,
}: {
  user: OtherUsers;
  onClose: () => void;
}) => {
  const handleSend = async () => {
    await sendFriendRequest(user.id);
    onClose();
  };

  const handleRemove = async () => {
    await removeFriend(user.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="w-[300px] rounded bg-white p-6">
        <h2 className="text-lg font-bold">{user.username}</h2>

        <div className="mt-4 space-y-2">
          {!user.is_friend && !user.request_sent && (
            <button
              onClick={handleSend}
              className="w-full rounded bg-blue-600 py-2 text-white"
            >
              Send Friend Request
            </button>
          )}

          {user.is_friend && (
            <button
              onClick={handleRemove}
              className="w-full rounded bg-red-600 py-2 text-white"
            >
              Remove Friend
            </button>
          )}

          <button onClick={onClose} className="w-full rounded border py-2">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendAddItemModal;
