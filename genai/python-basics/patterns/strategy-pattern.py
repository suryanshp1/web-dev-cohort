# The Strategy Design Pattern is a behavioral pattern that allows you to define a family of algorithms, 
# encapsulate each one, and make them interchangeable at runtime.

# 🧠 Simple Definition

# Strategy = choose behavior (algorithm) at runtime

# Instead of hardcoding logic with if-else, you delegate the behavior to separate classes.

# 🎯 Why use Strategy?
# To eliminate large conditional statements
# To switch algorithms dynamically
# To follow Open/Closed Principle (add new strategies without modifying existing code)

# 🔥 Real-world Use Cases
# Payment systems (Credit Card, UPI, Wallet)
# Sorting algorithms (quick sort, merge sort)
# Compression strategies (zip, rar)
# AI model selection (GPT, Claude, Llama)

# ⚠️ Downsides
# Increases number of classes
# Slight overhead of abstraction
# Overkill for very simple logic

# class PaymentProcessor:
#     def process_payment(self, method, amount):
#         if method == "credit_card":
#             print(f"Processing ${amount} payment using credit card")
#         elif method == "paypal":
#             print(f"Processing ${amount} payment using Paypal")
#         elif method == "crypto":
#             print(f"Processing ${amount} payment using Cryptocurrency")
#         else:
#             print(f"Unsupported payment methos")

# ## Example usage
# processor = PaymentProcessor()
# processor.process_payment("credit_card", 100)
# processor.process_payment("paypal", 200)

from abc import ABC, abstractmethod

# Step 1: Define an interface for payment startegies
class PaymentStrategy(ABC):
    @abstractmethod
    def pay(self, amount):
        pass

# Step 2: Implement specific payment strategies
class CreditCardPayment(PaymentStrategy):
    def pay(self, amount):
        print(f"Processing ${amount} payment using Credit Card")

class PaypalPayment(PaymentStrategy):
    def pay(self, amount):
        print(f"Processing ${amount} payment using Paypal")

class CryptoPayment(PaymentStrategy):
    def pay(self, amount):
        print(f"Processing ${amount} payment using Crypto Currency")

# Step 3: Context class to use strategies
class PaymentProcessor:
    def __init__(self, strategy: PaymentStrategy):
        self.strategy = strategy

    def set_strategy(self, strategy: PaymentStrategy):
        self.strategy = strategy

    def process_payment(self, amount):
        self.strategy.pay(amount)

# Example use
processor = PaymentProcessor(CreditCardPayment())
processor.process_payment(100)

processor.set_strategy(PaypalPayment())
processor.process_payment(200)

processor.set_strategy(CryptoPayment())
processor.process_payment(300)