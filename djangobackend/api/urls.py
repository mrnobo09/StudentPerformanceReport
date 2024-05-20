from django.urls import path
from . import views

urlpatterns = [
    path('marks/<str:std_id>/', views.MarksView.as_view()),
    path('attendance/<str:std_id>/', views.AttendanceView.as_view(), name='attendance'),
    path('student-performance/<str:std_id>/',views.StudentPerformanceView.as_view()),
    path('results/<str:std_id>/', views.ResultView.as_view(), name='result-view'),
]