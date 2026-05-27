# from abc import ABC, abstractmethod


# class PaymentMethod(ABC):

#     @abstractmethod
#     def pay(self, amount: int):
#         pass


# class UPIPayment(PaymentMethod):
#     def pay(self, amount: int):
#         print(f"Paying through UPI of Rs.{amount}")


# class DebitCardPayment(PaymentMethod):
#     def pay(self, amount: int):
#         print(f"Paying through debit card of Rs.{amount}")


# class CreditCardPayment(PaymentMethod):
#     def pay(self, amount: int):
#         print(f"Paying through creditcard of Rs.{amount}")


# class PaymentProcessor:
#     def process_payment(self, payment_method: PaymentMethod, amount: int):
#         payment_method.pay(amount)


# debit = DebitCardPayment()
# credit = CreditCardPayment()

# paym_process = PaymentProcessor()

# paym_process.process_payment(debit, 500)


from abc import ABC, abstractmethod

class PaymentMethod(ABC):
    @abstractmethod
    def pay(self, amount: int):
        pass

class UPIPayment(PaymentMethod):
    def pay(self, amount: int):
        print(f"Paying through UPI of Rs.{amount}")

class DebitCardPayment(PaymentMethod):
    def pay(self, amount: int):
        print(f"Paying through debit card of Rs.{amount}")

class NetBankingPayment(PaymentMethod):
    def pay(self, amount: int):
        print(f"Paying through net banking of Rs.{amount}")

class PaymentProcessor:
    def process_payment(self, payment_method: PaymentMethod, amount: int):
        payment_method.pay(amount=amount)


db_payment = DebitCardPayment()
net_payment = NetBankingPayment()

paym_processor = PaymentProcessor()

paym_processor.process_payment(db_payment, 1000)
paym_processor.process_payment(net_payment, 5000)