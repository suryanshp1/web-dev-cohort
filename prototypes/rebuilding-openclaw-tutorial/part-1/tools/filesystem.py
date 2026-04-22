import os
from tools.base import Tool


class ReadFileTool(Tool):
    name = "read_file"
    description = "Read the contents of a file at the given path."
    parameters = {
        "type": "object",
        "properties": {
            "path": {
                "type": "string",
                "description": "Absolute or relative path to the file to read.",
            }
        },
        "required": ["path"],
    }

    async def execute(self, args: dict) -> str:
        path = args["path"]
        try:
            with open(os.path.expanduser(path), "r") as f:
                return f.read()
        except Exception as e:
            return f"Error reading file: {e}"


class WriteFileTool(Tool):
    name = "write_file"
    description = "Write content to a file at the given path, creating directories as needed."
    parameters = {
        "type": "object",
        "properties": {
            "path": {
                "type": "string",
                "description": "Absolute or relative path to the file to write.",
            },
            "content": {
                "type": "string",
                "description": "The content to write to the file.",
            },
        },
        "required": ["path", "content"],
    }

    async def execute(self, args: dict) -> str:
        path = os.path.expanduser(args["path"])
        content = args["content"]
        try:
            os.makedirs(os.path.dirname(path) or ".", exist_ok=True)
            with open(path, "w") as f:
                f.write(content)
            return f"Wrote {len(content)} bytes to {path}"
        except Exception as e:
            return f"Error writing file: {e}"
