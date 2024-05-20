from django.contrib import admin
from .models import User, Course, Enrollment, Attendance, Quiz, Assignment, Mids, Finals, Project, Result, Semester, SemesterResult

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('email','std_id', 'first_name', 'last_name', 'is_active', 'is_staff')
    list_filter = ('is_active', 'is_staff')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('first_name', 'last_name', 'std_id')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name', 'std_id', 'password1', 'password2', 'is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
        }),
    )
    ordering = ('email',)

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'description')
    list_filter = ('title',)
    ordering = ('title',)

@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ('student', 'course','semester')
    list_filter = ('course__title',)
    ordering = ('student',)

@admin.register(Attendance)
class AttendanceAdmin(admin.ModelAdmin):
    list_display = ('enrollment', 'date', 'presence')
    list_filter = ('enrollment__course__title', 'presence')
    ordering = ('enrollment',)

@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    list_display = ('course', 'student', 'number', 'total_marks', 'obtained_marks')
    list_filter = ('course__title', 'number')
    ordering = ('course', 'number')

@admin.register(Assignment)
class AssignmentAdmin(admin.ModelAdmin):
    list_display = ('course', 'student', 'number', 'total_marks', 'obtained_marks')
    list_filter = ('course__title', 'number')
    ordering = ('course', 'number')

@admin.register(Mids)
class MidsAdmin(admin.ModelAdmin):
    list_display = ('course', 'student', 'total_marks', 'obtained_marks')
    list_filter = ('course__title',)
    ordering = ('course',)

@admin.register(Finals)
class FinalsAdmin(admin.ModelAdmin):
    list_display = ('course', 'student', 'total_marks', 'obtained_marks')
    list_filter = ('course__title',)
    ordering = ('course',)

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('course', 'student', 'total_marks', 'obtained_marks')
    list_filter = ('course__title',)
    ordering = ('course',)

@admin.register(Result)
class ResultAdmin(admin.ModelAdmin):
    list_display = ('student', 'semester', 'course', 'total_marks', 'grade')
    list_filter = ('course__title', 'semester')
    ordering = ('student', 'semester', 'course')

@admin.register(Semester)
class SemesterAdmin(admin.ModelAdmin):
    list_display = ('semester_number',)
    ordering = ('semester_number',)

@admin.register(SemesterResult)
class SemesterResultAdmin(admin.ModelAdmin):
    list_display = ('student', 'semester', 'total_grade')
    list_filter = ('semester',)
    ordering = ('student', 'semester')
