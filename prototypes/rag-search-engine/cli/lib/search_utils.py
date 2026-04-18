import json
from pathlib import Path

BM25_K1 = 1.5
BM25_B = 0.75

PROJECT_ROOT = Path(__file__).resolve().parents[2]
MOVIE_DATA_PATH = PROJECT_ROOT / "data" / "movies.json"
STOPWORDS_DATA_PATH = PROJECT_ROOT / "data" / "stopwords.txt"
CACHE_PATH = PROJECT_ROOT / "cache"


def load_movies() -> list[dict]:
    with open(MOVIE_DATA_PATH, "r") as f:
        data = json.load(f)
    return data.get("movies", [])


def load_stopwords():
    with open(STOPWORDS_DATA_PATH, "r") as f:
        data = f.read().splitlines()
    return data
