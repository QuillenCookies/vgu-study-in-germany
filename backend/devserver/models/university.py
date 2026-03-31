from django.db import models
from .core import City

# ==========================================
# 2. UNIVERSITY DOMAIN (M2M)
# ==========================================
class Language(models.Model):
    lang_id = models.AutoField(primary_key=True)
    lang_name = models.CharField(max_length=50)

    class Meta:
        db_table = 'languages'

class AcaHighlight(models.Model):
    aca_highlight_id = models.AutoField(primary_key=True)
    aca_highlight_name = models.CharField(max_length=255)

    class Meta:
        db_table = 'aca_highlights'

class Subject(models.Model):
    subject_id = models.AutoField(primary_key=True)
    subject_name = models.CharField(max_length=255)

    class Meta:
        db_table = 'subjects'

class University(models.Model):
    uni_id = models.AutoField(primary_key=True)
    city = models.ForeignKey(City, on_delete=models.CASCADE, db_column='city_id', null=True)
    uni_name = models.CharField(max_length=255)
    type = models.CharField(max_length=100, null=True, blank=True) # University / Applied Sciences...
    institution_type = models.CharField(max_length=50, null=True, blank=True) # Public / Private
    ranking_global = models.IntegerField(null=True, blank=True)
    lat = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    long = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    uni_url = models.TextField(null=True, blank=True)
    
    # Quan hệ Nhiều-Nhiều có chứa extra field (rank) -> Phải dùng bảng trung gian custom
    languages = models.ManyToManyField(Language, through='UniLanguage')
    subjects = models.ManyToManyField(Subject, through='UniSubjectRank')
    highlights = models.ManyToManyField(AcaHighlight, through='UniHighlight')

    class Meta:
        db_table = 'universities'

class UniLanguage(models.Model):
    uni = models.ForeignKey(University, on_delete=models.CASCADE, db_column='uni_id')
    language = models.ForeignKey(Language, on_delete=models.CASCADE, db_column='lang_id')

    class Meta:
        db_table = 'uni_languages'
        unique_together = ('uni', 'language')

class UniSubjectRank(models.Model):
    uni = models.ForeignKey(University, on_delete=models.CASCADE, db_column='uni_id')
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, db_column='subject_id')
    rank = models.IntegerField()

    class Meta:
        db_table = 'uni_subject_ranks'
        unique_together = ('uni', 'subject')

class UniHighlight(models.Model):
    uni = models.ForeignKey(University, on_delete=models.CASCADE, db_column='uni_id')
    aca_highlight = models.ForeignKey(AcaHighlight, on_delete=models.CASCADE, db_column='aca_highlight_id')

    class Meta:
        db_table = 'uni_highlights'
        unique_together = ('uni', 'aca_highlight')