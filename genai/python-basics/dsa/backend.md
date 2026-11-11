# Top 120 Python + Backend + FastAPI + Django + Celery + AWS Interview Questions

These questions are aimed at mid-level to senior full-stack/backend developer interviews. The answers focus on practical engineering, not just definitions.

I've grouped them into seven sections. For each question, you'll get a direct answer followed by the reasoning or implementation detail you should understand.

## Section 1: Python fundamentals (1–20)

### 1. What is the difference between a list, tuple, set, and dictionary?

Answer:

- List: Ordered, mutable collection that allows duplicate elements.
- Tuple: Ordered, immutable collection that allows duplicates.
- Set: Mutable collection of unique elements; does not support indexing.
- Dictionary: Mutable collection of key-value pairs with unique keys.

Explanation:

Choose a list when you need an ordered collection that changes. Use tuples for fixed records, sets for uniqueness and membership checks, and dictionaries for fast key-based lookups.

```
users = ["Alice", "Bob", "Alice"]coordinates = (10, 20)unique_users = {"Alice", "Bob"}user = {"name": "Alice", "age": 25}
```

### 2. What is the difference between mutable and immutable objects?

Answer:

Mutable objects can be modified after creation, while immutable objects cannot be modified after creation.

Examples:

- Mutable: `list`, `dict`, `set`
- Immutable: `int`, `float`, `str`, `tuple`, `bool`

Explanation:

```
numbers = [1, 2, 3]numbers.append(4)  # Modifies the same listname = "Python"name += " Developer"  # Creates a new string
```

This distinction matters when passing objects to functions, sharing state between components, and using objects as dictionary keys. Immutable objects are generally safer to share.

### 3. What is the difference between `==` and `is`?

Answer:

- `==` compares values.
- `is` checks whether two references point to the exact same object.

```
a = [1, 2, 3]b = [1, 2, 3]print(a == b)  # Trueprint(a is b)  # False
```

Explanation:

Two different objects can contain identical values. Use `is` when checking identity, especially for singleton values such as `None`.

```
if result is None:    print("No result")
```

### 4. What is the difference between shallow copy and deep copy?

Answer:

A shallow copy creates a new outer object but shares references to nested objects. A deep copy recursively copies nested objects as well.

```
import copyoriginal = [[1, 2], [3, 4]]shallow = copy.copy(original)deep = copy.deepcopy(original)original[0].append(5)print(shallow)  # [[1, 2, 5], [3, 4]]print(deep)     # [[1, 2], [3, 4]]
```

Explanation:

Use shallow copies when sharing nested data is acceptable. Use deep copies when you need an independent copy of the entire structure. Deep copying can consume significant memory and time for large objects.

### 5. What is the LEGB rule in Python?

Answer:

LEGB describes the order Python follows when resolving variable names:

1. Local: Inside the current function.
2. Enclosing: In the enclosing function.
3. Global: At the module level.
4. Built-in: Python's built-in namespace.

```
name = "Global"def outer():    name = "Enclosing"    def inner():        name = "Local"        print(name)    inner()outer()  # Local
```

Explanation:

Understanding LEGB helps debug variable shadowing and scope-related issues. Use `global` to modify a module-level variable and `nonlocal` to modify a variable in an enclosing function.

### 6. What are decorators in Python?

Answer:

A decorator is a function that modifies or extends the behavior of another function without changing its original implementation.

```
from functools import wrapsdef log_execution(func):    @wraps(func)    def wrapper(*args, **kwargs):        print(f"Executing {func.__name__}")        result = func(*args, **kwargs)        return result    return wrapper@log_executiondef get_user():    return {"name": "Alice"}get_user()
```

Explanation:

Decorators are commonly used for authentication, authorization, logging, caching, timing, and retry logic.

For example, a backend API can use a decorator to check whether a user has permission to execute a particular operation.

### 7. What are generators in Python?

Answer:

Generators are functions that produce values lazily using the `yield` keyword instead of returning all values at once.

```
def generate_numbers():    for number in range(5):        yield numberfor number in generate_numbers():    print(number)
```

Explanation:

A generator maintains its execution state between iterations. It produces one value at a time rather than storing the entire result in memory.

This is useful when processing large files, database records, API result sets, or streaming data.

### 8. What is the difference between an iterable, iterator, and generator?

Answer:

- Iterable: An object that can return an iterator, such as a list or tuple.
- Iterator: An object that implements `__iter__()` and `__next__()`.
- Generator: A convenient way to create an iterator using `yield`.

```
numbers = [1, 2, 3]iterator = iter(numbers)print(next(iterator))  # 1print(next(iterator))  # 2
```

Explanation:

Every generator is an iterator, but not every iterator is a generator. Iterators are useful for implementing custom sequential data processing.

### 9. What are context managers in Python?

Answer:

Context managers manage resources by ensuring setup and cleanup happen correctly. They are commonly used with the `with` statement.

```
with open("data.txt", "r") as file:    content = file.read()
```

Explanation:

The file is automatically closed after execution, even if an exception occurs.

You can implement a context manager using `__enter__()` and `__exit__()` or the `contextlib` module.

```
from contextlib import contextmanager@contextmanagerdef managed_resource():    print("Setup")    try:        yield    finally:        print("Cleanup")with managed_resource():    print("Working")
```

### 10. How does exception handling work in Python?

Answer:

Python uses `try`, `except`, `else`, and `finally` for exception handling.

```
try:    result = 10 / 0except ZeroDivisionError:    print("Cannot divide by zero")else:    print("Successful execution")finally:    print("Cleanup")
```

Explanation:

- `try`: Contains code that might fail.
- `except`: Handles expected exceptions.
- `else`: Runs when no exception occurs.
- `finally`: Runs whether an exception occurs or not.

In production applications, catch specific exceptions instead of using broad `except Exception` blocks everywhere. Log unexpected failures and avoid silently swallowing them.

### 11. What is the GIL in Python?

Answer:

The Global Interpreter Lock (GIL) in traditional CPython builds ensures that only one thread executes Python bytecode at a time within an interpreter.

Explanation:

This limits the benefits of Python threads for CPU-bound workloads. However, threads can still be useful for I/O-bound tasks because threads can make progress while other threads wait for network, filesystem, or other I/O operations.

For CPU-heavy workloads, multiprocessing or native libraries that release the GIL may be more appropriate. Free-threaded CPython builds also exist, so the traditional GIL explanation is not universal to every build.

### 12. What is the difference between multithreading, multiprocessing, and asyncio?

Answer:

| Approach        | Execution model                             | Best use case        |
| --------------- | ------------------------------------------- | -------------------- |
| Multithreading  | Multiple threads in one process             | I/O-bound operations |
| Multiprocessing | Multiple processes                          | CPU-bound operations |
| Asyncio         | Cooperative concurrency using an event loop | High-concurrency I/O |

Explanation:

For example:

- Use threads when waiting for multiple external APIs or blocking I/O operations.
- Use multiprocessing for CPU-heavy image processing or calculations.
- Use `asyncio` for handling many concurrent network operations without creating a separate thread for each task.

The choice depends on the workload, libraries, and operational complexity.

### 13. What are `async` and `await` in Python?

Answer:

`async` defines a coroutine function, while `await` pauses that coroutine until an awaitable operation completes, allowing the event loop to schedule other work.

```
import asyncioasync def fetch_data():    await asyncio.sleep(2)    return {"status": "success"}async def main():    result = await fetch_data()    print(result)asyncio.run(main())
```

Explanation:

Async programming improves concurrency for I/O-bound workloads. It does not automatically make CPU-intensive functions faster.

### 14. What happens when you call a blocking function inside an async function?

Answer:

A blocking function can block the event-loop thread, preventing other coroutines on that event loop from making progress.

Problematic example:

```
import timeasync def endpoint():    time.sleep(5)  # Blocks the event loop    return {"status": "done"}
```

Better approach:

```
import asyncioasync def endpoint():    await asyncio.sleep(5)    return {"status": "done"}
```

For unavoidable blocking I/O, consider `asyncio.to_thread()` or a suitable thread pool. For CPU-heavy work, use a process pool or background worker.

### 15. What are type hints in Python, and why are they useful?

Answer:

Type hints specify the expected types of variables, function parameters, and return values.

```
def calculate_total(price: float, quantity: int) -> float:    return price * quantity
```

Explanation:

They improve readability, IDE autocomplete, static analysis, and maintainability. Python does not automatically enforce ordinary type hints at runtime.

Tools such as MyPy and Pyright can perform static type checking. Pydantic can perform runtime validation when data is passed through a Pydantic model.

### 16. What are `*args` and `**kwargs`?

Answer:

- `*args` collects additional positional arguments into a tuple.
- `**kwargs` collects additional keyword arguments into a dictionary.

```
def create_user(name, *roles, **metadata):    return {        "name": name,        "roles": roles,        "metadata": metadata    }create_user(    "Alice",    "admin",    "editor",    department="Engineering")
```

Explanation:

These are useful for flexible APIs, decorators, wrappers, and forwarding arguments to other functions.

### 17. What is a lambda function?

Answer:

A lambda is a small anonymous function containing a single expression.

