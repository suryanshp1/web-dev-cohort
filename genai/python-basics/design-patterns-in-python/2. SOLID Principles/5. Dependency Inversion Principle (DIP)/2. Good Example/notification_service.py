# from notification_channel import NotificationChannel


# class NotificationService:
#     def __init__(self, channel: NotificationChannel):
#         self.channel = channel

#     def notify(self, message):
#         self.channel.send(message)


from notification_channel import NotificationChannel

class NotificationService:
    def __init__(self, notification_channel: NotificationChannel):
        self.channel = notification_channel

    def notify(self, message):
        self.channel.send(message=message)