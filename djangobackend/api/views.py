from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from .models import User, Attendance, Quiz, Assignment, Mids, Finals, Project,Result
from .serializers import AttendanceSerializer, QuizSerializer, AssignmentSerializer, MidsSerializer, FinalsSerializer, ProjectSerializer,ResultSerializer

class AttendanceView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, std_id):
        student = get_object_or_404(User, std_id=std_id)

        if request.user != student:
            return Response({"detail": "You do not have permission to view this student's attendance."}, status=403)

        total_attendance = Attendance.objects.filter(enrollment__student=student).count()
        total_periods = 17
        attendance_percentage = (total_attendance / total_periods) * 100

        student_attendance = {
            "student_name": f"{student.first_name} {student.last_name}",
            "attendance_percentage": round(attendance_percentage, 2)
        }

        return Response(student_attendance)

class MarksView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, std_id):
        student = get_object_or_404(User, std_id=std_id)

        if request.user != student:
            return Response({"detail": "You do not have permission to view this student's marks."}, status=403)

        student_marks = {
            "quizzes": Quiz.objects.filter(student=student),
            "assignments": Assignment.objects.filter(student=student),
            "mids": Mids.objects.filter(student=student),
            "finals": Finals.objects.filter(student=student),
            "projects": Project.objects.filter(student=student)
        }

        quiz_serializer = QuizSerializer(student_marks["quizzes"], many=True)
        assignment_serializer = AssignmentSerializer(student_marks["assignments"], many=True)
        mids_serializer = MidsSerializer(student_marks["mids"], many=True)
        finals_serializer = FinalsSerializer(student_marks["finals"], many=True)
        project_serializer = ProjectSerializer(student_marks["projects"], many=True)

        return Response({
            "quizzes": quiz_serializer.data,
            "assignments": assignment_serializer.data,
            "mids": mids_serializer.data,
            "finals": finals_serializer.data,
            "projects": project_serializer.data
        })

class StudentPerformanceView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, std_id):
        student = get_object_or_404(User, std_id=std_id)

        if request.user != student:
            return Response({"detail": "You do not have permission to view this student's performance."}, status=403)

        def calculate_weighted_percentage(queryset, weight):
            total_marks = sum(item.total_marks for item in queryset)
            obtained_marks = sum(item.obtained_marks for item in queryset)
            return (obtained_marks / total_marks) * weight if total_marks > 0 else 0

        performance_by_course = {}
        courses = set()

        quizzes = Quiz.objects.filter(student=student)
        assignments = Assignment.objects.filter(student=student)
        mids = Mids.objects.filter(student=student)
        finals = Finals.objects.filter(student=student)
        projects = Project.objects.filter(student=student)

        for quiz in quizzes:
            courses.add(quiz.course)
        for assignment in assignments:
            courses.add(assignment.course)
        for mid in mids:
            courses.add(mid.course)
        for final in finals:
            courses.add(final.course)
        for project in projects:
            courses.add(project.course)

        for course in courses:
            quizzes_percentage = calculate_weighted_percentage(quizzes.filter(course=course), 10)
            assignments_percentage = calculate_weighted_percentage(assignments.filter(course=course), 10)
            mids_percentage = calculate_weighted_percentage(mids.filter(course=course), 25)
            finals_percentage = calculate_weighted_percentage(finals.filter(course=course), 45)
            projects_percentage = calculate_weighted_percentage(projects.filter(course=course), 10)

            overall_percentage = (quizzes_percentage + assignments_percentage + mids_percentage +
                                  finals_percentage + projects_percentage)

            performance_by_course[course.title] = round(overall_percentage, 2)

        student_performance = {
            'student_name': f"{student.first_name} {student.last_name}",
            'performance_by_course': performance_by_course
        }

        return Response(student_performance)

class ResultView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, std_id):
        student = get_object_or_404(User, std_id=std_id)

        if request.user != student:
            return Response({"detail": "You do not have permission to view this student's results."}, status=403)

        results = Result.objects.filter(student=student)
        if not results.exists():
            return Response({"detail": "No results found for this student."}, status=404)

        result_serializer = ResultSerializer(results, many=True)
        student_results = {
            "student_name": f"{student.first_name} {student.last_name}",
            "results": result_serializer.data
        }

        return Response(student_results)