## Sinleton design pattern
# The Singleton Design Pattern ensures that a class has only one instance throughout the application 
# and provides a global access point to that instance.

# 🧠 Why use Singleton?
# When you need exactly one object (e.g., database connection, logger, config manager)
# To avoid multiple conflicting instances
# To provide shared state across the app
# 🐍 Singleton in Python (Basic Implementation)
# ✅ Method 1: Using __new__ (Most Common)
# class Singleton:
#     _instance = None

#     def __new__(cls, *args, **kwargs):
#         if cls._instance is None:
#             print("Creating new instance...")
#             cls._instance = super().__new__(cls)
#         return cls._instance


# # Usage
# obj1 = Singleton()
# obj2 = Singleton()

# print(obj1 is obj2)  # True (same instance)

# 👉 Here:

# __new__ controls object creation
# We store the instance in _instance
# Only one object is ever created

# 🔥 Real-world Examples
# Database connection pool
# Logging system
# Configuration loader
# Cache manager

# ⚠️ Downsides
# Harder to test (global state)
# Can introduce hidden dependencies
# Breaks modularity if overused

class ControlTower:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            print("Initializing Control Tower!")
        return cls._instance

    def manage_flight(self, flight):
        print(f"Manage flight {flight}")

tower1 = ControlTower()
tower2 = ControlTower()

tower1.manage_flight("ABD")
tower2.manage_flight("ER")


print(tower1 is tower2)