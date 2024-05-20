from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db.models.signals import post_save
from django.dispatch import receiver

class UserAccountManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, std_id, password=None):
        if not email:
            raise ValueError('User must have an email address!')
        if not std_id:
            raise ValueError('User must have a student ID!')

        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name, last_name=last_name, std_id=std_id)

        user.set_password(password)
        user.save(using=self._db)
        
        return user
    
    def create_superuser(self, email, first_name, last_name, std_id, password=None):
        user = self.create_user(email, first_name, last_name, std_id, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    std_id = models.CharField(max_length=6, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'std_id']

    def getName(self):
        return self.first_name + ' ' + self.last_name
    
    def __str__(self):
        return self.email

class Course(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return self.title

class Quiz(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    number = models.PositiveIntegerField()
    total_marks = models.IntegerField()
    obtained_marks = models.IntegerField()

    def __str__(self):
        return f"Quiz {self.number} for {self.course.title}"

class Assignment(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    number = models.PositiveIntegerField()
    total_marks = models.IntegerField()
    obtained_marks = models.IntegerField()

    def __str__(self):
        return f"Assignment {self.number} for {self.course.title}"

class Mids(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    total_marks = models.IntegerField()
    obtained_marks = models.IntegerField()

    def __str__(self):
        return f"Mids for {self.course.title}"

class Finals(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    total_marks = models.IntegerField()
    obtained_marks = models.IntegerField()

    def __str__(self):
        return f"Finals for {self.course.title}"

class Project(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    total_marks = models.IntegerField()
    obtained_marks = models.IntegerField()

    def __str__(self):
        return f"Project for {self.course.title}"

class Semester(models.Model):
    semester_number = models.SmallIntegerField()
    total_semester = 8

    def __str__(self):
        return f"Semester {self.semester_number}"

class Result(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    semester = models.ForeignKey(Semester, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    total_marks = models.IntegerField(default=0)
    grade = models.CharField(max_length=2, blank=True)

    def calculate_total_marks(self):
        quiz_marks = sum(quiz.obtained_marks for quiz in Quiz.objects.filter(student=self.student, course=self.course))
        assignment_marks = sum(assignment.obtained_marks for assignment in Assignment.objects.filter(student=self.student, course=self.course))
        mids_marks = sum(mids.obtained_marks for mids in Mids.objects.filter(student=self.student, course=self.course))
        finals_marks = sum(finals.obtained_marks for finals in Finals.objects.filter(student=self.student, course=self.course))
        project_marks = sum(project.obtained_marks for project in Project.objects.filter(student=self.student, course=self.course))

        self.total_marks = quiz_marks + assignment_marks + mids_marks + finals_marks + project_marks

    def calculate_grade(self):
        if self.total_marks >= 90:
            self.grade = 'A'
        elif self.total_marks >= 80:
            self.grade = 'B'
        elif self.total_marks >= 70:
            self.grade = 'C'
        elif self.total_marks >= 60:
            self.grade = 'D'
        else:
            self.grade = 'F'

    def save(self, *args, **kwargs):
        self.calculate_total_marks()
        self.calculate_grade()
        super(Result, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.student.std_id} - {self.semester} - {self.course.title} - {self.grade}"

class SemesterResult(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    semester = models.ForeignKey(Semester, on_delete=models.CASCADE)
    total_grade = models.CharField(max_length=2, blank=True)

    def calculate_total_grade(self):
        results = Result.objects.filter(student=self.student, semester=self.semester)
        total_marks = sum(result.total_marks for result in results)
        num_courses = results.count()
        average_marks = total_marks / num_courses if num_courses > 0 else 0

        if average_marks >= 90:
            self.total_grade = 'A'
        elif average_marks >= 80:
            self.total_grade = 'B'
        elif average_marks >= 70:
            self.total_grade = 'C'
        elif average_marks >= 60:
            self.total_grade = 'D'
        else:
            self.total_grade = 'F'

    def save(self, *args, **kwargs):
        self.calculate_total_grade()
        super(SemesterResult, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.student.std_id} - Semester {self.semester.semester_number} - {self.total_grade}"

class Enrollment(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    semester = models.ForeignKey(Semester,on_delete = models.CASCADE)

    def __str__(self):
        return f"{self.student.std_id} enrolled in {self.course.title}"

class Attendance(models.Model):
    enrollment = models.ForeignKey(Enrollment, on_delete=models.CASCADE)
    date = models.DateField()
    presence = models.BooleanField()

    def __str__(self):
        return f"{self.enrollment.student.std_id} - {self.date} - {'Present' if self.presence else 'Absent'}"


@receiver(post_save, sender=Quiz)
@receiver(post_save, sender=Assignment)
@receiver(post_save, sender=Mids)
@receiver(post_save, sender=Finals)
@receiver(post_save, sender=Project)
def update_result(sender, instance, **kwargs):
    course = instance.course
    student = instance.student
    semester = Semester.objects.get(pk=1) 

    result, created = Result.objects.get_or_create(student=student, course=course, semester=semester)
    result.save()

    semester_result, created = SemesterResult.objects.get_or_create(student=student, semester=semester)
    semester_result.save()
