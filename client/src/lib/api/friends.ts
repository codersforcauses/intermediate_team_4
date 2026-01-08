import { FriendsResponse } from "../../types/friends";
import api from "../api";

export const searchUsers = (query: string) =>
  api.get(`/friends/search/?q=${query}`);

/* Send friend request */
export const sendFriendRequest = (id: number) =>
  api.post(`/friends/send/${id}/`);

/* Cancel request */
export const cancelFriendRequest = (requestId: number) =>
  api.post(`/friends/cancel/${requestId}/`);

/* Accept request */
export const acceptFriendRequest = (requestId: number) =>
  api.post(`/friends/accept/${requestId}/`);

/* Decline request */
export const declineFriendRequest = (requestId: number) =>
  api.post(`/friends/decline/${requestId}/`);

/* Remove friend */
export const removeFriend = (userId: number) =>
  api.post(`/friends/remove/${userId}/`);

/* Get my friends */
export const getFriends = () =>
  // api.get(`/friends/list/`);
  api.get<FriendsResponse>("/friends/list/");

/* Incoming requests */
export const getIncomingRequests = () => api.get(`/friends/requests/`);

/* Sent requests */
export const getSentRequests = () => api.get(`/friends/requests_sent/`);
