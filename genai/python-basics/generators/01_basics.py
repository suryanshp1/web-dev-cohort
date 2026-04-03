def servechai():
    yield "Cup 1 : Masala Chai"
    yield "Cup 2 : Ginger Chai"
    yield "Cup 3 : Elaichi Chai"

stall = servechai()

# for cup in stall:
#     print(cup)

def get_chai_list():
    return ["Cup 1", "Cup 2", "Cup 3"]


# generator function
def get_chai_gen():
    yield "Cup 1"
    yield "Cup 2"
    yield "Cup 3"

chai = get_chai_gen()
# print(chai)
print(next(chai)) # Cup 1
print(next(chai)) # Cup 2
print(next(chai)) # Cup 3
# print(next(chai)) # StopIteration : Exception