```
multiply = lambda x, y: x * yprint(multiply(5, 3))  # 15
```

Explanation:

Lambdas are useful for short callbacks and sorting keys.

```
users = [    {"name": "Alice", "age": 30},    {"name": "Bob", "age": 22}]users.sort(key=lambda user: user["age"])
```

For complex logic, a normal named function is usually more readable.

### 18. What is a list comprehension?

Answer:

A list comprehension is a concise way to create a list from an iterable, optionally applying conditions.

```
numbers = [1, 2, 3, 4, 5]squares = [x * x for x in numbers if x % 2 == 0]print(squares)  # [4, 16]
```

Explanation:

List comprehensions are convenient and often faster than equivalent Python-level loops. However, for very large datasets, generator expressions can save memory because they evaluate lazily.

### 19. How does memory management work in Python?

Answer:

Python manages memory automatically. CPython primarily uses reference counting and supplements it with a cyclic garbage collector to detect reference cycles.

Explanation:

When an object's reference count reaches zero, CPython can usually reclaim it immediately. Cyclic garbage collection handles groups of objects that reference one another but are otherwise unreachable.

For resource management, do not rely on garbage collection to close files, database connections, or network connections. Use context managers and explicit cleanup.

### 20. What is the difference between `__str__()` and `__repr__()`?

Answer:

- `__str__()` provides a human-readable representation.
- `__repr__()` provides a developer-oriented representation, ideally one that helps identify or recreate the object.

```
class User:    def __init__(self, name):        self.name = name    def __str__(self):        return self.name    def __repr__(self):        return f"User(name={self.name!r})"user = User("Alice")print(str(user))   # Aliceprint(repr(user))  # User(name='Alice')
```

Explanation:

`str()` is useful for user-facing output, while `repr()` is especially useful for debugging, logs, and interactive development.

## Section 2: Backend engineering and system design (21–40)

### 21. What is REST API architecture?

Answer:

REST (Representational State Transfer) is an architectural style for designing network-based APIs around resources.

Typical HTTP methods include:

| Method | Purpose                                   | Example             |
| ------ | ----------------------------------------- | ------------------- |
| GET    | Retrieve data                             | Get user            |
| POST   | Create a resource or trigger an operation | Create user         |
| PUT    | Replace a resource                        | Update full profile |
| PATCH  | Partially update a resource               | Update email        |
| DELETE | Delete a resource                         | Delete user         |

Explanation:

A REST API should use resource-oriented URLs, appropriate HTTP methods and status codes, stateless requests, and consistent representations.

For example:

```
GET /api/users/123
POST /api/users
PATCH /api/users/123
DELETE /api/users/123
```

### 22. What is the difference between PUT and PATCH?

Answer:

`PUT` generally replaces the target resource, whereas `PATCH` applies partial modifications.

Example:

Suppose a user has a name, email, and phone number.

A `PUT` request may provide the complete updated representation. A `PATCH` request might provide only the email field.

Explanation:

Both can be designed to be idempotent, but the exact semantics depend on the API implementation. PATCH is useful when clients should not need to submit every field for a small update.

### 23. What is idempotency in REST APIs?

Answer:

An operation is idempotent if repeating the same request produces the same intended effect as making it once.

Examples:

- GET: Idempotent.
- PUT: Usually idempotent.
- DELETE: Usually idempotent.
- POST: Not inherently idempotent.

Explanation:

Imagine a payment client sends a request, but the network times out before it receives the response. The client cannot know whether the payment was processed.

An idempotency key helps prevent duplicate processing:

```
POST /payments
Idempotency-Key: payment-12345
```

The server stores the key and the operation result so repeated requests can return the original result instead of charging the customer again.

### 24. What is the difference between authentication and authorization?

Answer:

- Authentication: Verifies who the user is.
- Authorization: Determines what the authenticated user is allowed to do.

Example:

A user logs in using an email and password. Authentication verifies their identity. Authorization checks whether they have permission to access an administrator-only API.

Explanation:

Authentication methods include sessions, JWTs, and OAuth-based flows. Authorization can be implemented through roles, permissions, ownership checks, or attribute-based policies.

### 25. What is JWT authentication?

Answer:

JWT (JSON Web Token) is a compact token format used to transfer signed claims between parties.

A JWT has three parts:

1. Header
2. Payload
3. Signature

```
header.payload.signature
```

Explanation:

After successful authentication, the server can issue a signed token containing claims such as user ID, role, and expiration time. The client sends it in subsequent requests:

```
Authorization: Bearer <token>
```

Important security considerations:

- Verify the signature and permitted algorithm.
- Validate expiration and relevant claims.
- Do not store passwords or sensitive secrets in the payload.
- Use HTTPS.
- Plan revocation and refresh-token handling.

A signed JWT is not automatically encrypted. Its payload can generally be decoded by whoever possesses it.

### 26. What is pagination, and what are its types?

Answer:

Pagination divides large result sets into smaller responses.

Common approaches:

Offset pagination:

```
GET /users?limit=20&offset=40
```

Page-based pagination:

```
GET /users?page=3&page_size=20
```

Cursor pagination:

```
GET /users?limit=20&cursor=eyJpZCI6MTAwfQ
```

Explanation:

Offset pagination is simple but may become slow for large offsets and can behave inconsistently while data changes. Cursor pagination is often more efficient and stable for large, frequently changing datasets, provided the cursor uses a suitable ordering key.

### 27. What is rate limiting?

Answer:

Rate limiting controls how many requests a client can make within a defined period.

For example, an API might allow 100 requests per minute per user.

Common algorithms:

- Fixed window counter
- Sliding window log
- Sliding window counter
- Token bucket
- Leaky bucket

Explanation:

Rate limiting protects APIs from abuse, accidental traffic spikes, and resource exhaustion.

For distributed applications, a shared store such as Redis can maintain counters across multiple API instances. Return HTTP `429 Too Many Requests` when a client exceeds its limit.

### 28. What is caching, and where can it be implemented?

Answer:

Caching stores frequently accessed data so future requests can retrieve it faster without repeating expensive work.

Caching can happen at several levels:

- Browser
- CDN
- Reverse proxy
- Application memory
- Redis or Memcached
- Database query or result cache

Example:

```
import jsonimport rediscache = redis.Redis(host="localhost", port=6379)def get_user(user_id):    key = f"user:{user_id}"    cached = cache.get(key)    if cached:        return json.loads(cached)    user = fetch_user_from_database(user_id)    cache.setex(key, 300, json.dumps(user))    return user
```

Explanation:

A cache improves latency and reduces database load, but introduces invalidation and consistency problems. Use TTLs, explicit invalidation, and suitable cache keys.

### 29. What are ACID properties in database transactions?

Answer:

ACID describes four properties of reliable database transactions:

- Atomicity: Either all operations succeed or none do.
- Consistency: A transaction preserves database constraints and invariants.
- Isolation: Concurrent transactions do not interfere in unacceptable ways.
- Durability: Committed changes survive failures according to the database's durability guarantees.

Example:

A bank transfer should debit one account and credit another in the same transaction. If the credit operation fails, the debit should not remain committed.

### 30. What are database isolation levels?

Answer:

Isolation levels control how concurrent transactions can observe each other's changes.

| Isolation level  | Main guarantee                                                            |
| ---------------- | ------------------------------------------------------------------------- |
| Read Uncommitted | May allow dirty reads                                                     |
| Read Committed   | Prevents dirty reads                                                      |
| Repeatable Read  | Provides stronger consistency for repeated reads                          |
| Serializable     | Strongest standard isolation; behaves as though transactions ran serially |

Explanation:

The anomalies addressed include dirty reads, non-repeatable reads, and phantom reads. Exact behavior varies by database implementation. PostgreSQL, for example, implements Repeatable Read using snapshot isolation.

Higher isolation can reduce concurrency or cause transactions to wait or abort, so choose the level based on business requirements.

### 31. What is a database index?

Answer:

An index is a data structure that helps the database find rows without scanning the entire table.

```
CREATE INDEX idx_users_email ON users(email);
```

Explanation:

Indexes improve lookup and filtering performance, but they consume storage and add overhead to inserts, updates, and deletes.

Index columns used frequently in filtering, joins, and sorting. Use query plans to verify whether indexes actually help.

### 32. What is the N+1 query problem?

Answer:

The N+1 problem occurs when an application executes one query to retrieve a collection and then an additional query for each item.

Example:

```
orders = Order.objects.all()for order in orders:    print(order.customer.name)
```

If there are 100 orders, the application might execute 101 database queries.

Django solution:

```
orders = Order.objects.select_related("customer")
```

Explanation:

Use eager loading to retrieve related data efficiently. In Django, `select_related()` is suitable for single-valued relationships, while `prefetch_related()` is useful for reverse and many-to-many relationships.

### 33. What is the difference between optimistic and pessimistic locking?

Answer:

- Optimistic locking: Assumes conflicts are uncommon and checks whether data changed before committing an update.
- Pessimistic locking: Locks records to prevent conflicting operations while a transaction is running.

Optimistic example:

A record has a `version` column. The update succeeds only if the version has not changed:

