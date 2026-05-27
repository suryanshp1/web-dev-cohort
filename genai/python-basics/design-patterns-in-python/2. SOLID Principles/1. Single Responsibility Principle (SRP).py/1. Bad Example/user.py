# class User:
#     def __init__(self, name, age, email):
#         self.name = name
#         self.age = age
#         self.email = email

#     def get_user_info(self):
#         print(f"This is {self.name} and my age is {self.age}")

#     def is_adult(self) -> bool:
#         return self.age > 18

#     def save_to_database(self):
#         print(f"{self.name} is getting saved to Database")

#     def delete_user_from_database(self):
#         print(f"{self.name} is getting deleted from Database")


class User:
    def __init__(self, name, age, email):
        self.name = name
        self.age = age
        self.email = email

    def get_user_info(self) -> None:
        print(f"This is {self.name} and my age is {self.age} and my email is {self.email}")

    def is_adult(self) -> bool:
        return self.age >= 18

    def delete_user_from_db(self):
        print(f"{self.name} is deleted from DB")

    
