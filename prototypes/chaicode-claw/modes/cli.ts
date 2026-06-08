import chalk from "chalk";
import {select, isCancel} from "@clack/prompts"
import { runAgentMode } from "./agent/orchestrator";


export async function runCliMode() {
    while (true) {
        const mode = await select({
            message: "Which sub mode you want to proceed with ?",
            options: [
                {value: "agent", label: "Agent Mode"},
                {value: "paln", label: "Plan Mode"},
                {value: "ask", label: "Ask Mode"},
                {value: "back", label: "Back to main menu"},
            ]
        })

        if (isCancel(mode) || mode === "back") {
            return;
        }

        if (mode === "agent") {
            await runAgentMode()
        } else if (mode === "paln") {
            console.log(chalk.dim("Starting paln mode..."))
        } else if (mode === "ask") {
            console.log(chalk.dim("Starting ask mode..."))
        }

        if (!["agent", "paln", "ask"].includes(mode)) {
            console.log(chalk.yellow("\n This mode is not implemented yet"))
            continue;
        }
    }
}