```
UPDATE products
SET stock = 10, version = version + 1
WHERE id = 1 AND version = 4;
```

Pessimistic example:

```
SELECT *
FROM products
WHERE id = 1
FOR UPDATE;
```

Explanation:

Optimistic locking works well when conflicts are rare. Pessimistic locking can be useful for highly contested resources, but excessive locking can reduce throughput and cause deadlocks.

### 34. What is the difference between SQL and NoSQL databases?

Answer:

| SQL                            | NoSQL                                                |
| ------------------------------ | ---------------------------------------------------- |
| Relational model               | Multiple data models                                 |
| Usually structured schema      | Often flexible schema                                |
| SQL query language             | Query interfaces vary                                |
| Strong relational capabilities | Often designed for specific scale or access patterns |

Examples:

- SQL: PostgreSQL, MySQL
- Document: MongoDB
- Key-value: Redis
- Wide-column: Cassandra

Explanation:

Choose based on access patterns, consistency needs, relationships, transactions, and scaling requirements. NoSQL does not automatically mean faster or more scalable.

### 35. What is database connection pooling?

Answer:

Connection pooling reuses established database connections rather than creating a new connection for every request.

Explanation:

Opening a database connection has overhead. A pool maintains a controlled number of reusable connections, improving efficiency and limiting pressure on the database.

In Python applications, connection pooling can be provided by drivers and database libraries. Pool size should be coordinated with the number of application workers and the database's connection limits.

### 36. How do you version REST APIs?

Answer:

API versioning allows an API to evolve without unexpectedly breaking existing clients.

Common approaches include:

```
/api/v1/users
/api/v2/users
```

Other approaches use headers or query parameters.

Explanation:

URL versioning is straightforward and easy to understand. When introducing a new version, document breaking changes, maintain compatibility for existing consumers, and define a deprecation strategy.

### 37. How do retries and exponential backoff work?

Answer:

Retries attempt an operation again after a temporary failure. Exponential backoff increases the delay between attempts.

Example:

```
Attempt 1: Immediately
Attempt 2: Wait 1 second
Attempt 3: Wait 2 seconds
Attempt 4: Wait 4 seconds
```

Explanation:

Add random jitter to avoid many clients retrying simultaneously. Retry only transient failures, impose a maximum number of attempts, and ensure operations are idempotent where possible.

Do not blindly retry permanent errors such as invalid input or authorization failures.

### 38. What is the circuit breaker pattern?

Answer:

A circuit breaker prevents repeated requests to a dependency that is failing.

It typically has three states:

- Closed: Requests are allowed.
- Open: Requests are rejected or fail fast.
- Half-open: A limited number of test requests are allowed.

Explanation:

Suppose your application calls an external payment service that is unavailable. Repeatedly waiting for that service can consume application threads and connections.

The circuit breaker temporarily stops calls, allowing your system to recover and protecting other components.

### 39. What is the difference between monolithic and microservices architecture?

Answer:

A monolith packages most application functionality into one deployable application. A microservices architecture divides functionality into independently deployable services that communicate through APIs or messaging.

Explanation:

Monoliths are often easier to develop and operate initially. Microservices can support independent deployment and scaling, but add network communication, service discovery, distributed tracing, data consistency, and operational complexity.

Do not split an application into microservices without a concrete organizational or technical reason.

### 40. What is observability in backend applications?

Answer:

Observability is the ability to understand a system's internal state from its external outputs.

Its three commonly discussed pillars are:

1. Logs: What happened?
2. Metrics: How frequently or how much did it happen?
3. Traces: Where did time go across a request's journey?

Explanation:

For a production API, useful monitoring includes request rate, error rate, latency percentiles, CPU and memory utilization, database performance, queue depth, and task failures.

Use correlation IDs or trace IDs to connect logs across services. This makes production debugging much easier.

## Section 3: FastAPI (41–58)

### 41. What is FastAPI, and why would you choose it over Flask or Django?

Answer:

FastAPI is a modern Python web framework used to build APIs. It is based on Starlette for web functionality and Pydantic for data validation and serialization.

Key advantages:

- Automatic request validation.
- Automatic OpenAPI and Swagger documentation.
- Native asynchronous programming support.
- Dependency injection.
- Type-hint-based development.
- Good performance for I/O-heavy APIs.

Explanation:

Choose FastAPI when building API-first applications, asynchronous services, or microservices. Django is often a better choice when you need a full-featured framework with an ORM, admin interface, authentication, and many built-in capabilities.

### 42. What is the difference between WSGI and ASGI?

Answer:

- WSGI: Web Server Gateway Interface, traditionally used for synchronous Python web applications.
- ASGI: Asynchronous Server Gateway Interface, supports asynchronous requests, WebSockets, and long-lived connections.

Explanation:

Traditional Django deployments commonly use WSGI servers such as Gunicorn. FastAPI typically runs using an ASGI server such as Uvicorn.

ASGI enables asynchronous request handling, but actual performance depends on the application, its dependencies, and the workload.

### 43. What is the difference between `def` and `async def` endpoints in FastAPI?

Answer:

`async def` defines an asynchronous endpoint, while `def` defines a synchronous endpoint.

```
from fastapi import FastAPIimport asyncioapp = FastAPI()@app.get("/async")async def async_endpoint():    await asyncio.sleep(1)    return {"message": "Async response"}@app.get("/sync")def sync_endpoint():    return {"message": "Sync response"}
```

Explanation:

FastAPI runs synchronous path operations in a thread pool, so they do not directly block the event loop. Asynchronous endpoints are useful when their dependencies support non-blocking I/O.

Do not use `async def` merely because it looks modern. Calling blocking database, filesystem, or network functions directly inside an asynchronous endpoint can block the event loop.

### 44. What is dependency injection in FastAPI?

Answer:

Dependency injection allows an endpoint to receive reusable components or services without constructing them directly.

FastAPI provides the `Depends()` function.

```
from fastapi import FastAPI, Dependsapp = FastAPI()def get_current_user():    return {"id": 1, "name": "Alice"}@app.get("/profile")def get_profile(user=Depends(get_current_user)):    return user
```

Explanation:

Dependencies are useful for:

- Authentication.
- Database sessions.
- Permission checks.
- Shared business logic.
- Configuration.
- Reusable service objects.

FastAPI normally caches the result of a dependency within the same request, unless configured otherwise.

### 45. What is middleware in FastAPI?

Answer:

Middleware is code that executes around request handling. It can inspect or modify incoming requests and outgoing responses.

```
from fastapi import FastAPI, Requestimport timeapp = FastAPI()@app.middleware("http")async def log_request(request: Request, call_next):    start = time.perf_counter()    response = await call_next(request)    duration = time.perf_counter() - start    print(f"{request.method} {request.url.path}: {duration:.3f}s")    return response
```

Explanation:

Common use cases include request logging, timing, correlation IDs, security headers, and CORS handling.

Middleware should remain lightweight because it can run on every request.

### 46. How does request validation work in FastAPI?

Answer:

FastAPI uses Pydantic models and type annotations to validate incoming request data.

```
from pydantic import BaseModel, EmailStr, Fieldclass UserCreate(BaseModel):    name: str = Field(min_length=2, max_length=50)    email: EmailStr    age: int = Field(ge=18)@app.post("/users")async def create_user(user: UserCreate):    return user
```

Explanation:

FastAPI parses the request, validates its fields, and provides the application with structured data.

Invalid input normally results in a `422 Unprocessable Entity` response with validation details.

This reduces repetitive manual validation code.

### 47. What is the purpose of `response_model` in FastAPI?

Answer:

`response_model` defines the expected structure of an API response.

```
from pydantic import BaseModelclass UserResponse(BaseModel):    id: int    name: str@app.get("/users/{user_id}", response_model=UserResponse)async def get_user(user_id: int):    return {        "id": user_id,        "name": "Alice",        "password": "secret"    }
```

Explanation:

FastAPI validates and serializes the response using the declared model. Fields not included in the response model are normally excluded from the output.

This is important for preventing accidental exposure of sensitive database fields.

### 48. How do you handle application startup and shutdown in FastAPI?

Answer:

Use the application lifespan context manager to initialize and clean up shared resources.

```
from contextlib import asynccontextmanagerfrom fastapi import FastAPI@asynccontextmanagerasync def lifespan(app: FastAPI):    app.state.ready = True    print("Application started")    yield    app.state.ready = False    print("Application shutting down")app = FastAPI(lifespan=lifespan)
```

Explanation:

Use lifespan management for resources such as database clients, Redis connections, model instances, and application-level connection pools.

The cleanup section runs during application shutdown.

### 49. What is the difference between FastAPI BackgroundTasks and Celery?

Answer:

FastAPI `BackgroundTasks` executes background work after a response has been sent, within the application process.

Celery distributes tasks to independent worker processes through a message broker.

| Feature               | BackgroundTasks                  | Celery              |
| --------------------- | -------------------------------- | ------------------- |
| Setup                 | Simple                           | More infrastructure |
| Execution             | Application process              | Separate workers    |
| Distributed execution | No built-in distributed queue    | Yes                 |
| Retries               | No built-in durable retry system | Supported           |
| Task scheduling       | No built-in scheduler            | Celery Beat         |
| Long-running work     | Generally unsuitable             | Suitable            |

