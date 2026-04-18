# The Factory Design Pattern is a creational pattern that provides an interface for creating objects without exposing the exact class being instantiated. 
# Instead of calling constructors directly, you delegate object creation to a factory method.

# 🧠 Why use Factory?
# When object creation logic is complex or conditional
# When you want to decouple client code from concrete classes
# To follow Open/Closed Principle (add new types without changing existing code)

# 🔥 Real-world Use Cases
# Payment gateways (Stripe, Razorpay, PayPal)
# Database connectors (MySQL, PostgreSQL, MongoDB)
# AI model loaders (GPT, Claude, Llama)
# File parsers (JSON, XML, CSV)

# ⚠️ Downsides
# Adds abstraction (overkill for simple cases)
# Slightly harder to debug
# Can become complex if over-engineered

# Base pizza class
class Pizza:
    def prepare(self):
        raise NotImplementedError("This method should be overridden by subclass")

# specific pizza classes
class CheesePizza(Pizza):
    def prepare(self):
        return "Preparing Cheese Pizza"

class PepperoniPizza(Pizza):
    def prepare(self):
        return "Prepare Pepperoni Pizza"

class VeggiePizza(Pizza):
    def prepare(self):
        return "Prepare Veggie Pizza"

# factory class
class PizzaFactory:
    @staticmethod
    def create_pizza(pizza_type):
        if pizza_type == "cheese":
            return CheesePizza()
        elif pizza_type == "pepperoni":
            return PepperoniPizza()
        elif pizza_type == "veggie":
            return VeggiePizza()
        else:
            raise ValueError(f"Unknown Pizza Type : {pizza_type}")

def main():
    try:
        user_input = "pepperoni"
        pizza = PizzaFactory.create_pizza(user_input)
        print(pizza.prepare())
    except ValueError as e:
        print(e)

main()