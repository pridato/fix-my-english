import { CohereClient } from "cohere-ai";
import { cohereToken } from "../consts";

const cohere = new CohereClient({
  token: cohereToken,
});

export async function fixMyEnglish(input: string) {
  const response = await cohere.generate({
    model: "xlarge",
    prompt: `This is a spell checker generator.
    --
    Incorrect sample: "I are good!"
    Correct sample: "I am good!"
    --
    --
    Incorrect sample: "I have 22 years old."
    Correct sample: "I am 22 years old."
    --
    --
    Incorrect sample: "I don't can know"
    Correct sample: "I don't know "
    --
    --
    Incorrect sample: "${input}",
    Correct sample: `,
      maxTokens: 40,
      temperature: 0.3,
      k: 0,
      p: 1,
      frequencyPenalty: 0,
      stopSequences: ["--"],
      returnLikelihoods: "NONE",
  });

  return response.generations[0].text;
}