Explanation:

Use BackgroundTasks for small tasks such as lightweight logging or non-critical notifications.

Use Celery for long-running reports, large bulk operations, scheduled jobs, retryable tasks, and distributed workloads.

### 50. How do you handle exceptions globally in FastAPI?

Answer:

FastAPI allows you to register custom exception handlers.

```
from fastapi import FastAPI, HTTPException, Requestfrom fastapi.responses import JSONResponseapp = FastAPI()class UserNotFound(Exception):    pass@app.exception_handler(UserNotFound)async def user_not_found_handler(    request: Request,    exc: UserNotFound):    return JSONResponse(        status_code=404,        content={"detail": "User not found"}    )
```

Explanation:

Centralized exception handling creates consistent API responses and prevents repetitive error-handling code.

Use specific exception classes for expected business errors. Log unexpected exceptions with enough context to investigate them without exposing internal details to API clients.

### 51. How do you implement authentication in FastAPI?

Answer:

FastAPI provides security utilities such as `OAuth2PasswordBearer` for extracting bearer tokens from requests.

```
from fastapi import Dependsfrom fastapi.security import OAuth2PasswordBeareroauth2_scheme = OAuth2PasswordBearer(    tokenUrl="/token")@app.get("/profile")async def profile(    token: str = Depends(oauth2_scheme)):    # Verify token and retrieve user here    return {"message": "Authenticated"}
```

Explanation:

`OAuth2PasswordBearer` extracts the token and integrates the security scheme into OpenAPI documentation. It does not validate the JWT or authenticate the user by itself.

You must separately verify the token signature, expiration, issuer or audience where appropriate, and user permissions.

### 52. How do you handle file uploads in FastAPI?

Answer:

FastAPI supports file uploads through `UploadFile` and `File`.

```
from fastapi import FastAPI, UploadFile, Fileapp = FastAPI()@app.post("/upload")async def upload_file(    file: UploadFile = File(...)):    content = await file.read()    return {        "filename": file.filename,        "size": len(content)    }
```

Explanation:

`UploadFile` uses a spooled temporary file, making it more suitable than reading the entire upload directly into memory for many large-file use cases.

In production, validate file size, extension, actual content type, and permissions. For very large files, stream to object storage rather than loading the complete file into application memory.

### 53. What is StreamingResponse in FastAPI?

Answer:

`StreamingResponse` sends response data incrementally instead of waiting for the complete response to be generated.

```
from fastapi.responses import StreamingResponseasync def generate_data():    for i in range(5):        yield f"Data chunk {i}\n"@app.get("/stream")async def stream():    return StreamingResponse(        generate_data(),        media_type="text/plain"    )
```

Explanation:

Streaming is useful for:

- Large file downloads.
- LLM-generated responses.
- Server-sent events.
- Incremental data processing.

It reduces the need to buffer the entire response in memory. The generator should cooperate with the event loop and handle client disconnects appropriately.

### 54. How do WebSockets work in FastAPI?

Answer:

WebSockets provide a persistent, bidirectional communication channel between clients and servers.

```
from fastapi import WebSocket@app.websocket("/ws")async def websocket_endpoint(websocket: WebSocket):    await websocket.accept()    try:        while True:            message = await websocket.receive_text()            await websocket.send_text(f"Received: {message}")    except Exception:        await websocket.close()
```

Explanation:

Unlike ordinary HTTP request-response communication, WebSockets allow either side to send messages at any time.

Common applications include live dashboards, chat applications, notifications, and token-by-token AI response streaming.

For production systems, handle authentication, disconnections, connection limits, and multi-instance message distribution.

### 55. How does concurrency work in FastAPI?

Answer:

FastAPI uses ASGI and an event loop to support concurrent request handling.

Explanation:

When an asynchronous endpoint awaits a non-blocking network or database operation, the event loop can run other coroutines while that operation is pending.

However, concurrency is not equivalent to CPU parallelism. CPU-heavy work can block the event loop and should generally be moved to process workers or external task workers.

Production throughput also depends on the number of server workers, connection pools, external services, and resource limits.

### 56. How do you test FastAPI applications?

Answer:

FastAPI provides `TestClient`, which can be used with pytest to test application endpoints.

```
from fastapi.testclient import TestClientclient = TestClient(app)def test_home():    response = client.get("/")    assert response.status_code == 200
```

Explanation:

Use:

- Unit tests for business logic.
- API tests for endpoints and response validation.
- Integration tests for databases, Redis, and other dependencies.
- End-to-end tests for complete workflows.

Use dependency overrides to replace real database connections or external services with test implementations.

### 57. How does FastAPI generate Swagger documentation?

Answer:

FastAPI automatically generates an OpenAPI schema from its routes, type annotations, request models, response models, and security declarations.

By default:

```
/docs      -> Swagger UI
/redoc     -> ReDoc
/openapi.json -> OpenAPI schema
```

Explanation:

This helps frontend developers and API consumers understand endpoint parameters, request bodies, response structures, and authentication requirements.

You can customize operation descriptions, tags, response definitions, and the documentation URLs.

### 58. How do you manage database sessions in FastAPI?

Answer:

A common approach is to create a database session dependency and yield a session for each request.

Example using SQLAlchemy:

```
from sqlalchemy import create_enginefrom sqlalchemy.orm import sessionmakerengine = create_engine(DATABASE_URL)SessionLocal = sessionmaker(    bind=engine,    autocommit=False,    autoflush=False)def get_db():    db = SessionLocal()    try:        yield db    finally:        db.close()@app.get("/users")def get_users(db=Depends(get_db)):    return db.query(User).all()
```

Explanation:

The dependency creates a session, makes it available to the endpoint, and closes it after request processing.

For production applications, also consider transaction boundaries, connection pooling, rollback behavior, and whether your SQLAlchemy configuration is synchronous or asynchronous.

## Section 4: Django and Django REST Framework (59–78)

### 59. What is Django, and what is its MVT architecture?

Answer:

Django is a high-level Python web framework that provides an ORM, authentication, admin interface, middleware, forms, and security features.

MVT stands for:

- Model: Defines data structures and database interactions.
- View: Handles request processing and application logic.
- Template: Handles presentation and HTML rendering.

Explanation:

Django follows an architectural pattern similar to MVC, although its terminology differs.

In a REST API, Django REST Framework serializers and views commonly handle the conversion and processing of API data.

### 60. Explain the Django request-response lifecycle.

Answer:

A typical Django request passes through the following stages:

1. Web server receives the request.
2. Django initializes the request.
3. Request middleware executes.
4. URL resolver identifies the matching view.
5. The view executes application logic.
6. The view returns an HTTP response.
7. Response middleware processes the response.
8. The server sends the response to the client.

Explanation:

Middleware can modify requests and responses or reject a request before it reaches a view.

Understanding this lifecycle helps when debugging authentication, permissions, logging, and request-processing issues.

### 61. What is Django ORM?

Answer:

Django ORM allows developers to interact with databases using Python objects instead of writing SQL for every operation.

```
class User(models.Model):    name = models.CharField(max_length=100)    email = models.EmailField(unique=True)users = User.objects.filter(name="Alice")
```

Explanation:

Django translates QuerySets into SQL queries. It supports filtering, joins, aggregation, relationships, transactions, and migrations.

Raw SQL is also available when complex queries or database-specific functionality make it useful.

### 62. What is lazy evaluation in Django QuerySets?

Answer:

Django QuerySets are lazy. Constructing a QuerySet generally does not execute the SQL query immediately.

```
users = User.objects.filter(is_active=True)
```

The query is generally executed when the QuerySet is evaluated, for example:

```
list(users)
```

Other evaluation triggers include iteration, `len()`, boolean checks, and accessing individual results.

Explanation:

Lazy evaluation lets developers build and refine queries before database execution.

Be careful when evaluating the same QuerySet repeatedly or accidentally triggering database queries inside loops.

### 63. What is the difference between `select_related()` and `prefetch_related()`?

Answer:

Both methods reduce database queries by fetching related objects efficiently.

`select_related()`:

Uses SQL joins and is intended for foreign-key and one-to-one relationships.

```
orders = Order.objects.select_related("customer")
```

`prefetch_related()`:

Runs additional queries and combines results in Python. It works with many-to-many and reverse relationships as well.

```
users = User.objects.prefetch_related("groups")
```

Explanation:

Use `select_related()` when joining single related objects is appropriate. Use `prefetch_related()` when fetching collections or relationships that cannot efficiently be handled through a single SQL join.

### 64. What are F expressions in Django?

Answer:

F expressions allow database fields to be referenced directly in database operations without first retrieving their values into Python.

```
from django.db.models import FProduct.objects.filter(    stock__gt=0).update(    stock=F("stock") - 1)
```

Explanation:

This performs the calculation in the database and avoids a common read-modify-write race condition.

F expressions are useful for counters, inventory updates, conditional calculations, and database-side comparisons.

### 65. How do you handle transactions in Django?

Answer:

Django provides `transaction.atomic()` to execute database operations within a transaction.

