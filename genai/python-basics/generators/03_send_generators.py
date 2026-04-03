def chai_customer():
    print("Welcom! What chai would you like ?")
    order = yield

    while True:
        print(f"Preparing: {order}")
        order = yield


stall = chai_customer()
next(stall) # start the genrator
stall.send("Masala Chai")
stall.send("Ginger Chai")