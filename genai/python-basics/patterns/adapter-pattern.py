# The Adapter Design Pattern is a structural pattern that allows two incompatible interfaces 
# to work together by acting as a bridge (wrapper) between them.

# 🧠 Simple Definition

# Adapter = convert one interface into another expected interface

# 🎯 Why use Adapter?
# When integrating legacy code with new systems
# When using third-party libraries with different interfaces
# To avoid modifying existing (stable) code

# 🧩 Types of Adapter
# Object Adapter (common in Python) → uses composition
# Class Adapter (less common in Python) → uses inheritance

# ⚠️ Downsides
# Adds extra layer of abstraction
# Can increase complexity if overused

# Adapter: the old class with a diffrent method
class BankService:
    def make_payment(self, amount):
        print(f"Processing payment of ${amount} through Bank Service")

# Interface
class PaymentService:
    def pay(self, amount):
        pass

# Adapter
class BankServiceAdapter(PaymentService):
    def __init__(self, bank_service: BankService):
        self.bank_service = bank_service

    def pay(self, amount):
        self.bank_service.make_payment(amount)

# client code : Expects a 'pay(amount)' method
def process_payment(payment_service, amount):
    payment_service.pay(amount)

bank_service_adapter = BankServiceAdapter(BankService())
process_payment(bank_service_adapter, 100)