```
from django.db import transactionwith transaction.atomic():    account1.balance -= 100    account1.save()    account2.balance += 100    account2.save()
```

Explanation:

If an exception causes the transaction to roll back, changes within the transaction are not committed.

This is important for operations that must remain consistent, such as account transfers, order creation, and inventory updates.

### 66. What is Django middleware?

Answer:

Django middleware is a processing layer that executes during the request-response lifecycle.

```
class CustomMiddleware:    def __init__(self, get_response):        self.get_response = get_response    def __call__(self, request):        print("Before view")        response = self.get_response(request)        print("After view")        return response
```

Explanation:

Middleware is useful for request logging, authentication-related processing, security headers, request tracking, and other cross-cutting concerns.

Middleware ordering matters because each layer wraps the next part of the request-response process.

### 67. What are Django signals?

Answer:

Signals allow components to be notified when particular events happen in Django.

For example, a signal can run after a model instance is saved.

```
from django.db.models.signals import post_savefrom django.dispatch import receiver@receiver(post_save, sender=User)def user_created(sender, instance, created, **kwargs):    if created:        print("New user created")
```

Explanation:

Signals can be useful when different components need to react to model events.

However, overusing them makes execution flow difficult to understand. For important business operations, explicit service-layer calls are often clearer. Also, `post_save` does not mean the enclosing transaction has definitely committed; use `transaction.on_commit()` when a side effect should run only after commit.

### 68. What are Django model managers and QuerySets?

Answer:

A model manager provides the interface through which database queries are constructed. A QuerySet represents a collection of database queries or results.

```
class ActiveUserManager(models.Manager):    def get_queryset(self):        return super().get_queryset().filter(            is_active=True        )class User(models.Model):    name = models.CharField(max_length=100)    is_active = models.BooleanField(default=True)    objects = models.Manager()    active_users = ActiveUserManager()
```

Usage:

```
User.active_users.all()
```

Explanation:

Custom managers and QuerySets help centralize reusable query logic and keep database filtering consistent.

### 69. What are Django migrations?

Answer:

Migrations manage changes to database schemas as application models evolve.

Commands:

```
python manage.py makemigrations
python manage.py migrate
python manage.py showmigrations
```

Explanation:

`makemigrations` generates migration files from model changes. `migrate` applies them to the database.

In production, review migrations before deploying. Large table changes and data migrations may need special care to avoid locks, downtime, or inconsistent application versions.

### 70. What is the difference between model validation and serializer validation?

Answer:

Model validation checks data according to model-level rules, while serializer validation checks incoming or outgoing API data and API-specific requirements.

Django model example:

```
class Product(models.Model):    name = models.CharField(max_length=100)    price = models.DecimalField(        max_digits=10,        decimal_places=2    )
```

DRF serializer example:

```
from rest_framework import serializersclass ProductSerializer(serializers.ModelSerializer):    class Meta:        model = Product        fields = ["name", "price"]    def validate_price(self, value):        if value < 0:            raise serializers.ValidationError(                "Price cannot be negative"            )        return value
```

Explanation:

Serializer validation is useful for request-specific rules. Model constraints and database constraints should also protect important business invariants because not every database write necessarily passes through a serializer.

### 71. What are serializers in Django REST Framework?

Answer:

Serializers convert complex objects such as Django model instances into JSON-compatible representations and validate incoming data.

```
class UserSerializer(serializers.ModelSerializer):    class Meta:        model = User        fields = ["id", "name", "email"]
```

Explanation:

Serializers handle validation, representation, deserialization, and, when configured, object creation or updating.

They help maintain a consistent API contract between backend and frontend.

### 72. What is the difference between APIView and ViewSet in DRF?

Answer:

`APIView` gives explicit control over individual HTTP methods, while `ViewSet` groups related actions for a resource.

APIView:

```
class UserAPIView(APIView):    def get(self, request):        return Response({"message": "Users"})
```

ViewSet:

```
class UserViewSet(ModelViewSet):    queryset = User.objects.all()    serializer_class = UserSerializer
```

Explanation:

Use APIView for custom workflows or fine-grained endpoint control. Use ViewSets and routers for standard resource operations such as listing, retrieving, creating, updating, and deleting records.

### 73. How does authentication and permission handling work in DRF?

Answer:

Authentication identifies the requesting user. Permission classes determine whether that user can perform an operation.

```
from rest_framework.permissions import IsAuthenticatedfrom rest_framework.views import APIViewclass ProfileView(APIView):    permission_classes = [IsAuthenticated]    def get(self, request):        return Response({            "user": request.user.username        })
```

Explanation:

DRF supports built-in permissions and custom permission classes.

For example, an authenticated user might be permitted to read their own profile but not update another user's profile. Always implement object-level ownership checks where needed.

### 74. What is throttling in Django REST Framework?

Answer:

Throttling restricts API request rates for users or anonymous clients.

DRF supports built-in options such as:

- `AnonRateThrottle`
- `UserRateThrottle`
- `ScopedRateThrottle`

Example:

```
REST_FRAMEWORK = {    "DEFAULT_THROTTLE_CLASSES": [        "rest_framework.throttling.UserRateThrottle",    ],    "DEFAULT_THROTTLE_RATES": {        "user": "100/hour",    }}
```

Explanation:

Throttling helps reduce accidental overuse and abusive traffic. DRF's built-in throttling is not intended to provide strong protection against sophisticated denial-of-service attacks; use infrastructure-level rate limiting as well when needed.

### 75. How do you implement pagination in Django REST Framework?

Answer:

DRF supports several built-in pagination styles.

```
REST_FRAMEWORK = {    "DEFAULT_PAGINATION_CLASS":        "rest_framework.pagination.PageNumberPagination",    "PAGE_SIZE": 20}
```

Explanation:

Common options include:

- PageNumberPagination
- LimitOffsetPagination
- CursorPagination

Cursor pagination is useful for large datasets where stable ordering is important. Ensure the ordering fields are appropriate and consistently indexed.

### 76. How would you implement multi-tenancy in Django?

Answer:

Multi-tenancy allows a single application to serve multiple customers while isolating each customer's data.

Common approaches:

1. Shared database and shared schema: Add a `tenant_id` to tenant-owned records.
2. Shared database with separate schemas: Use a separate database schema per tenant.
3. Separate databases: Each tenant has an independent database.

Explanation:

For shared-table tenancy, every tenant-specific query must enforce the tenant boundary.

```
documents = Document.objects.filter(    tenant_id=request.tenant.id)
```

In production, tenant isolation should be enforced consistently in the data-access layer, permissions, background tasks, and administrative operations. Never rely solely on frontend filtering.

### 77. How do you implement caching in Django?

Answer:

Django offers a caching framework that supports multiple backends, including Redis and Memcached.

Example:

```
from django.core.cache import cachedef get_product(product_id):    key = f"product:{product_id}"    product = cache.get(key)    if product is None:        product = Product.objects.get(            id=product_id        )        cache.set(key, product, timeout=300)    return product
```

Explanation:

Django supports per-site, per-view, template-fragment, and low-level caching.

For distributed deployments, a shared cache such as Redis is generally more useful than process-local memory. Invalidation, TTLs, and consistency need to be considered.

### 78. What security features does Django provide?

Answer:

Django includes several built-in security protections:

- CSRF protection.
- Template auto-escaping to reduce XSS risks.
- ORM parameterization to help prevent SQL injection.
- Password hashing.
- Secure cookie options.
- Clickjacking protection.
- Security middleware.

Explanation:

These protections reduce common web vulnerabilities but do not make an application automatically secure.

For production deployments:

- Set `DEBUG = False`.
- Configure `ALLOWED_HOSTS`.
- Use HTTPS.
- Protect secrets.
- Validate and authorize uploaded files.
- Restrict database permissions.
- Keep dependencies updated.
- Apply object-level access controls.

## Section 5: Celery and distributed task processing (79–94)

### 79. What is Celery, and how does it work?

Answer:

Celery is a distributed task queue used to execute background tasks asynchronously.

Its main components are:

1. Producer: Sends tasks to the queue.
2. Broker: Stores and delivers task messages.
3. Worker: Receives and executes tasks.
4. Result backend: Optionally stores task results and states.
5. Celery Beat: Schedules periodic tasks.

Example architecture:

Django / FastAPI application

Sends a task

Redis / RabbitMQ

Message broker and task queue

Celery workers

Execute background tasks

Result backend

Optional task state and result storage

Explanation:

Celery is useful for operations that should not keep an API request waiting, such as report generation, bulk processing, email notifications, external integrations, and data synchronization.

### 80. What is the difference between `delay()` and `apply_async()`?

Answer:

Both methods send tasks for asynchronous execution.

Using delay:

```
send_email.delay(    "user@example.com")
```

Using apply_async:

```
send_email.apply_async(    args=["user@example.com"],    countdown=30,    queue="email_queue")
```

Explanation:

`delay()` is a convenient shortcut for basic task execution.

`apply_async()` provides more control over execution options, including countdown, ETA, queue, routing key, and expiration.

### 81. How do you implement retry logic in Celery?

Answer:

Celery supports retrying tasks using `self.retry()` or task-level automatic retry configuration.

