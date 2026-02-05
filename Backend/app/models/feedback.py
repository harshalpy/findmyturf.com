import uuid
from django.db import models
from django.conf import settings
from app.models.turf import Turf


class Feedback(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    user = models.ForeignKey(
    settings.AUTH_USER_MODEL,
    on_delete=models.CASCADE,
    related_name="feedbacks",
    null=True,
    blank=True
)

    turf = models.ForeignKey(
        Turf,
        on_delete=models.CASCADE,
        related_name="feedbacks"
    )

    message = models.TextField()

    rating = models.PositiveSmallIntegerField()

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["user", "turf"],
                name="unique_feedback_per_user_per_turf"
            )
        ]

    def __str__(self):
        return f"{self.user} - {self.turf} - {self.rating}"
