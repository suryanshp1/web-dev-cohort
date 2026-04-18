#!/usr/bin/env python3

import argparse
from lib.semantic_search import (
    verify_model,
    embed_text,
    verify_embeddings,
    embed_query_text,
    search,
    chunk_text,
    chunk_text_semantic,
    embed_chunks,
    search_chunked,
)


def main():
    parser = argparse.ArgumentParser(description="Semantic Search CLI")

    subparsers = parser.add_subparsers(dest="command", help="Available commands")

    verify_parser = subparsers.add_parser("verify", help="Verify embedding model")

    embed_parser = subparsers.add_parser("embed_text", help="Embed text")
    embed_parser.add_argument("text", type=str, help="Text to be embeded")

    embed_parser = subparsers.add_parser("verify_embeddings", help="Verify embeddings")

    embed_query = subparsers.add_parser("embed_query", help="Embed text")
    embed_query.add_argument("query", type=str, help="Text to be embeded")

    search_query = subparsers.add_parser("search", help="Embed text")
    search_query.add_argument("query", type=str, help="Text to be embeded")
    search_query.add_argument("--limit", type=int, default=5, help="Number of results returned")

    chunk_query = subparsers.add_parser("chunk", help="chunk text in fixed size")
    chunk_query.add_argument("text", type=str, help="Document to be chunked")
    chunk_query.add_argument("--chunk-size", type=int, default=200, help="Number of words in each fixed size chunk")
    chunk_query.add_argument("--overlap", type=int, default=200, help="Number of words overlap among chunks")

    semantic_chunk_query = subparsers.add_parser("semanticchunk", help="chunk text in fixed size")
    semantic_chunk_query.add_argument("text", type=str, help="Document to be chunked")
    semantic_chunk_query.add_argument("--max-chunk-size", type=int, default=4, help="Number of words in each fixed size chunk")
    semantic_chunk_query.add_argument("--overlap", type=int, default=0, help="Number of words overlap among chunks")

    embed_chunk_query = subparsers.add_parser("embedchunks", help="Create embeddings for semantic chunks")

    search_chunked_query = subparsers.add_parser("searchchunked", help="Embed text")
    search_chunked_query.add_argument("query", type=str, help="Text to be embeded")
    search_chunked_query.add_argument("--limit", type=int, default=10, help="Number of results returned")

    args = parser.parse_args()

    match args.command:
        case "searchchunked":
            search_chunked(args.query, args.limit)
        case "embedchunks":
            embed_chunks()
        case "semanticchunk":
            chunk_text_semantic(args.text, args.max_chunk_size, args.overlap)
        case "chunk":
            chunk_text(args.text, args.overlap, args.chunk_size)
        case "search":
            search(args.query, args.limit)
        case "embed_query":
            embed_query_text(args.query)
        case "embed_text":
            embed_text(args.text)
        case "verify":
            verify_model()
        case "verify_embeddings":
            verify_embeddings()
        case _:
            parser.print_help()


if __name__ == "__main__":
    main()