```
from celery import shared_task@shared_task(bind=True, max_retries=3)def fetch_external_data(self):    try:        return call_external_api()    except TemporaryAPIError as exc:        raise self.retry(            exc=exc,            countdown=30        )
```

Automatic retry example:

```
@shared_task(    autoretry_for=(TemporaryAPIError,),    retry_kwargs={"max_retries": 3},    retry_backoff=True)def process_data():    call_external_api()
```

Explanation:

Retry logic is helpful when dealing with temporary network failures, unavailable external services, or intermittent database issues.

Use exponential backoff and jitter, distinguish permanent from temporary errors, and make tasks idempotent to prevent duplicate side effects.

### 82. What is the difference between `acks_late` and the default task acknowledgment behavior?

Answer:

By default, Celery acknowledges a task before the task has finished executing.

With late acknowledgment:

```
@shared_task(acks_late=True)def process_report(report_id):    generate_report(report_id)
```

The task is acknowledged after execution rather than before it.

Explanation:

Late acknowledgment can help make tasks available for redelivery if a worker fails during execution.

However, it can also result in a task executing more than once. Some worker-loss scenarios depend on configuration and broker behavior. Late acknowledgment is not a substitute for idempotent task design.

### 83. Why should Celery tasks be idempotent?

Answer:

An idempotent task produces the same intended final result when executed multiple times.

Example of a risky task:

```
@shared_taskdef increment_balance(user_id):    user = User.objects.get(id=user_id)    user.balance += 100    user.save()
```

If the task executes twice, the balance increases twice.

Better approach:

Use a unique transaction or operation ID and enforce uniqueness at the database level.

```
@shared_taskdef process_payment(payment_id):    payment = Payment.objects.get(        id=payment_id    )    if payment.status == "completed":        return    # Process using a transactional,    # duplicate-safe operation.
```

Explanation:

Celery applications must account for retries, worker failures, duplicate delivery, and uncertain outcomes. Idempotency is especially important for payments, inventory updates, and external API operations.

### 84. What are task time limits in Celery?

Answer:

Celery supports soft and hard task time limits.

- Soft time limit: Raises a catchable timeout exception inside the task.
- Hard time limit: Terminates the task process when the maximum execution time is exceeded.

```
@shared_task(    soft_time_limit=60,    time_limit=90)def generate_report():    perform_report_generation()
```

Explanation:

Timeouts prevent tasks from running indefinitely and consuming worker resources.

Use soft timeouts when cleanup or graceful cancellation is possible. Hard termination can interrupt an operation, so design the task to recover safely from partial execution.

### 85. How do you manage multiple queues in Celery?

Answer:

Celery supports task routing to different queues based on task type or workload.

```
app.conf.task_routes = {    "tasks.send_email": {        "queue": "email"    },    "tasks.generate_report": {        "queue": "reports"    }}
```

Workers can consume specific queues:

```
celery -A app worker -Q email
```

```
celery -A app worker -Q reports
```

Explanation:

Separate queues allow you to isolate workloads.

For example, long-running report generation should not consume all the worker capacity needed for short email or webhook tasks.

You can also scale different worker groups independently.

### 86. What is Celery Beat?

Answer:

Celery Beat is a scheduler that periodically sends tasks to Celery queues.

```
from celery.schedules import crontabapp.conf.beat_schedule = {    "daily-cleanup": {        "task": "tasks.cleanup",        "schedule": crontab(hour=2, minute=0),    }}
```

Explanation:

It is useful for scheduled reports, database cleanup, recurring notifications, synchronization jobs, and periodic maintenance.

Run a single active scheduler for a given schedule unless you have deliberately designed coordination between multiple schedulers. Also make scheduled tasks idempotent.

### 87. What is a Celery result backend?

Answer:

A result backend stores task states and, optionally, task return values.

Common backends include:

- Redis
- Database
- Memcached
- Other supported storage systems

Explanation:

A task's state might be `PENDING`, `STARTED`, `SUCCESS`, or `FAILURE`, among other states.

The result backend is separate from the message broker, although Redis can be configured for both roles.

For high-volume applications, storing every task result indefinitely can create unnecessary storage overhead. Configure result expiration and retain results only when required.

### 88. What are Celery chains, groups, and chords?

Answer:

These are Celery Canvas primitives for composing distributed workflows.

Chain: Executes tasks sequentially.

```
from celery import chainworkflow = chain(    task_one.s(),    task_two.s(),    task_three.s())workflow.apply_async()
```

Group: Executes multiple tasks in parallel.

```
from celery import groupgroup(    process_file.s(1),    process_file.s(2),    process_file.s(3)).apply_async()
```

Chord: Executes a callback after a group completes.

```
from celery import chordchord(    [        process_file.s(1),        process_file.s(2)    ],    combine_results.s()).apply_async()
```

Explanation:

These primitives are useful for multi-step workflows, parallel file processing, report generation, and data aggregation.

Understand how failure handling, result-backend configuration, and callback execution behave before using chords in production.

### 89. What is the difference between Celery worker concurrency options?

Answer:

Celery supports different worker execution pools.

Common options include:

- Prefork: Multiple worker processes.
- Threads: Multiple threads.
- Eventlet: Cooperative concurrency.
- Gevent: Greenlet-based concurrency.
- Solo: Executes tasks sequentially.

Explanation:

Prefork is a common default and works well for many CPU-bound or mixed workloads.

Threads and cooperative pools can work well for suitable I/O-heavy workloads, provided the libraries used are compatible. Choose pool size based on CPU, memory, external connections, and task behavior.

### 90. How do you prevent duplicate Celery tasks?

Answer:

There is no single universal solution. Common techniques include:

- Idempotency keys.
- Database unique constraints.
- Distributed locks.
- Task state tracking.
- Atomic database updates.
- Deduplication at the consumer.

Example:

A database constraint can enforce that only one report exists for a particular tenant and reporting period.

```
class Report(models.Model):    tenant_id = models.IntegerField()    period = models.CharField(max_length=20)    class Meta:        constraints = [            models.UniqueConstraint(                fields=["tenant_id", "period"],                name="unique_tenant_report_period"            )        ]
```

Explanation:

A Redis lock can help prevent concurrent execution, but locks require careful handling of expiration, ownership, and release. Database constraints and idempotency are usually important safeguards even when locks are used.

### 91. How do you monitor Celery workers and tasks?

Answer:

Celery applications can be monitored through:

- Flower.
- Celery worker inspection commands.
- Broker queue metrics.
- Application logs.
- Prometheus and Grafana integrations.
- Cloud monitoring services.

Explanation:

Monitor the following:

- Queue depth.
- Task execution duration.
- Task failure rate.
- Retry count.
- Worker availability.
- Memory and CPU consumption.
- Oldest message age.

A growing queue depth can indicate that workers cannot process tasks as quickly as the application is producing them.

### 92. How do you ensure a Celery task runs only after a Django transaction commits?

Answer:

Use Django's `transaction.on_commit()`.

```
from django.db import transactionwith transaction.atomic():    order = Order.objects.create(        customer_id=10    )    transaction.on_commit(        lambda: process_order.delay(order.id)    )
```

Explanation:

Without this mechanism, Celery might start processing the task before the transaction commits. The worker could then fail to find the newly created record.

`on_commit()` schedules the callback only after a successful transaction commit.

### 93. Why should you avoid passing large objects to Celery tasks?

Answer:

Pass identifiers or small serializable payloads instead of large Python objects.

Problematic:

```
process_report.delay(large_dataframe)
```

Better:

```
process_report.delay(report_id)
```

The worker retrieves the required data from the database or object storage.

Explanation:

Large messages increase broker memory usage, network overhead, serialization costs, and task latency.

They also create tighter coupling between producers and consumers. Prefer JSON-compatible task arguments and avoid sending database connections, open files, or complex in-memory objects.

### 94. How do you choose between Redis and RabbitMQ as a Celery broker?

Answer:

Both can be used as Celery brokers, but they have different strengths.

| Redis                                         | RabbitMQ                                       |
| --------------------------------------------- | ---------------------------------------------- |
| In-memory data store                          | Dedicated message broker                       |
| Simple setup                                  | Rich routing capabilities                      |
| Also useful for caching                       | Strong messaging features                      |
| Good for many straightforward queue workloads | Often preferred for complex messaging patterns |

Explanation:

Redis is attractive when an application already uses it and needs a straightforward queue.

RabbitMQ offers advanced exchanges, routing, acknowledgments, and queue-management capabilities. The right choice depends on delivery guarantees, workload characteristics, operational expertise, and broker configuration.

## Section 6: AWS cloud services (95–112)

### 95. What is IAM in AWS?

Answer:

AWS Identity and Access Management (IAM) controls who can access AWS resources and what actions they can perform.

Important concepts:

- Users: Identities for people or applications.
- Groups: Collections of IAM users.
- Roles: Identities that provide temporary credentials.
- Policies: JSON documents defining permissions.

