from rest_framework import status
from rest_framework.views import APIView
from app.utils.notify import notifyMessage
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from app.models.booking import Booking, BookingStatus, PaymentStatus

class ConfirmPaymentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, booking_id):
        try:
            booking = Booking.objects.select_related(
                "court__turf__business__user",
                "user",
            ).get(id=booking_id)
        except Booking.DoesNotExist:
            return Response({"error": "Booking not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        if booking.user != request.user:
            return Response({"error": "You are not allowed to confirm this payment"},
                status=status.HTTP_403_FORBIDDEN,
            )

        if booking.payment_status == PaymentStatus.SUCCESS:
            return Response({"error": "Payment already confirmed"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        booking.payment_status = PaymentStatus.SUCCESS
        booking.status = BookingStatus.CONFIRMED
        booking.provider_payment_id = "FAKE_PAYMENT_ID"
        booking.save()

        notifyMessage(f"Your booking {booking.id} has been confirmed",
            booking.user.phone_no,
        )

        notifyMessage(
            f"New booking confirmed at {booking.court.turf.name} "
            f"on {booking.booking_date} from {booking.start_time} to {booking.end_time}",
            booking.court.turf.business.user.phone_no,
        )

        return Response({"message": "Payment confirmed and booking completed"},
            status=status.HTTP_200_OK,
        )