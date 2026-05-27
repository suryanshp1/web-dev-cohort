# class Bank:
#     def __init__(self, name: str, __balance: int):
#         self.name: str = name
#         # Private attribute
#         self.____balance: int = __balance

#     # Getter
#     def get___balance(self):
#         print(f"Current __balance = {self.____balance}")

#     # Setter
#     def set___balance(self, new_amount):
#         self.____balance = new_amount

#     def __isServerLive(self):
#         return True

#     def deposit(self, amount: int):
#         if self.__isServerLive() == True:
#             self.____balance += amount
#             print(f"Amount deposited, current __balance = {self.____balance}\n")
#         else:
#             print("Server is down")

#     def withdraw(self, amount):
#         if amount > self.____balance:
#             print("Not enought money in bank\n")
#         else:
#             self.____balance -= amount
#             print(f"Amount withdrawn, current __balance = {self.____balance}\n")


# acc = Bank("Anirudh", 1000)
# acc.deposit(1000)
# acc.get___balance()
# acc.withdraw(500)
# acc.__isServerLive()


class Bank:
    def __init__(self, name: str, balance: int):
        self.name: str = name
        self.__balance: int = balance

    # Getter
    def get_balance(self):
        print(f"Current balance = {self.__balance}\n")

    # Setter
    def set_balance(self, new_amount):
        self.__balance = new_amount

    def __isServerLive(self):
        return True

    def deposit(self, amount: int):
        self.__balance += amount
        print(f"Amount deposited : Current balance = {self.__balance}\n")

    def withdraw(self, amount):
        if amount > self.__balance:
            print("Not enough money in Bank")

        else:
            self.__balance -= amount
            print(f"Amount withdrawn : Current balance = {self.__balance}\n")
    
acc = Bank("Surya", 1000)
acc.deposit(1000)
acc.withdraw(10000000)
acc.withdraw(1000)
acc.get_balance()