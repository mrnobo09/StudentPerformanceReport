from djoser.serializers import UserCreateSerializer
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import Course, Enrollment, Attendance, Quiz, Assignment, Mids, Finals, Project, Result, Semester, SemesterResult

User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'email','std_id','first_name', 'last_name', 'password')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email','std_id','first_name', 'last_name', 'is_active', 'is_staff']

class CourseSerializer(serializers.ModelSerializer):
    instructor = UserSerializer(read_only=True)
    
    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'instructor']

class SemesterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Semester
        fields = ['id', 'semester_number']

class EnrollmentSerializer(serializers.ModelSerializer):
    student = UserSerializer()
    course = CourseSerializer()
    semester = SemesterSerializer() 
    
    class Meta:
        model = Enrollment
        fields = ['id', 'student', 'course', 'semester']

class AttendanceSerializer(serializers.ModelSerializer):
    enrollment = EnrollmentSerializer()
    
    class Meta:
        model = Attendance
        fields = ['id', 'enrollment', 'date', 'presence']

class QuizSerializer(serializers.ModelSerializer):
    student = UserSerializer()
    course = CourseSerializer()
    
    class Meta:
        model = Quiz
        fields = ['id', 'student', 'course', 'number', 'total_marks', 'obtained_marks']

class AssignmentSerializer(serializers.ModelSerializer):
    student = UserSerializer()
    course = CourseSerializer()
    
    class Meta:
        model = Assignment
        fields = ['id', 'student', 'course', 'number', 'total_marks', 'obtained_marks']

class MidsSerializer(serializers.ModelSerializer):
    student = UserSerializer()
    course = CourseSerializer()
    
    class Meta:
        model = Mids
        fields = ['id', 'student', 'course', 'total_marks', 'obtained_marks']

class FinalsSerializer(serializers.ModelSerializer):
    student = UserSerializer()
    course = CourseSerializer()
    
    class Meta:
        model = Finals
        fields = ['id', 'student', 'course', 'total_marks', 'obtained_marks']

class ProjectSerializer(serializers.ModelSerializer):
    student = UserSerializer()
    course = CourseSerializer()
    
    class Meta:
        model = Project
        fields = ['id', 'student', 'course', 'total_marks', 'obtained_marks']

class ResultSerializer(serializers.ModelSerializer):
    student = UserSerializer()
    course = CourseSerializer()
    semester = SemesterSerializer()
    
    class Meta:
        model = Result
        fields = ['id', 'student', 'semester', 'course', 'total_marks', 'grade']

class SemesterResultSerializer(serializers.ModelSerializer):
    student = UserSerializer()
    semester = SemesterSerializer()
    
    class Meta:
        model = SemesterResult
        fields = ['id', 'student', 'semester', 'total_grade']
