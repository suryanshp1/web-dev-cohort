# class Student:
#     # Methods
#     def __init__(self, name: str, age: int, gender: str) -> None:
#         # Attributes
#         self.name = name
#         self.age = age
#         self.gender = gender

#     def display(self) -> None:
#         print(f"My name is {self.name}, age is {self.age} and gender is {self.gender}")

#     def get_age(self) -> int:
#         return self.age


# s1 = Student("Anirudh", 22, "Male")
# print(s1.get_age())


class Student:

    # Method
    def __init__(self, name: str, age: int, gender: str) -> None:
        # Attributes
        print("this is a constructor/initializer")
        self.name = name
        self.age = age
        self.gender = gender

    def display(self) -> None:
        print(f"name : {self.name}")
        print(f"age : {self.age}")
        print(f"gender : {self.gender}")

    def get_age(self) -> int:
        return self.age


s1 = Student("Surya", 24, "M")
s1.display()
print(s1.get_age())
