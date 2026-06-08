#! /usr/bin/env bun

import { Command } from "commander";
import { runWakeup } from "./tui/wakeup";

const program = new Command()

program.name("chaicode-claw")
    .description("ChaiCode Claw CLI")
    .version("0.0.1")

program
    .command("wakeup")
    .description("Show the banner and pick cli or telegram mode")
    .action(
        async() => {
            // console.log("Wakeup calling")
            await runWakeup()
        }
    )

await program.parseAsync(process.argv)