Example IAM policy:

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject"],
      "Resource": "arn:aws:s3:::my-bucket/*"
    }
  ]
}
```

Explanation:

Use IAM roles for applications running on EC2, ECS, and Lambda rather than embedding long-lived AWS access keys in application code.

Follow the principle of least privilege: grant only the permissions needed for a task.

### 96. What is the difference between EC2, ECS, and Lambda?

Answer:

| Service | Purpose                 | Infrastructure management                        |
| ------- | ----------------------- | ------------------------------------------------ |
| EC2     | Virtual machines        | You manage the instances                         |
| ECS     | Container orchestration | AWS manages orchestration; compute choice varies |
| Lambda  | Serverless functions    | AWS manages the compute infrastructure           |

Explanation:

- EC2 gives you control over the operating system and runtime.
- ECS runs containerized applications and is useful for backend services and Celery workers.
- Lambda executes event-driven functions without requiring you to maintain long-running servers.

Choose based on execution duration, scaling requirements, control, cost, and operational needs.

### 97. What is AWS Fargate?

Answer:

AWS Fargate is a serverless compute engine for running containers with ECS or EKS.

Explanation:

With Fargate, you define the container image, CPU, memory, networking, and other configuration. AWS manages the underlying compute infrastructure.

For example, you can run:

- Django or FastAPI containers.
- Celery workers.
- Scheduled container tasks.
- API background processing services.

It removes the need to manage EC2 instances for those container workloads, though you still manage the container, deployment, security, and application configuration.

### 98. What is Amazon ECR?

Answer:

Amazon Elastic Container Registry (ECR) is a managed container image registry.

Explanation:

You build Docker images, push them to ECR, and deploy those images using services such as ECS, EKS, or other container platforms.

Example:

```
docker build -t backend-app .

aws ecr get-login-password \
  --region ap-south-1 \
| docker login \
  --username AWS \
  --password-stdin \
  <account-id>.dkr.ecr.ap-south-1.amazonaws.com

docker push <account-id>.dkr.ecr.ap-south-1.amazonaws.com/backend-app:latest
```

In production, prefer immutable version tags or image digests over relying on `latest`.

### 99. What is Amazon S3?

Answer:

Amazon Simple Storage Service (S3) is an object storage service for storing files and other objects.

Common use cases include:

- Documents.
- Images and videos.
- Backups.
- Application logs.
- Reports.
- Data lakes.
- ML datasets.

Explanation:

S3 stores objects in buckets. Objects can be accessed through APIs and SDKs, subject to IAM permissions and bucket policies.

Useful features include:

- Versioning.
- Lifecycle policies.
- Server-side encryption.
- Replication.
- Event notifications.
- Storage classes.

For applications generating PDF reports, for example, you can store the generated files in S3 and return a controlled download link.

### 100. What is the difference between RDS and DynamoDB?

Answer:

| Amazon RDS                   | Amazon DynamoDB                        |
| ---------------------------- | -------------------------------------- |
| Managed relational databases | Managed NoSQL database                 |
| Tables and relationships     | Key-value and document data models     |
| SQL querying                 | Key-based and supported query patterns |
| Relational transactions      | Supported transactional operations     |
| Schema-oriented              | Flexible item attributes               |

Explanation:

RDS is appropriate for applications with relational data, joins, complex SQL queries, and traditional transactional requirements.

DynamoDB is useful for predictable access patterns, very high scale, and low-latency key-based workloads.

DynamoDB data modeling should start with access patterns rather than assuming it works like a relational database.

### 101. What is the difference between SQS and SNS?

Answer:

- SQS: Message queue service used to decouple producers and consumers.
- SNS: Publish-subscribe messaging service used to distribute messages to subscribers.

Explanation:

With SQS, a message is consumed by a worker from a queue.

With SNS, a publisher sends a message to a topic, which can distribute it to multiple subscribers.

A common design uses SNS to broadcast an event and SQS queues to give different services independent message processing.

### 102. What are visibility timeout and Dead Letter Queues in SQS?

Answer:

Visibility timeout:

When a consumer receives an SQS message, the message temporarily becomes invisible to other consumers. This gives the worker time to process it.

Dead Letter Queue (DLQ):

A DLQ stores messages that fail processing repeatedly after reaching their configured maximum receive count.

Explanation:

For example, if a worker crashes while processing a message, that message can become visible again after its visibility timeout expires.

Set the visibility timeout appropriately for task duration, extend it for longer processing where necessary, and configure a DLQ to isolate repeatedly failing messages.

### 103. What is AWS Lambda?

Answer:

AWS Lambda is a serverless compute service that executes functions in response to events.

It can be triggered by:

- API Gateway requests.
- S3 events.
- SQS messages.
- EventBridge schedules.
- DynamoDB Streams.

Explanation:

Lambda is useful for short-lived event processing and automation without managing servers.

Important considerations include execution time limits, cold starts, memory allocation, concurrency limits, retry behavior, and idempotency.

For long-running background workloads, containers or dedicated worker services may be more suitable.

### 104. What is Amazon API Gateway?

Answer:

API Gateway is a managed service for creating, publishing, securing, and managing APIs.

Explanation:

It can expose backend services such as Lambda functions or other HTTP services.

Features include:

- Authentication and authorization integrations.
- Request and response transformations.
- Throttling.
- Monitoring.
- API stages.
- Usage plans.

It is useful when exposing serverless applications or centrally managing API entry points.

### 105. What is the difference between ALB and NLB?

Answer:

Both are AWS Elastic Load Balancing services, but they work at different network layers.

| ALB                        | NLB                                                  |
| -------------------------- | ---------------------------------------------------- |
| Application Load Balancer  | Network Load Balancer                                |
| Layer 7                    | Layer 4                                              |
| HTTP/HTTPS-aware           | TCP/UDP/TLS and other supported network traffic      |
| Supports host/path routing | Supports high-performance network-level distribution |

Explanation:

Use ALB for web applications and APIs that need routing such as:

```
/api/users  -> User service
/api/orders -> Order service
```

Use NLB for network-level load balancing, high-performance connections, and workloads requiring its specific Layer 4 capabilities.

### 106. What is a VPC in AWS?

Answer:

A Virtual Private Cloud (VPC) is an isolated virtual network in AWS where you deploy resources.

Important components:

- CIDR block.
- Public and private subnets.
- Route tables.
- Internet Gateway.
- NAT Gateway.
- Security groups.
- Network ACLs.

Explanation:

A typical production architecture places public-facing load balancers in public subnets and application servers and databases in private subnets.

The application can communicate with the database internally while the database remains inaccessible directly from the public internet.

### 107. What is the difference between Security Groups and Network ACLs?

Answer:

| Security Group                                                  | Network ACL                                    |
| --------------------------------------------------------------- | ---------------------------------------------- |
| Applies to network interfaces/resources                         | Applies at subnet level                        |
| Stateful                                                        | Stateless                                      |
| Allows rules only                                               | Supports allow and deny rules                  |
| Return traffic is automatically allowed for tracked connections | Return traffic must be permitted through rules |

Explanation:

Security groups are commonly used as the primary resource-level network access control.

For example, allow inbound HTTPS traffic to the load balancer and allow PostgreSQL traffic to the database only from the application security group.

Network ACLs provide an additional subnet-level control layer.

### 108. What is the difference between AWS Secrets Manager and Systems Manager Parameter Store?

Answer:

Both services can store application configuration and sensitive values.

AWS Secrets Manager:

Designed for managing secrets such as database credentials and API keys, including managed rotation integrations.

Systems Manager Parameter Store:

Stores configuration values and encrypted parameters, and is useful for centralized application configuration.

Explanation:

For sensitive credentials, use appropriate encryption and access policies. Applications should retrieve credentials securely at runtime rather than hardcoding them in source code or container images.

### 109. What is Amazon CloudWatch?

Answer:

CloudWatch is AWS's monitoring and observability service.

It provides:

- Metrics.
- Logs.
- Alarms.
- Dashboards.
- Event-driven integrations.

Explanation:

For an ECS-hosted FastAPI application, CloudWatch can collect container logs and infrastructure metrics.

You can create alarms for high CPU utilization, memory pressure, elevated error counts, or other relevant metrics and trigger notifications or automated responses.

### 110. What is Auto Scaling in AWS?

Answer:

Auto Scaling automatically adjusts the capacity of resources based on demand or configured policies.

Explanation:

For ECS services, you can configure scaling policies based on metrics such as:

- CPU utilization.
- Memory utilization.
- Request count per target.
- Queue depth.

For example, when Celery queue depth grows beyond a threshold, you can scale worker capacity to process queued tasks more quickly.

Scaling should also account for database connections, downstream API limits, and startup times.

### 111. How do you securely allow users to download files from S3?

Answer:

Use an S3 presigned URL.

A presigned URL provides time-limited access to a particular object without making the entire bucket public.

Python example:

```
import boto3s3 = boto3.client("s3")url = s3.generate_presigned_url(    "get_object",    Params={        "Bucket": "my-private-bucket",        "Key": "reports/report.pdf"    },    ExpiresIn=300)print(url)
```

Explanation:

The backend first authenticates the user and verifies that they are allowed to access the requested file. It then generates a short-lived URL.

For uploads, presigned PUT or POST requests can allow clients to upload directly to S3 without routing the complete file through the application server.

### 112. What is Amazon Bedrock?

Answer:

Amazon Bedrock is a managed AWS service that provides access to foundation models through APIs.

It allows applications to integrate models for tasks such as:

- Text generation.
- Summarization.
- Question answering.
- Classification.
- Embeddings.
- Retrieval-augmented generation.

Explanation:

A typical architecture might look like this:

1. A FastAPI endpoint receives a user question.
2. The application retrieves relevant documents from a vector store.
3. It constructs a prompt with retrieved context.
4. It invokes a foundation model through Bedrock.
5. It streams or returns the generated response.

Bedrock is useful for integrating managed foundation models while using AWS identity, networking, and security controls.

## Section 7: Testing, deployment, security, and production engineering (113–120)

### 113. What is the difference between unit testing, integration testing, and end-to-end testing?

Answer:

| Test type   | What it tests                      | Example                                    |
| ----------- | ---------------------------------- | ------------------------------------------ |
| Unit        | Individual functions or components | Test a pricing calculation                 |
| Integration | Interaction between components     | Test API with PostgreSQL                   |
| End-to-end  | Complete user workflow             | Create an order and verify its final state |

Explanation:

Unit tests are generally fast and isolated. Integration tests catch problems involving real dependencies. End-to-end tests validate complete workflows but usually take more time and are more complex to maintain.

A good testing strategy includes all three at appropriate levels.

### 114. What are fixtures and mocking in pytest?

Answer:

Fixtures provide reusable test setup and cleanup. Mocking replaces real dependencies with controlled test implementations.

```
import pytest@pytest.fixturedef sample_user():    return {        "id": 1,        "name": "Alice"    }def test_user_name(sample_user):    assert sample_user["name"] == "Alice"
```

Mocking example:

```
from unittest.mock import patch@patch("app.services.send_email")def test_registration(mock_email):    register_user("alice@example.com")    mock_email.assert_called_once()
```

Explanation:

Fixtures reduce duplicated setup code. Mocking helps isolate tests from slow, unreliable, or expensive external services.

However, mock-based tests should not replace all integration tests, because mocked dependencies can hide real integration problems.

### 115. How do you Dockerize a Python backend application?

Answer:

Docker packages an application and its dependencies into a container image.

Example Dockerfile:

```
FROM python:3.12-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000

