# The Observer Design Pattern is a behavioral pattern where one object (called the Subject) maintains a list of dependents (called Observers) and automatically notifies them of any state changes.

# 🧠 Simple Definition

# Observer pattern = one-to-many dependency
# When the subject changes → all observers get notified.

# 🎯 Real-world intuition
# YouTube channel → subscribers get notified on new video
# Stock price → investors get updates
# Event systems → listeners react to changes

# 🔥 Where it's used in real systems
# Event-driven systems (Kafka consumers, message queues)
# Webhooks (Stripe, GitHub events)
# UI frameworks (React state updates)
# AI agents reacting to events (very relevant for your work)
# ⚠️ Downsides
# Can lead to unexpected cascading updates
# Debugging becomes tricky in large systems
# Memory leaks if observers aren’t removed properly
# 💡 Pro Tip (Production Insight)

# In modern backend systems, Observer is often implemented using:

# Pub/Sub systems (Redis, Kafka)
# Async event buses
# WebSocket listeners


from typing import List

class Stock:
    def __init__(self, name, price):
        self.name = name
        self.price = price
        self.observers: List = []

    def add_observer(self, observer):
        self.observers.append(observer)
    
    def remove_observer(self, observer):
        self.observers.remove(observer)

    def notify_observer(self):
        for observer in self.observers:
            observer.update(self)

    def set_price(self, new_price):
        self.price = new_price
        self.notify_observer()


class Observer:
    def update(self, stock):
        raise NotImplementedError("This method should be overridden by subclass")

class Dashboard(Observer):

    def update(self, stock):
        print(f"Dashboard updated: {stock.name} is now ${stock.price}")

class EmailAlert(Observer):

    def update(self, stock):
        print(f"Email Alert: {stock.name} price updated to ${stock.price}")

class SMSAlert(Observer):

    def update(self, stock):
        print(f"SMS Alert: {stock.name} price updated to ${stock.price}")

# Usage

apple_stock = Stock("APL", 334)
tesla_stock = Stock("TSL", 233)

# Observer
dashboard = Dashboard()
email_alerts = EmailAlert()
sms_alerts = SMSAlert()

apple_stock.add_observer(dashboard)
apple_stock.add_observer(email_alerts)
apple_stock.add_observer(sms_alerts)

tesla_stock.add_observer(dashboard)
tesla_stock.add_observer(email_alerts)

apple_stock.set_price(150)
tesla_stock.set_price(500)
