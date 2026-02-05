from rest_framework import serializers
from app.models.feedback import Feedback


class FeedbackSerializer(serializers.ModelSerializer):
    turf_name = serializers.CharField(source="turf.name", read_only=True)

    class Meta:
        model = Feedback
        fields = ["id", "user", "turf", "turf_name", "message", "rating", "created_at"]
        read_only_fields = ["id", "user", "created_at"]

    def validate_rating(self, value):
        if value < 1 or value > 5:
            raise serializers.ValidationError("Rating must be between 1 and 5")
        return value
