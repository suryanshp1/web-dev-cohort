# The Builder Design Pattern is a creational pattern used to construct complex objects step by step, allowing you to create different representations of an object using the same construction process.

# 🧠 Simple Definition

# Builder = construct object step-by-step instead of one big constructor

# 🎯 Why use Builder?
# When an object has many optional parameters
# To avoid telescoping constructors (too many arguments)
# To create immutable or well-structured objects
# To separate construction logic from representation

# 🔥 Real-world Use Cases
# Building complex API requests (headers, body, auth)
# Creating AI agent pipelines (step-by-step config)
# Query builders (ORMs like SQLAlchemy)
# Config objects in large systems

# ⚠️ Downsides
# More classes → added complexity
# Overkill for simple objects
# Slightly more boilerplate


class House:
    def __init__(self, bedrooms, bathrooms, kitchen, garden, garage, pool, solar_panel, smart_home):
        self.bedrooms = bedrooms
        self.bathrooms = bathrooms
        self.kitchen = kitchen
        self.garden = garden
        self.garage = garage
        self.pool = pool
        self.solar_panel = solar_panel
        self.smart_home = smart_home

    def __str__(self):
        features = [
            f"Bedrooms: {self.bedrooms}",
            f"Bathrooms: {self.bathrooms}",
            f"Kitchen: {"Yes" if self.kitchen else "No"}",
            f"Garden: {"Yes" if self.garden else "No"}",
            f"Garage: {"Yes" if self.garage else "No"}",
            f"Pool: {"Yes" if self.pool else "No"}",
            f"Solar Panel: {"Yes" if self.solar_panel else "No"}",
            f"Smart Home: {"Yes" if self.smart_home else "No"}",
        ]

        return " | ".join(features)


# creating a house
# house = House(3, 2, True, True, False, True, False, False)
# print(house)

class HouseBuilder:
    def __init__(self):
        self.bedrooms = 1
        self.bathrooms = 1
        self.kitchen = True
        self.garden = False
        self.garage = False
        self.pool = False
        self.solar_panel = False
        self.smart_home = False

    def set_bedrooms(self, count):
        self.bedrooms = count
        return self

    def set_bathrooms(self, count):
        self.bathrooms = count
        return self

    def add_garden(self):
        self.garden = True
        return self

    def add_pool(self):
        self.pool = True
        return self

    def add_garage(self):
        self.garage = True
        return self

    def add_solar_panel(self):
        self.solar_panel = True
        return self

    def add_smart_home(self):
        self.smart_home = True
        return self

    def build(self):
        return House(
            self.bedrooms,
            self.bathrooms,
            self.kitchen,
            self.garden,
            self.garage,
            self.pool,
            self.solar_panel,
            self.smart_home,
        )

## Create a custom house using builder pattern
house_builder = HouseBuilder()

custom_house = (
    house_builder
    .set_bedrooms(4)
    .set_bathrooms(1)
    .add_garage()
    .add_garden()
    .add_pool()
    .add_smart_home()
    .add_solar_panel()
    .build()
)

print(custom_house)