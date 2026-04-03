import threading
import time

def prepare_chai(type, wait_time):
    print(f"{type} chai brewing ...")
    time.sleep(wait_time)
    print(f"{type} chai ready ...")

t1 = threading.Thread(target=prepare_chai, args=("MASALA", 2))
t2 = threading.Thread(target=prepare_chai, args=("GINGER", 3))

t1.start()
t2.start()

t1.join()
t2.join()

