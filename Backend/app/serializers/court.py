from app.models.court import Court
from rest_framework import serializers

class CourtSerializer(serializers.ModelSerializer):
    class Meta:
        model = Court
        fields = "__all__"
        read_only_fields = [
            "id",
            "turf",
            "created_at",
            "updated_at",
        ]