CMD [
    "uvicorn",
    "main:app",
    "--host",
    "0.0.0.0",
    "--port",
    "8000"
]
```

Explanation:

Docker provides consistent application environments across development, testing, and production.

Production considerations include:

- Use a small, trusted base image.
- Run as a non-root user.
- Pin and scan dependencies.
- Avoid putting secrets in image layers.
- Add health checks.
- Configure resource limits.
- Use multi-stage builds where useful.
- Handle graceful shutdown.

### 116. Explain a typical CI/CD pipeline for a Python backend application.

Answer:

A typical CI/CD pipeline contains:

1. Code checkout.
2. Dependency installation.
3. Linting and formatting checks.
4. Unit and integration tests.
5. Security and dependency scanning.
6. Docker image build.
7. Container image push to ECR.
8. Deployment to ECS or another runtime.
9. Health checks and monitoring.

Explanation:

For example, GitHub Actions can run tests and build an image whenever changes are merged into the main branch.

The pipeline can then deploy a versioned image to ECS.

Database migrations should be treated carefully: deploy backward-compatible changes where possible, and make sure old and new application versions can coexist safely during a rolling deployment.

### 117. How do you debug a slow API endpoint in production?

Answer:

I would investigate the full request lifecycle rather than immediately assuming the database is responsible.

My approach:

1. Check endpoint latency percentiles.
2. Inspect application logs and trace IDs.
3. Identify slow database queries.
4. Check for N+1 query problems.
5. Inspect external API calls.
6. Check cache hit rates.
7. Review CPU, memory, and connection usage.
8. Reproduce the issue and profile the code.
9. Apply the fix and compare measurements.

Explanation:

For example, an API might be slow because it loads thousands of records and performs repeated database lookups inside a loop.

Using `select_related()`, `prefetch_related()`, better indexes, pagination, batching, or caching can significantly improve performance.

Measure before and after the change rather than relying on assumptions.

### 118. What are common web application security vulnerabilities?

Answer:

Some important vulnerabilities include:

| Vulnerability         | Meaning                            | Common protection                           |
| --------------------- | ---------------------------------- | ------------------------------------------- |
| SQL injection         | Malicious SQL input                | Parameterized queries and ORM               |
| XSS                   | Injected client-side scripts       | Output encoding and sanitization            |
| CSRF                  | Forged authenticated requests      | CSRF tokens and appropriate cookie settings |
| Broken access control | Unauthorized resource access       | Server-side authorization checks            |
| SSRF                  | Server makes unintended requests   | Restrict destinations and network access    |
| Broken authentication | Weak identity verification         | Secure sessions, MFA, token validation      |
| Insecure file uploads | Malicious or unsafe uploaded files | Validate, scan, and isolate files           |

Explanation:

Security must be implemented at multiple layers. Authentication alone is not sufficient; every sensitive endpoint must also verify whether the authenticated user is authorized to access the requested resource.

### 119. How would you optimize a backend system processing millions of records?

Answer:

I would avoid loading and processing the entire dataset in a single request or memory-intensive operation.

My approach would include:

- Database-side filtering and aggregation.
- Pagination or keyset-based batch processing.
- Appropriate database indexes.
- Bulk insert and update operations.
- Asynchronous processing with Celery.
- Separate queues for different workloads.
- Redis caching where appropriate.
- Horizontal scaling of workers.
- Monitoring and retry mechanisms.
- Idempotent task execution.

Explanation:

Imagine processing 500,000 vulnerability records. Instead of querying all records and processing each individually, divide them into manageable batches.

Use database bulk operations where possible, keep transactions reasonably small, and control worker concurrency to avoid overwhelming the database.

Also measure query time, memory consumption, throughput, and failure rates.

### 120. How would you design a scalable backend for a multi-tenant SaaS application?

Answer:

I would use a layered architecture with clear separation between API handling, business logic, database access, and asynchronous processing.

Possible architecture:

React frontend

ALB / API entry point

FastAPI / Django services

Authentication · Tenant isolation · Business logic

PostgreSQL

Transactional data

Redis

Cache and coordination

Celery + RabbitMQ

Async task execution

Amazon S3

Files and reports

ECS / Fargate + CloudWatch

Deployment · Scaling · Monitoring

Explanation:

Important design considerations:

1. Tenant isolation: Every tenant-owned record must be scoped to the correct tenant.
2. Scalability: Run multiple application instances behind a load balancer.
3. Database performance: Use indexing, connection pooling, query optimization, and pagination.
4. Background processing: Use Celery for reports, bulk operations, and external integrations.
5. Caching: Use Redis for frequently accessed data.
6. File storage: Store files in S3 instead of local container storage.
7. Security: Implement RBAC, secure authentication, least-privilege IAM, and encryption.
8. Observability: Centralize logs, metrics, traces, and alerts.
9. Reliability: Use retries, timeouts, idempotency, and appropriate failure handling.

The architecture should grow according to actual traffic and business requirements rather than introducing unnecessary distributed complexity from day one.

## How to prepare using your actual project experience

Knowing these 120 answers is useful, but interviewers for senior developer roles will also expect you to explain how you applied these concepts in production.

I would prioritize these examples from your Strobes Security experience:

| Interview topic    | Your strongest practical example                                       |
| ------------------ | ---------------------------------------------------------------------- |
| Python performance | Optimizing bulk processing and database operations                     |
| Django ORM         | Query optimization and handling large datasets                         |
| FastAPI            | Pulse AI chatbot and streaming responses                               |
| Celery             | Background processing with RabbitMQ                                    |
| Multi-tenancy      | Supporting 300+ tenants                                                |
| Scalability        | Processing 500K+ vulnerability and asset records                       |
| API optimization   | Reducing API latency by approximately 70%                              |
| Bulk operations    | Reducing 100K-record deletion from 100–125 seconds to around 3 seconds |
| AWS                | Bedrock, S3, ECR and containerized deployments                         |
| System design      | Cloud Remediation and Patching Agent                                   |

These examples help demonstrate practical engineering experience rather than just theoretical knowledge.

## My recommended preparation priority

## Study priorities

Python + async programming

100%

GIL, asyncio, generators, decorators, memory management

Backend + SQL + system design

100%

Transactions, indexing, caching, API design, scalability

FastAPI + Django

95%

Dependency injection, ORM, serializers, middleware, authentication

Celery + distributed systems

90%

Retries, idempotency, queues, concurrency, task failures

AWS + deployment

85%

IAM, ECS, ECR, S3, SQS, VPC, CloudWatch, CI/CD

Testing + production debugging

80%

Pytest, Docker, monitoring, performance and security

Suggested preparation emphasis, not an assessment of your current skills.

One important recommendation: Don't simply memorize these answers. Practice explaining each concept in 60–90 seconds, followed by a real implementation example and one trade-off. That is particularly important for senior-level interviews.

Would you like a daily 10-question mock interview drill covering these topics?

🎯Daily backend interview drillTap to set up
