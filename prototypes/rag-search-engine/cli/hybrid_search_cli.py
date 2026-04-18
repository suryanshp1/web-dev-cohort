import argparse
from lib.hybrid_search import normalize_scores
from lib.llm import generate_content

def main() -> None:
    parser = argparse.ArgumentParser(description="Hybrid Search CLI")
    parser.add_subparsers(dest="command", help="Available commands")

    norm_parser = subparsers.add_parser("normalize", help="Normalise a list of scores")
    norm_parser.add_argument("scores", type=float, nargs="+", help="List of score to normalize")

    weighed_search_parser = subparsers.add_parser("weighted_search", help="Available commands")
    weighed_search_parser.add_argument("query", type=str, help="user query to find relevant docs")
    weighed_search_parser.add_argument("--limit", type=int, default=5,help="number of results to show")
    weighed_search_parser.add_argument("--alpha", type=float, default=0.5,help="% of weight for bm25 algo")


    args = parser.parse_args()

    match args.command:
        case "weighted_search":
            pass
        case "normalize":
            norm_scores = normalize_scores(args.scores)
            for norm_score in norm_scores:
                print(f"* {norm_score:.4f}")
        case _:
            parser.print_help()

if __name__ == "__main__":
    main()