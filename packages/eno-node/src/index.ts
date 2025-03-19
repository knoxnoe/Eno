import { program } from "commander";

program
  .option("--no-sauce", "Remove sauce")
  .option("--cheese <flavour>", "cheese flavour", "mozzarella")
  .option("--no-cheese", "plain with no cheese")
  .parse();