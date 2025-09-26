import fs from "node:fs";
import Ajv2020 from "ajv/dist/2020.js"; // Ajv v8 with draft 2020-12 support built-in

const ajv = new Ajv2020({ allErrors: true, strict: false });

const schema = JSON.parse(fs.readFileSync("prompts/expense.schema.json", "utf8"));
const validate = ajv.compile(schema);

const cases = [
  ["tests/fixtures/tyres_80.out.json", "tyres 80"],
  ["tests/fixtures/parking_missing_amount.out.json", "parking (missing amount)"]
];

let failures = 0;
for (const [file, name] of cases) {
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  const ok = validate(data);
  if (!ok) {
    failures++;
    console.error(`❌ ${name} failed:`, validate.errors);
  } else {
    console.log(`✅ ${name} matches schema`);
  }
}

process.exit(failures ? 1 : 0);
