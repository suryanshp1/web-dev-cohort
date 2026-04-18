# The State Design Pattern is a behavioral pattern that allows an object to change its behavior when its internal state changes, 
# making it appear as if the object’s class has changed.

# 🧠 Simple Definition

# State = behavior changes based on internal state

# Instead of using large if-else blocks, each state is represented as a separate class.

# 🎯 Why use State?
# To eliminate complex conditional logic
# When an object has multiple states with different behaviors

# music
# 🔥 Real-world Examples
# Order lifecycle (Created → Paid → Shipped → Delivered)
# ATM machine states (Idle → Card Inserted → Processing)
# Traffic lights (Red → Yellow → Green)
# AI agents workflow states (Idle → Thinking → Acting → Done)

# ⚠️ Downsides
# Increases number of classes
# Can be overkill for simple logic
# Slightly harder to trace flow initially

# problem class
# class VendingMachine:
#     def __init__(self):
#         self.state = "idle"
#         self.snacks = 5

#     def handle(self, action):
#         if self.state == "idle":
#             if action == "insert_coin":
#                 self.state = "has_money"
#                 print("Coin inserted you can select a snack")
#             else:
#                 print("Insert a coin first")

#         elif self.state == "has_money":
#             if action == "select_snack":
#                 if self.snacks > 0:
#                     self.snacks -= 1
#                     self.state = "idle"
#                     print("Dispensing your snack. Thank you.")
#                 else:
#                     self.state = "out_of_stock"
#                     print("Out of stock refund initiated.")
#         elif self.state == "out_of_stock":
#             print("Sorry, no snack left. Refund your coin.")
#         else:
#             print("Invalid state")

# Usage
# machine = VendingMachine()
# machine.handle("insert_coin")
# machine.handle("select_snack")
# machine.handle("insert_coin")
# machine.handle("select_snack")

from abc import ABC, abstractmethod

# state pattern
class VendingMachine:
    def __init__(self):
        self.snacks = 5
        self.idle_state = IdleState()
        self.has_money_state = HasMoneyState()
        self.out_of_stock_state = OutOfStockState()
        self.state = self.idle_state


    def handle(self, action):
        self.state.handle(self, action)

# State Interface
class State(ABC):
    @abstractmethod
    def handle(self, action):
        pass

# Ideal state
class IdleState(State):
    def handle(self, machine: VendingMachine, action: str):
        if action == "insert_coin":
            self.state = machine.has_money_state
            print("Coin inserted you can select a snack")
        else:
            print("Insert a coin first")

# Has Money state
class HasMoneyState(State):
    def handle(self, machine: VendingMachine, action: str):
        if action == "select_snack":
            if self.snacks > 0:
                self.snacks -= 1
                self.state = machine.idle_state
                print("Dispensing your snack. Thank you.")
            else:
                self.state = machine.out_of_stock_state
                print("Out of stock refund initiated.")

# Out Of Stock state
class OutOfStockState(State):
    def handle(self, machine: VendingMachine, action: str):
        print("Sorry, no snack left. Refund your coin.")

# Usage
machine = VendingMachine()
machine.handle("insert_coin")
machine.handle("select_snack")
machine.handle("insert_coin")
machine.handle("select_snack")