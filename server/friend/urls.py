from django.urls import path
from . import views

urlpatterns = [
    path("send/<int:user_id>/", views.SendFriendRequest.as_view()),
    path("accept/<int:request_id>/", views.AcceptFriendRequest.as_view()),
    path("decline/<int:request_id>/", views.DeclineFriendRequest.as_view()),
    path("cancel/<int:request_id>/", views.CancelFriendRequest.as_view()),
    path("requests_sent/", views.MySentRequests.as_view()),
    path("requests/", views.MyFriendRequests.as_view()),
    path("list/", views.MyFriends.as_view()),
    path("remove/<int:user_id>/", views.RemoveFriends.as_view()),
    path("search/", views.UserSearch.as_view(), name="user-search"),
]