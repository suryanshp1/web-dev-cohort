# from abc import ABC, abstractmethod


# class BankAccount(ABC):
#     def __init__(self, balance: int):
#         self.balance: int = balance

#     @abstractmethod
#     def withdraw(self):
#         pass

#     @abstractmethod
#     def deposit(self):
#         pass


# class SavingsAccount(BankAccount):
#     def __init__(self, balance):
#         super().__init__(balance)

#     def withdraw(self, amount):
#         if self.balance < amount:
#             print("Cannot withdraw, not enough balance")
#         else:
#             self.balance -= amount
#             print(f"Amount withdrawn, remaining balance {self.balance}")

#     def deposit(self, amount):
#         self.balance += amount
#         print(f"Amount deposited, remaining balance {self.balance}")


# class FixedDepositAccount(BankAccount):
#     def __init__(self, balance):
#         super().__init__(balance)

#     def withdraw(self, amount):
#         raise Exception("Cannot withdraw from FD")

#     def deposit(self, amount):
#         self.balance += amount
#         print(f"Amount deposited, remaining balance {self.balance}")


# s = SavingsAccount(1000)
# s.deposit(1000)
# s.withdraw(1500)

# fd = FixedDepositAccount(1000)
# fd.deposit(1000)
# fd.withdraw(500)


from abc import ABC, abstractmethod

class BankAccount(ABC):
    def __init__(self, balance: int):
        self.balance: int = balance

    @abstractmethod
    def withdraw(self):
        pass

    @abstractmethod
    def deposit(self):
        pass

class SavingsAccount(BankAccount):
    def __init__(self, balance):
        super().__init__(balance=balance)
    
    def withdraw(self, amount):
        if self.balance < amount:
            print("Can not withdraw, Not enough money")
        else:
            self.balance -= amount
            print(f"Amount withdrawn, remaining balance : {self.balance}")

    def deposit(self, amount):
        self.balance += amount
        print(f"Amount deposited, remaining balance : {self.balance}")

class FixedDepositAccount(BankAccount):
    def __init__(self, balance):
        super().__init__(balance=balance)
    
    def withdraw(self, amount):
        raise Exception("Can not withdraw from fixed deposite")

    def deposit(self, amount):
        self.balance += amount
        print(f"Amount deposited, remaining balance : {self.balance}")

# s = SavingsAccount(1000)
# s.deposit(1000)
# s.withdraw(500)

f = FixedDepositAccount(1500)
f.deposit(1000)
f.withdraw(500)